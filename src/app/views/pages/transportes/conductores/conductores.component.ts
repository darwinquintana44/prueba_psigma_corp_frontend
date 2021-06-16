import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

import {PeticionesService} from '../../../../core/services/peticiones.service';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.scss']
})
export class ConductoresComponent implements OnInit {
  // Definimos la variable que vamos a utilizar para el dibujado del datatable
  dtOptions: DataTables.Settings = {};
  // varibale que va a contener los datos que se van a mostrar en el datatable
  datosDatatable = [];
  // variable que va a controlar el loading para que muestre o no la informacion
  cargando = true;
  // variable que va a contener el id del conductor para el actualizar y un -1 en caso de crear
  idConductor = -1;
  nombreConductor = '';

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
    this.peticiones.get('api/conductor/listado').subscribe( data => {
      // validamos el status ya que pueden presentarse errores controlados
      if (data['status'] === 200) {
        this.datosDatatable = data['data'];
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
  /**
   * Utilizamos este metodo para hacer la eliminacion un poco mas manual por medio del Swal
   * @param nombre => parametro que va a contener el nombre del conductor para mostrarlo en el Swal
   * @param id => parametro que va a contener el id del conductor para hacer el respectivo consumo a la ruta ya esta necesita el id
   */
  eliminar(nombre: string, id: number) {
    this.cargando = true;
    // inicialisamos el Swal para proceder con la eliminacion del registro
    Swal.fire({
      title: '¿Está seguro?',
      html: `Está seguro que desea eliminar el conductor:<br><b>${nombre}</b>`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      // el Swal devuelve una promesa por lo que la usamos cuando los datos esten correctos
      if (resp.value) {
        // al dar click en el boton de confirmar el value queda en true por lo que procedemos a eliminiar
        // realizamos el consumo para la respectiva eliminacion del registro
        this.peticiones.delete(`api/conductor/${id}`).subscribe(
          (data) => {
            // validamos el status ya que pueden presentarse errores controlados
            if (data['status'] === 200) {
              Swal.fire({
                title: 'Muy bien',
                text: 'Registro Eliminado correctamente',
                icon: 'success',
              });
              this.consultaInicial();
            }else{
              Swal.fire({
                title: 'Ha ocurrido un error',
                html: `<b>Se ha presentado el siguiente error: ${data['error']}</b>`,
                icon: 'error',
              });
              return;
            }

          },
          (err) => {
            Swal.fire({
              title: 'Ha ocurrido un error',
              html: `<b>Se ha presentado el siguiente error: ${err}</b>`,
              icon: 'error',
            });
          }
        );
      }
      this.cargando = false;
    });
  }
  // MODAL DE LA OPCION PARA CREAR O ACTUALIZAR REGISTROS
  modalCrearEditar(content, id = null) {
    this.idConductor = id === null ? -1 : id;
    this.modalService.open(content, { size: 'xl', scrollable: true }).result.then((result) => {}).catch((res) => {});
  }
  // MODAL DE LA OPCION PARA CREAR O ACTUALIZAR REGISTROS
  modalAsingarVahiculo(content, id, nombre) {
    this.idConductor = id;
    this.nombreConductor = nombre;
    this.modalService.open(content, { size: 'xl', scrollable: true }).result.then((result) => {}).catch((res) => {});
  }
  // refrescamos el datatable segun lo que el hijo envia
  refrescar( event ) {
    this.consultaInicial();
  }

}
