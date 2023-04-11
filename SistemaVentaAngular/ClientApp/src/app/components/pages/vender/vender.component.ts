import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleVenta } from '../../../interfaces/detalle-venta';
import { Producto } from '../../../interfaces/producto';
import { Venta } from '../../../interfaces/venta';
import { ProductoService } from '../../../services/producto.service';
import { VentaService } from '../../../services/venta.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogResultadoVentaComponent } from '../modals/dialog-resultado-venta/dialog-resultado-venta.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css']
})
export class VenderComponent implements OnInit {
  options: Producto[] = [];
  ELEMENT_DATA: DetalleVenta[] = [];
  deshabilitado: boolean = false;

  filteredOptions!: Producto[];
  agregarProducto!: Producto;
  tipodePago: string = "Efectivo";
  totalPagar: number = 0;

  formGroup: FormGroup;
  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'total','accion'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(
    private fb: FormBuilder,
    private _productoServicio: ProductoService,
    private _ventaServicio: VentaService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {

    this.formGroup = this.fb.group({
      producto: ['', Validators.required],
      cantidad: ['', Validators.required]
    })

    this.formGroup.get('producto')?.valueChanges.subscribe(value => {
      this.filteredOptions =  this._filter(value)
    })

    this._productoServicio.getProductos().subscribe({
      next: (data) => {
        if (data.status)
          this.options = data.value;
      },
      error: (e) => {
      },
      complete: () => {

      }
    })

  }

  ngOnInit(): void {

  }

  private _filter(value: any): Producto[] {
    const filterValue = typeof value === "string" ? value.toLowerCase() : value.nombre.toLowerCase();
    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }


  displayProducto(producto: Producto): string {
    return producto.nombre;
  }

  productoSeleccionado(event: any) {
    this.agregarProducto = event.option.value;
  }

  onSubmitForm() {

    const _cantidad: number = this.formGroup.value.cantidad;
    const _precio: number = parseFloat(this.agregarProducto.precio);
    const _total: number = _cantidad * _precio;
    this.totalPagar = this.totalPagar + _total;

    this.ELEMENT_DATA.push(
      {
        idProducto: this.agregarProducto.idProducto,
        descripcionProducto: this.agregarProducto.nombre,
        cantidad: _cantidad,
        precioTexto: String(_precio.toFixed(2)),
        totalTexto: String(_total.toFixed(2))
      })
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

    this.formGroup.patchValue({
      producto: '',
      cantidad: ''
    })

  }

  eliminarProducto(item: DetalleVenta) {

    this.totalPagar = this.totalPagar - parseFloat(item.totalTexto);
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter(p => p.idProducto != item.idProducto)

    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  registrarVenta() {

    if (this.ELEMENT_DATA.length > 0) {

      this.deshabilitado = true;
      

      const ventaDto: Venta = {
        tipoPago: this.tipodePago,
        totalTexto: String(this.totalPagar.toFixed(2)),
        detalleVenta: this.ELEMENT_DATA
      }

      this._ventaServicio.registrar(ventaDto).subscribe({
        next: (data) => {

          if (data.status) {
            this.totalPagar = 0.00;
            this.ELEMENT_DATA = [];
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.tipodePago = "Efectivo";

            this.dialog.open(DialogResultadoVentaComponent, {
              data: {
                numero: data.value.numeroDocumento
              },
            });

          } else {
            this._snackBar.open("No se pudo registrar la venta", "Oops", {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 3000
            });
          }
        },
        error: (e) => {
        },
        complete: () => {
          this.deshabilitado = false;
        }
      })


    }
  }


}
