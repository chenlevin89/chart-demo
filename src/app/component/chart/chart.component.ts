import {ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  Chart,
  ChartType,
  ChartOptions,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  SubTitle,
  Legend
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import {ANNOTATION, CONFIG} from './chart.config';

Chart.register(
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  annotationPlugin
);

Chart.defaults.font.size = 12;


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnDestroy {

  @ViewChild('chartElement', {static: true}) chartElement: ElementRef;

  @Input() set data(value: any) {
    this.generateChart(value);
  }

  private chart: Chart;

  ngOnDestroy(): void {
    this.chart.destroy();
  }

  private generateChart(data) {
    if (this.chart) {
      this.chart.destroy();
    }
    const config = this.updateConfigOptions({value: data, config: CONFIG});
    this.chart = new Chart(this.chartElement.nativeElement, {...config, data});
  }

  private updateConfigOptions({value, config}) {
    return {
      ...config,
      options: {
        ...config.options,
        scales: {
          ...config.options.scales,
          y: {
            ...config.options.scales['y'],
            max: Math.floor(Math.max(...value.datasets[0].data) * 1.2)
          }
        },
        plugins: {
          ...config.options.plugins,
          annotation: {
            annotations: {
              annotation: {
                ...ANNOTATION,
                yMax: value.datasets[0].data[1],
             //   yMin: value.datasets[0].data[1] + 20
              }
            }
          }
        }
      }
    }
  }

}



