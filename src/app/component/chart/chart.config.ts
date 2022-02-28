import {ChartOptions, ChartType} from "chart.js";
import {externalTooltipHandler} from "./char.tooltip";

export const ANNOTATION = {
  type: 'line',
  borderColor: '#e5e7e9',
  borderWidth: 2,
  display: (ctx) => ctx.chart.isDatasetVisible(1),
  label: {
    enabled: true,
    content: 'START',
    position: 'start',
    backgroundColor: '#e5e7e9',
    color: '#636363'
  },
  xMax: 1,
  xMin: 1,
  xScaleID: 'x',
  yMax: 60,
  yMin: 100,
  yScaleID: 'y'
};

export const OPTIONS: ChartOptions = {
  responsive: true,
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 3,
        usePointStyle: true,
      },
    },
    subtitle: {
      display: true
    },
    tooltip: {
      enabled: false,
      position: 'nearest',
      external: externalTooltipHandler
    },
    annotation: {
      annotations: {
        annotation: ANNOTATION as any
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {},
      title: {
        text: 'Installs',
        display: true
      },
      ticks: {
        stepSize: 20,
        callback: function (value, index, ticks) {
          return !value ? value : `${value}K`
        }
      }
    },
    z: {
      position: 'right',
      title: {
        text: 'ROAS',
        display: true
      },
      ticks: {
        stepSize: 100,
        callback: function (value, index, ticks) {
          return !value ? value : `${value}%`
        }
      }
    }
  }
}

export const CONFIG = {
  type: 'bar' as ChartType,
  options: OPTIONS
};
