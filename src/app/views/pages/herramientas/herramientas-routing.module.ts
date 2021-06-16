import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {HerramientasComponent} from './herramientas.component';
import {PaisesComponent} from './paises/paises.component';
import {DepartamentosComponent} from './departamentos/departamentos.component';
import {MunicipiosComponent} from './municipios/municipios.component';

const routes: Routes = [
  {
    path: '',
    component: HerramientasComponent,
    children: [
      { path: 'paises', component: PaisesComponent },
      { path: 'departamentos', component: DepartamentosComponent },
      { path: 'municipios', component: MunicipiosComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerramientasRoutingModule {}
