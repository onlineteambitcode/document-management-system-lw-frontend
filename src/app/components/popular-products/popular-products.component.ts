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
    selector: 'app-popular-products',
    standalone: true,
    imports: [
        MaterialModule,
        MatMenuModule,
        MatButtonModule,
        CommonModule,
        NgApexchartsModule,
            MatFormField
    ],
    templateUrl: './popular-products.component.html',
})
export class AppPopularProductsComponent {

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
            name: "Downloads",
            data: [6.4, 5.1, 3.4, 3.2, 7.1, 7.4, 2.3, 3.1, 4.1]
          },
          {
            name: "Uploads",
            data: [2.1, 1.2, 0.4, 0.5, 4.1, 2.6, 1.2, 1.7, 1.1]
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
            "Oct"
          ]
        },
        yaxis: {
          title: {
            text: "GB (Gigabyte)"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "GB " + val;
            }
          }
        }
      };
    }
}
