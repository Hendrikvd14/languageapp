import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from '../../types/chart';
import { ChartService } from '../../core/services/chart-service';


@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.html',
  imports: [CommonModule, BaseChartDirective],
  styleUrl: './progress-chart.css',
})
export class ProgressChart implements OnChanges {
@ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  @Input() deckId!: number | null;
  @Input() chartTitle: string = 'Voortgang';
  @Input() showLegend: boolean = true;
  @Input() height: string = '300px';
  @Input() width: string = '300px';

  chartData!: Chart;


  // Pie chart configuratie
  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#374151',
          font: {
            size: 14
          },
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  pieChartLabels: string[] = [];
  pieChartDatasets: ChartConfiguration<'pie'>['data']['datasets'] = [
    {
      data: [],
      backgroundColor: [],
      borderColor: '#FFFFFF',
      borderWidth: 2,
      hoverBackgroundColor: [],
    },
  ];

  pieChartType = 'pie' as const;


  constructor(private chartService: ChartService, private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deckId'] && this.deckId) {
      console.log('2');
      console.log('progress-chart changed: deckId: ' + this.deckId);
      this.resetChart();
      this.loadChartData();
    }
  }

  private resetChart() {
  this.pieChartLabels = [];
  this.pieChartDatasets = [
    {
      data: [],
      backgroundColor: [],
      borderColor: '#FFFFFF',
      borderWidth: 2,
      hoverBackgroundColor: [],
    },
  ];

}

  private loadChartData() {
    this.chartService.getProgress(this.deckId!).subscribe({
      next: (chart: Chart) => {
        console.log('3');
        this.chartData = chart;
        // Labels uit backend
        this.pieChartLabels = [...chart.labels];

        // Dataset uit backend
        if (chart.datasets && chart.datasets.length > 0) {
          console.log('4');
          const ds = chart.datasets[0];
          this.pieChartDatasets = [
            {
              data: [...ds.data],
              backgroundColor: [...ds.backgroundColors],
              borderColor: '#FFFFFF',
              borderWidth: 2,
              hoverBackgroundColor: [...ds.backgroundColors.map((c) => c)], // zelfde kleur
            },
          ];
        }

        this.chart?.update();
        this.cdr.detectChanges();

        console.log('pieChartLabels: ' + this.pieChartLabels.length);
        console.log('pieChartDatasets: ' + this.pieChartDatasets.length);
        let isTrue = this.showLegend && this.pieChartLabels.length > 0 && this.pieChartDatasets.length > 0;
        console.log(isTrue);
        // Eventueel de chartTitle uit backend gebruiken
        if (chart.title) {
          this.chartTitle = chart.title;
        }
      },
      error: (err) => {
        console.error('Kon chart data niet laden:', err);
      },
    });
  }

  get totalItems(): number {
    if (!this.pieChartDatasets || this.pieChartDatasets.length === 0) {
      console.log("5");
      return 0;
    }
      
      
    console.log('7');
    return (this.pieChartDatasets[0].data as number[]).reduce((a, b) => a + b, 0);
  }

  // Percentage voltooid berekenen
  get completionPercentage(): number {
    if (!this.pieChartLabels || !this.pieChartDatasets || this.pieChartDatasets.length === 0) {
      console.log('6');
      return 0;
    }
      
    console.log('8');
    // Veronderstel dat "Voltooid" altijd het eerste label is
    const completedIndex = this.pieChartLabels.indexOf('Geleerd');
    const completedValue =
      completedIndex >= 0
        ? (this.pieChartDatasets[0].data[completedIndex] as number)
        : 0;

    return this.totalItems > 0 ? Math.round((completedValue / this.totalItems) * 100) : 0;
  }



  getBackgroundColor(index: number): string {
    const dataset = this.pieChartDatasets[0];
    if (!dataset || !dataset.backgroundColor) return '#ccc'; // fallback kleur

    const colors = dataset.backgroundColor;
    // TypeScript kan hier eventueel casten
    if (Array.isArray(colors)) {
      return colors[index] as string;
    }

    return '#ccc';
  }

}

// Type voor progress data
export interface ProgressData {
  completed: number;
  inProgress: number;
  notStarted: number;
}
