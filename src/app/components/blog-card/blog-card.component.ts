import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { MatFormField } from '@angular/material/form-field';


export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
  };

  interface month {
    value: string;
    viewValue: string;
}


@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    NgApexchartsModule,
    MatFormField
],
  templateUrl: './blog-card.component.html',
})
export class AppBlogCardsComponent {
  
  
      months: month[] = [
          { value: 'mar', viewValue: 'Sep 2024' },
          { value: 'apr', viewValue: 'Oct 2024' },
          { value: 'june', viewValue: 'Nov 2024' },
      ];
  
      @ViewChild("chart") chart: ChartComponent;
      public chartOptions: Partial<ChartOptions>;
    
      constructor() {
        this.chartOptions = {
          series: [
            {
              data: [43, 26, 65, 61, 21, 12, 47, 31, 34]
            }
          ],
          chart: {
            type: "bar",
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ]
          },
          yaxis: {
            title: {
              text: "Cases"
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return "Cases: " + val;
              }
            }
          }
        };
      }
}
