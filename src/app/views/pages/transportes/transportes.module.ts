import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TransportesRoutingModule } from './transportes-routing.module';

import { TransportesComponent } from './transportes.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { SupervisoresComponent } from './supervisores/supervisores.component';
import { AsignarConductorComponent } from './supervisores/asignar-conductor/asignar-conductor.component';
import { AsignarComponent } from './supervisores/asignar-conductor/asignar/asignar.component';
import { ConductoresComponent } from './conductores/conductores.component';
import { CrearEditarComponent } from './conductores/crear-editar/crear-editar.component';
import { AsignarVehiculoComponent } from './conductores/asignar-vehiculo/asignar-vehiculo.component';


@NgModule({
  declarations: [
    TransportesComponent,
    VehiculosComponent,
    SupervisoresComponent,
    AsignarConductorComponent,
    AsignarComponent,
    ConductoresComponent,
    CrearEditarComponent,
    AsignarVehiculoComponent
  ],
  imports: [
    CommonModule,
    TransportesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
  ]
})
export class TransportesModule { }
