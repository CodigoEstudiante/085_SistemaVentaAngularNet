import { Component, OnInit } from '@angular/core';

import { Chart, registerables } from 'node_modules/chart.js';
import { DashboardService } from '../../../services/dashboard.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalIngresos: string = "0";
  totalVentas: string = "0";
  totalProductos: string = "0";

  constructor(
    private _dashboardServicio: DashboardService,
  ) {


  }

  ngOnInit(): void {

    this._dashboardServicio.resumen().subscribe({
      next: (data) => {
        if (data.status) {

          this.totalIngresos = data.value.totalIngresos;
          this.totalVentas = data.value.totalVentas;
          this.totalProductos = data.value.totalProductos;

          const arrayData: any[] = data.value.ventasUltimaSemana;

          const labelTemp = arrayData.map((value) => value.fecha);
          const dataTemp = arrayData.map((value) => value.total);
          this.mostrarGrafico(labelTemp, dataTemp)

        }
      },
      error: (e) => { },
      complete: () => { }
    })

  }

  mostrarGrafico(labelsGrafico:any[],dataGrafico:any[]) {
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: labelsGrafico,
        datasets: [{
          label: '# de Ventas',
          data: dataGrafico,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


}
