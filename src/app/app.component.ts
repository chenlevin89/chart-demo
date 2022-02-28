import { Component } from '@angular/core';
import {ChartType} from 'chart.js';


const labels = [
  '17 Jan, 2022',
  '18 Jan, 2022',
  '19 Jan, 2022',
  '20 Jan, 2022',
  '21 Jan, 2022',
  '22 Jan, 2022',
  '23 Jan, 2022',
];

const data = {
  datasets: [
    {
      label: 'Installs',
      backgroundColor: '#3083ff',
      borderColor: '#3083ff',
      borderRadius: 4,
      maxBarThickness: 32,
      data: [50, 60, 100, 35, 70, 60, 40],
      yAxisID: 'y',
      borderWidth: 2,
      order: 1
    },
    {
      type: 'line'  ,
      label: 'ROAS D7',
      backgroundColor: '#7ed0ff',
      borderColor: '#7ed0ff',
      data: [80, 100, 220, 120, 150, NaN, NaN],
      yAxisID: 'z',
      pointRadius: 0.5,
      borderWidth: 2,
      order: 0
    },
    {
      type: 'line' as ChartType,
      label: 'ROAS D3',
      backgroundColor: '#8d8be7',
      borderColor: '#8d8be7',
      data: [NaN, NaN, NaN, NaN, 120, 70, 150],
      yAxisID: 'z',
      pointRadius: 0.5,
      borderWidth: 2,
      order: 0
    },
    {
      type: 'line' as ChartType,
      label: 'ROAS goal',
      backgroundColor: '#459fca',
      borderColor: '#459fca',
      data: [210, 210, 210, 210, 210, 210, 210],
      yAxisID: 'z',
      pointRadius: 0.1,
      borderWidth: 2,
      borderDash: [4, 4],
      order: 0
    }
  ],
  labels
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sandbox';

   chartData = data;

   constructor(){}

   onClick(){
     this.chartData = {
       ...this.chartData,
       datasets: [
         {
          ...this.chartData.datasets[0],
          data: Array.from({length:labels.length}, (_,index) =>  Math.floor(Math.random() * (100 - 10) + 10))
         },
         ...this.chartData.datasets.slice(1)
       ]
     }
   }
}
