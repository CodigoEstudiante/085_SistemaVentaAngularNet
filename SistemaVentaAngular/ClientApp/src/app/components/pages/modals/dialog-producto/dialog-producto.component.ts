import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../../../../interfaces/categoria';
import { Producto } from '../../../../interfaces/producto';
import { CategoriaService } from '../../../../services/categoria.service';
import { ProductoService } from '../../../../services/producto.service';

@Component({
  selector: 'app-dialog-producto',
  templateUrl: './dialog-producto.component.html',
  styleUrls: ['./dialog-producto.component.css']
})
export class DialogProductoComponent implements OnInit {
  formProducto: FormGroup;
  accion: string = "Agregar"
  accionBoton: string = "Guardar";
  listaCategorias: Categoria[] = [];




  constructor(
    private dialogoReferencia: MatDialogRef<DialogProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public productoEditar: Producto,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _categoriaServicio: CategoriaService,
    private _productoServicio: ProductoService
  ) {
    this.formProducto = this.fb.group({
      nombre: ['', Validators.required],
      idCategoria: ['', Validators.required],
      stock: ['', Validators.required],
      precio: ['', Validators.required],
    })


    if (this.productoEditar) {

      this.accion = "Editar";
      this.accionBoton = "Actualizar";
    }

    this._categoriaServicio.getCategorias().subscribe({
      next: (data) => {

        if (data.status) {

          this.listaCategorias = data.value;

          if (this.productoEditar)
            this.formProducto.patchValue({
              idCategoria: this.productoEditar.idCategoria
            })

        }
      },
      error: (e) => {
      },
      complete: () => {
      }
    })

  }


  ngOnInit(): void {

    if (this.productoEditar) {
      console.log(this.productoEditar)
      this.formProducto.patchValue({
        nombre: this.productoEditar.nombre,
        idCategoria: String(this.productoEditar.idCategoria),
        stock: this.productoEditar.stock,
        precio:this.productoEditar.precio
      })
    }
  }

  agregarEditarProducto() {

    const _producto: Producto = {
      idProducto: this.productoEditar == null ? 0 : this.productoEditar.idProducto,
      nombre: this.formProducto.value.nombre,
      idCategoria: this.formProducto.value.idCategoria,
      descripcionCategoria : "",
      precio: this.formProducto.value.precio,
      stock: this.formProducto.value.stock
    }



    if (this.productoEditar) {

      this._productoServicio.edit(_producto).subscribe({
        next: (data) => {

          if (data.status) {
            this.mostrarAlerta("El producto fue editado", "Exito");
            this.dialogoReferencia.close('editado')
          } else {
            this.mostrarAlerta("No se pudo editar el producto", "Error");
          }

        },
        error: (e) => {
          console.log(e)
        },
        complete: () => {
        }
      })


    } else {

      this._productoServicio.save(_producto).subscribe({
        next: (data) => {

          if (data.status) {
            this.mostrarAlerta("El producto fue registrado", "Exito");
            this.dialogoReferencia.close('agregado')
          } else {
            this.mostrarAlerta("No se pudo registrar el producto", "Error");
          }

        },
        error: (e) => {
        },
        complete: () => {
        }
      })


    }
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

}
