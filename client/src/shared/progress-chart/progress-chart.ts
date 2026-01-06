import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartData, ChartType, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.html',
  imports: [CommonModule, BaseChartDirective],
  styleUrl: './progress-chart.css',
})
export class ProgressChart implements OnChanges, OnInit {
  @Input() progressData: ProgressData = {
    completed: 0,
    inProgress: 0,
    notStarted: 0
  };

  @Input() chartTitle: string = 'Voortgang';
  @Input() showLegend: boolean = true;
  @Input() height: string = '300px';
  @Input() width: string = '300px';

  // Pie chart configuratie
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
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

  public pieChartLabels: string[] = ['Voltooid', 'Bezig', 'Nog te beginnen'];
  
  public pieChartDatasets: ChartConfiguration<'pie'>['data']['datasets'] = [
    {
      data: [0, 0, 0],
      backgroundColor: [
        '#10B981', // Groen - voltooid
        '#F59E0B', // Amber - bezig
        '#EF4444'  // Rood - niet begonnen
      ],
      borderColor: '#FFFFFF',
      borderWidth: 2,
      hoverBackgroundColor: [
        '#34D399',
        '#FBBF24',
        '#F87171'
      ]
    }
  ];

  public pieChartType = 'pie' as const;

  ngOnInit() {
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['progressData']) {
      this.updateChartData();
    }
  }

  private updateChartData() {
    this.pieChartDatasets = [
      {
        data: [
          this.progressData.completed,
          this.progressData.inProgress,
          this.progressData.notStarted
        ],
        backgroundColor: [
          '#10B981',
          '#F59E0B',
          '#EF4444'
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2,
        hoverBackgroundColor: [
          '#34D399',
          '#FBBF24',
          '#F87171'
        ]
      }
    ];
  }

  // Totale items berekenen
  get totalItems(): number {
    return this.progressData.completed + this.progressData.inProgress + this.progressData.notStarted;
  }

  // Percentage voltooid berekenen
  get completionPercentage(): number {
    if (this.totalItems === 0) return 0;
    return Math.round((this.progressData.completed / this.totalItems) * 100);
  }
}

// Type voor progress data
export interface ProgressData {
  completed: number;
  inProgress: number;
  notStarted: number;
}
