import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';

import {PeticionesService} from '../../../../core/services/peticiones.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss']
})
export class PaisesComponent implements OnInit {
  // Definimos la variable que vamos a utilizar para el dibujado del datatable
  dtOptions: DataTables.Settings = {};
  // varibale que va a contener los datos que se van a mostrar en el datatable
  datosDatatable = {};
  // variable que va a controlar el loading para que muestre o no la informacion
  cargando = true;

  constructor(
    private peticiones: PeticionesService,
    private modalService: NgbModal,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.consultaInicial();
  }
  // metodo que define las propiedades de configuracion del datatable
  dataTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: false,
      processing: false,
      info: true,
      deferLoading: 57,
      destroy: true,
      responsive: true,
      ordering: true,
      order: [[0, 'desc']],
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        },
      },
    }
  }
  // metodo que va a consultar los datos necesarios del sistema
  consultaInicial() {
    // variables que debemos inicialozar desde su valor predeterminado o inicial
    this.cargando = true;
    this.datosDatatable = [];
    // realizamos la peticion a la API
    this.peticiones.get('api/pais/listado').subscribe( data => {
      // validamos el status ya que pueden presentarse errores controlados
      if (data['status'] === 200) {
        this.datosDatatable = data;
        this.cargando = false;
        this.dataTable();
      }else{
        Swal.fire({
          title: 'Ha ocurrido un error',
          html: `<b>Se ha presentado el siguiente error: ${data['data']}</b>`,
          icon: 'error',
        });
        this.route.navigateByUrl('/');
        return;
      }
    }, error => {
      Swal.fire({
        title: 'Ha ocurrido un error',
        html: `<b>Se ha presentado el siguiente error: ${error}</b>`,
        icon: 'error',
      });
      return;
    });
  }

}
