import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartData, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartTypeEnum } from '../../types/chart';
import { ChartService } from '../../core/services/chart-service';


@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.html',
  imports: [CommonModule, BaseChartDirective],
  styleUrl: './progress-chart.css',
})
export class ProgressChart implements OnInit {


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


  constructor(private chartService: ChartService) { }


  ngOnInit() {
    if (!this.deckId) return;

    this.loadChartData();
  }

  private loadChartData() {
    this.chartService.getProgress(this.deckId!).subscribe({
      next: (chart: Chart) => {
        this.chartData = chart;
        console.log("loadChartData");
        // Labels uit backend
        this.pieChartLabels = chart.labels;

        // Dataset uit backend
        if (chart.datasets && chart.datasets.length > 0) {
          const ds = chart.datasets[0];
          console.log("datasets");
          this.pieChartDatasets = [
            {
              data: ds.data,
              backgroundColor: ds.backgroundColors,
              borderColor: '#FFFFFF',
              borderWidth: 2,
              hoverBackgroundColor: ds.backgroundColors.map((c) => c), // zelfde kleur
            },
          ];
          console.log('chartData = ' + this.pieChartDatasets[0].data[0])
        }

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
    if (!this.pieChartDatasets || this.pieChartDatasets.length === 0) return 0;
    return (this.pieChartDatasets[0].data as number[]).reduce((a, b) => a + b, 0);
  }

  // Percentage voltooid berekenen
  get completionPercentage(): number {
    if (!this.pieChartLabels || !this.pieChartDatasets || this.pieChartDatasets.length === 0)
      return 0;

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
