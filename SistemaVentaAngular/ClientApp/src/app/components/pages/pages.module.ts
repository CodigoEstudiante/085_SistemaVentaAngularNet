import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { PagesComponent } from './pages.component';

import { ReusableModule } from '../reusable/reusable.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { VenderComponent } from './vender/vender.component';
import { HistorialventaComponent } from './historialventa/historialventa.component';
import { ReportesComponent } from './reportes/reportes.component';
import { DialogUsuarioComponent } from './modals/dialog-usuario/dialog-usuario.component';
import { DialogProductoComponent } from './modals/dialog-producto/dialog-producto.component';
import { DialogDeleteUsuarioComponent } from './modals/dialog-delete-usuario/dialog-delete-usuario.component';
import { DialogDeleteProductoComponent } from './modals/dialog-delete-producto/dialog-delete-producto.component';
import { DialogDetalleVentaComponent } from './modals/dialog-detalle-venta/dialog-detalle-venta.component';
import { DialogResultadoVentaComponent } from './modals/dialog-resultado-venta/dialog-resultado-venta.component';


@NgModule({
  declarations: [
    PagesComponent,
    NavigationComponent,
    DashboardComponent,
    UsuariosComponent,
    ProductosComponent,
    VenderComponent,
    HistorialventaComponent,
    ReportesComponent,
    DialogUsuarioComponent,
    DialogProductoComponent,
    DialogDeleteUsuarioComponent,
    DialogDeleteProductoComponent,
    DialogDetalleVentaComponent,
    DialogResultadoVentaComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,

    ReusableModule
  ]
})
export class PagesModule { }
