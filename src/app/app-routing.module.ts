import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';


const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      // rutas para la seccion de herramientas
      {
        path: 'herramientas',
        loadChildren: () => import('./views/pages/herramientas/herramientas.module').then(m => m.HerramientasModule)
      },
      // rutas para la seccion de herramientas
      {
        path: 'transporte',
        loadChildren: () => import('./views/pages/transportes/transportes.module').then(m => m.TransportesModule)
      },
      // rutas que vienen por defecto en la plantilla
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // redireccionamos al home cuando no exista una ruta
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' } // redireccionamos al home cuando la ruta no sea valida
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Pagina No Encontrada',
      desc: 'Oopps!! La pagina que quieres ingresar no existe.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
