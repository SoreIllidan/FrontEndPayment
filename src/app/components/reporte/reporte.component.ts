import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
        ApexAxisChartSeries,
        ApexChart,
        ApexTitleSubtitle,
        ApexFill,
        ApexXAxis,
        ApexMarkers,
        ApexDataLabels,
        ApexTooltip,
        ApexStroke,
        ChartComponent
} from 'ng-apexcharts';

import { ChangeDetectorRef } from '@angular/core';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title?: ApexTitleSubtitle;
  stroke: ApexStroke;
  fill?: ApexFill;
  tooltip: ApexTooltip;
  markers?: ApexMarkers;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit, AfterViewInit {
  @ViewChild('chart1') chart1!: ChartComponent;
  @ViewChild('chart2') chart2!: ChartComponent;
  
  public dateForm: FormGroup;
  public chartOptions1: ChartOptions;
  public chartOptions2: ChartOptions;
  public mostrarGrafico: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private cdref: ChangeDetectorRef){
    this.dateForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.chartOptions1 = {
      series: [
        {
          name: "Desarrollo",
          data: [80, 35, 50, 68, 45, 78, 35]
        },
        {
          name: "Diseño",
          data: [95, 25, 34, 59, 41, 62, 80]
        },
        {
          name: "Marketing",
          data: [75, 80, 22, 10, 48, 30, 90]
        },
        {
          name:"Ventas",
          data: [25, 58, 70, 45, 90, 30, 88]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      title: {
        text: "Lineal"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2025-10-07",
          "2025-10-06",
          "2025-10-05",
          "2025-10-04",
          "2025-10-03",
          "2025-10-02",
          "2025-10-01"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy"
        }
      }
    }
    this.chartOptions2 = {
      series: [
        {
          name: "Desarrollo",
          data: [80, 35, 50, 68, 45, 78, 35]
        },
        {
          name: "Diseño",
          data: [95, 25, 34, 59, 41, 62, 80]
        },
        {
          name: "Marketing",
          data: [75, 80, 22, 10, 48, 30, 90]
        },
        {
          name:"Ventas",
          data: [25, 58, 70, 45, 90, 30, 88]
        }
      ],
      chart: {
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      title: {
        text: "Radar"
      },
      stroke: {
        width: 0
      },
      fill: {
        opacity: 0.4
      },
      
      markers: {
        size: 0
      },
      xaxis: {
        categories: [
          "10-07",
          "10-06",
          "10-05",
          "10-04",
          "10-03",
          "10-02",
          "10-01"
        ]
      },
      tooltip: {
        enabled: true, // Activamos el tooltip
        shared: true,
        intersect: false,
        x: {
          show: true,
          format: "dd/MM"
        },
        y: {
          title: {
            formatter: (seriesName: string) => seriesName
          }
        }
      },
      dataLabels: {
        enabled: true, // Activamos las etiquetas de datos
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: ['#304758']
        }
      }
    };
  }
  ngOnInit(): void {
     setTimeout(() => {
    this.mostrarGrafico = true;
    this.cdref.detectChanges();
  });
  }
  ngAfterViewInit(): void {}
  
  toggleGrafico() {
    this.mostrarGrafico = !this.mostrarGrafico;
  }
  generarReporte(){

    this.mostrarGrafico = true;
    // const { startDate, endDate } = this.dateForm.value;
    // const startDateFormatted = new Date(startDate).toISOString();
    // const endDateFormatted = new Date(endDate).toISOString();

    // // Hacemos la petición HTTP con las fechas seleccionadas
    // this.http.get(`http://localhost:3000/api/datos?start=${startDateFormatted}&end=${endDateFormatted}`)
    //   .subscribe((data: any) => {
    //     this.chartOptions1.series = data.series1; // Asumiendo que la API devuelve datos con esta estructura
    //     this.chartOptions2.series = data.series2;
    //     this.mostrarGrafico = true; // Mostrar gráfico cuando los datos sean recibidos
    //   });
  }
}