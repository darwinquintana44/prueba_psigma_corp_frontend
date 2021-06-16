import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TransportesComponent} from './transportes.component';
import {VehiculosComponent} from './vehiculos/vehiculos.component';
import {SupervisoresComponent} from './supervisores/supervisores.component';
import {AsignarConductorComponent} from './supervisores/asignar-conductor/asignar-conductor.component';
import {ConductoresComponent} from './conductores/conductores.component';

const routes: Routes = [
  {
    path: '',
    component: TransportesComponent,
    children: [
      { path: 'vehiculos', component: VehiculosComponent },
      { path: 'supervisores', component: SupervisoresComponent },
      { path: 'asignar_conductor', component: AsignarConductorComponent },
      { path: 'conductores', component: ConductoresComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportesRoutingModule { }
