import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogUsuarioComponent } from '../modals/dialog-usuario/dialog-usuario.component';
import { DialogDeleteUsuarioComponent } from '../modals/dialog-delete-usuario/dialog-delete-usuario.component';
import { Usuario } from '../../../interfaces/usuario';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UsuarioServicioService } from '../../../services/usuario-servicio.service';

const ELEMENT_DATA: Usuario[] = [
  //{ idUsuario: 1, nombreApellidos: "jose mendez", correo: "jose@gmail.com", idRol: 1,rolDescripcion:"Administrador",clave:"1233"},
  //{ idUsuario: 2, nombreApellidos: "leo muñoz", correo: "leo@gmail.com", idRol: 2, rolDescripcion: "Empleado",clave:"4566"},
  //{ idUsuario: 3, nombreApellidos: "yamile pinto", correo: "yamile@gmail.com", idRol: 2, rolDescripcion: "Empleado",clave:"6788"},

];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombreApellidos', 'correo', 'rolDescripcion','acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _usuarioServicio: UsuarioServicioService
  )
  {
    
  }

  ngOnInit(): void {
    this.mostrarUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarUsuarios() {
    this._usuarioServicio.getUsuarios().subscribe({
      next: (data) => {
        if(data.status)
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

  agregarUsuario() {
    this.dialog.open(DialogUsuarioComponent, {
        disableClose: true
      }).afterClosed().subscribe(result => {
        
        if (result === "agregado") {
          this.mostrarUsuarios();
        }
      });
  }

  editarUsuario(usuario: Usuario) {
    this.dialog.open(DialogUsuarioComponent, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(result => {
      
      if (result === "editado")
        this.mostrarUsuarios();

    });
  }

  eliminarUsuario(usuario: Usuario) {
    this.dialog.open(DialogDeleteUsuarioComponent, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(result => {
      
      if (result === "eliminar") {

        this._usuarioServicio.deleteUsuario(usuario.idUsuario).subscribe({
          next: (data) => {

            if (data.status) {
              this.mostrarAlerta("El usuario fue eliminado", "Listo!")
              this.mostrarUsuarios();
            } else {
              this.mostrarAlerta("No se pudo eliminar el usuario", "Error");
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

  mostrarAlerta(mensaje:string,tipo:string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration:3000
    });
  }


}
