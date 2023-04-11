import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ReporteVenta } from '../../../interfaces/reporte-venta';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VentaService } from '../../../services/venta.service';
import { Reporte } from '../../../interfaces/reporte';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})


export class ReportesComponent implements OnInit {
  formGroup: FormGroup;
  ELEMENT_DATA: Reporte[] = [];
  displayedColumns: string[] = ['fechaRegistro','numeroVenta',  'tipoPago', 'total', 'producto','cantidad','precio','totalProducto'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

 

  constructor(
    private fb: FormBuilder,
    private _ventaServicio: VentaService,
    private _snackBar: MatSnackBar,
  ) {
    this.formGroup = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onSubmitForm() {

    const _fechaInicio: any = moment(this.formGroup.value.fechaInicio).format('DD/MM/YYYY')
    const _fechaFin: any = moment(this.formGroup.value.fechaFin).format('DD/MM/YYYY')
    if (_fechaInicio === "Invalid date" || _fechaFin === "Invalid date") {
      this._snackBar.open("Debe ingresar ambas fechas", 'Oops!', { duration: 2000 });
      return;
    }

    this._ventaServicio.reporte(
      _fechaInicio,
      _fechaFin,
    ).subscribe({
      next: (data) => {

        if (data.status) {

          this.ELEMENT_DATA = data.value;
          this.dataSource.data = data.value;

        }
        else {
          this.ELEMENT_DATA = [];
          this.dataSource.data = [];
          this._snackBar.open("No se encontraron datos", 'Oops!', { duration: 2000 });
        }
          
      },
      error: (e) => {
      },
      complete: () => {

      }
    })

  }

  exportarExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.ELEMENT_DATA);

    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    XLSX.writeFile(wb, "Reporte Ventas.xlsx")
  }
}
