import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleVenta } from '../../../../interfaces/detalle-venta';
import { Venta } from '../../../../interfaces/venta';
@Component({
  selector: 'app-dialog-detalle-venta',
  templateUrl: './dialog-detalle-venta.component.html',
  styleUrls: ['./dialog-detalle-venta.component.css']
})
export class DialogDetalleVentaComponent implements OnInit {


  fechaRegistro?: string = "";
  numero?: string = "";
  tipoPago?: string = "";
  total?: string = "";
  detalleVenta: DetalleVenta[] = [
    {idProducto:1,descripcionProducto:"",cantidad:0,precioTexto:"0",totalTexto:"0"},
  ]
  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'total'];
 

  constructor(@Inject(MAT_DIALOG_DATA) public _venta: Venta) {
    this.fechaRegistro = _venta.fechaRegistro;
    this.numero = _venta.numeroDocumento;
    this.tipoPago = _venta.tipoPago;
    this.total = _venta.totalTexto;
    this.detalleVenta = _venta.detalleVenta == null ? [
      { idProducto: 1, descripcionProducto: "", cantidad: 0, precioTexto: "0", totalTexto: "0" },
    ] : _venta.detalleVenta;
  }

  ngOnInit(): void {
    
  }

}
