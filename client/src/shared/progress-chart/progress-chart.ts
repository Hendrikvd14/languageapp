import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
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

  /** Afgeleide waarden (GEEN template-logica) */
  totalItems = 0;
  percentages: number[] = [];

  /** Pie chart configuratie */
  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#374151',
          font: { size: 14 },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage =
              total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
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

  constructor(
    private chartService: ChartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deckId'] && this.deckId) {
      this.resetChart();
      this.loadChartData();
    }
  }

  private resetChart(): void {
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
    this.totalItems = 0;
    this.percentages = [];
  }

  private loadChartData(): void {
    this.chartService.getProgress(this.deckId!).subscribe({
      next: (chart: Chart) => {
        this.chartData = chart;

        /** Labels */
        this.pieChartLabels = [...chart.labels];

        /** Dataset */
        if (chart.datasets?.length) {
          const ds = chart.datasets[0];

          this.pieChartDatasets = [
            {
              data: [...ds.data],
              backgroundColor: [...ds.backgroundColors],
              borderColor: '#FFFFFF',
              borderWidth: 2,
              hoverBackgroundColor: [...ds.backgroundColors],
            },
          ];
        }

        /** Afgeleide data */
        const data = this.pieChartDatasets[0].data as number[];

        this.totalItems = data.reduce((a, b) => a + b, 0);

        this.percentages = data.map((value) =>
          this.totalItems > 0
            ? Math.round((value / this.totalItems) * 100)
            : 0
        );

        /** Optionele titel uit backend */
        if (chart.title) {
          this.chartTitle = chart.title;
        }

        /** Chart update */
        this.chart?.update();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Kon chart data niet laden:', err);
      },
    });
  }

  getBackgroundColor(index: number): string {
    const colors = this.pieChartDatasets[0]?.backgroundColor;
    return Array.isArray(colors) ? (colors[index] as string) : '#ccc';
  }
}
