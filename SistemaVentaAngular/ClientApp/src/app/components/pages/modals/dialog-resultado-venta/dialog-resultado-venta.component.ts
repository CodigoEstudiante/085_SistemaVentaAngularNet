import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-resultado-venta',
  templateUrl: './dialog-resultado-venta.component.html',
  styleUrls: ['./dialog-resultado-venta.component.css']
})
export class DialogResultadoVentaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
