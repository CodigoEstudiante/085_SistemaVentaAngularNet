import { Component, OnInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogProductoComponent } from '../modals/dialog-producto/dialog-producto.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../../interfaces/producto';
import { DialogDeleteProductoComponent } from '../modals/dialog-delete-producto/dialog-delete-producto.component';
import { ProductoService } from '../../../services/producto.service';


const ELEMENT_DATA: Producto[] = [
  { idProducto: 1, nombre: "yougur gloria", idCategoria: 1, descripcionCategoria:"Lacteos", stock: 30, precio: "2.5" },
  { idProducto: 2, nombre: "Detergente sapolio", idCategoria: 2, descripcionCategoria:"Productos de Limpieza", stock: 23, precio: "3.5" },
  { idProducto: 3, nombre: "Mantequilla lavie", idCategoria: 3, descripcionCategoria:"Abarrotes", stock: 25, precio: "4.5" },

];

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'categoria', 'stock','precio', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _productoServicio: ProductoService
  ) {

  }

  ngOnInit(): void {
    this.mostrarProductos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarProductos() {
    this._productoServicio.getProductos().subscribe({
      next: (data) => {
        if (data.status)
          this.dataSource.data = data.value;
        else
          this._snackBar.open("No se encontraron datos", 'Oops!', { duration: 2000 });
      },
      error: (e) => {
      },
      complete: () => {

      }
    })
  }


  agregarProducto() {
    this.dialog.open(DialogProductoComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === "agregado") {
        this.mostrarProductos();
      }
    });
  }

  editarProducto(producto: Producto) {
    this.dialog.open(DialogProductoComponent, {
      disableClose: true,
      data: producto
    }).afterClosed().subscribe(result => {

      if (result === "editado")
        this.mostrarProductos();

    });
  }


  eliminarProducto(producto: Producto) {
    this.dialog.open(DialogDeleteProductoComponent, {
      disableClose: true,
      data: producto
    }).afterClosed().subscribe(result => {

      if (result === "eliminar") {

        this._productoServicio.delete(producto.idProducto).subscribe({
          next: (data) => {

            if (data.status) {
              this.mostrarAlerta("El producto fue eliminado", "Listo!")
              this.mostrarProductos();
            } else {
              this.mostrarAlerta("No se pudo eliminar el producto", "Error");
            }

          },
          error: (e) => {
          },
          complete: () => {
          }
        })

      }


    
    });
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

}
