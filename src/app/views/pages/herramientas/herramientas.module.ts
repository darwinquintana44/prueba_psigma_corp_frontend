import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HerramientasRoutingModule } from './herramientas-routing.module';

import { HerramientasComponent } from './herramientas.component';
import { PaisesComponent } from './paises/paises.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { MunicipiosComponent } from './municipios/municipios.component';


@NgModule({
  declarations: [
    HerramientasComponent,
    PaisesComponent,
    DepartamentosComponent,
    MunicipiosComponent,
  ],
  imports: [
    CommonModule,
    HerramientasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
  ]
})
export class HerramientasModule { }
