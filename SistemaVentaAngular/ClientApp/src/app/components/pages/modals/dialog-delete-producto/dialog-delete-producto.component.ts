import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../../../../interfaces/producto';

@Component({
  selector: 'app-dialog-delete-producto',
  templateUrl: './dialog-delete-producto.component.html',
  styleUrls: ['./dialog-delete-producto.component.css']
})
export class DialogDeleteProductoComponent implements OnInit {

  constructor(
    private dialogoReferencia: MatDialogRef<DialogDeleteProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public productoEliminar: Producto
  ) { }

  ngOnInit(): void {
  }


  eliminarProducto() {
    if (this.productoEliminar) {
      this.dialogoReferencia.close('eliminar')
    }
  }

}
