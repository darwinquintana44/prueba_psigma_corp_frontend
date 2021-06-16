import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

import {PeticionesService} from '../../../../../core/services/peticiones.service';

@Component({
  selector: 'app-asignar-vehiculo',
  templateUrl: './asignar-vehiculo.component.html',
  styleUrls: ['./asignar-vehiculo.component.scss']
})
export class AsignarVehiculoComponent implements OnInit {
  // Definimos la variable que vamos a utilizar para el dibujado del datatable
  dtOptions: DataTables.Settings = {};
  // varibale que va a contener los datos que se van a mostrar en el datatable
  datosDatatable = {};
  // varibale que va a contener los datos que se van a mostrar en el select de vehiculos
  datosSelect = {};
  vehiculoSeleccionado = '';
  // variable que va a controlar el loading para que muestre o no la informacion
  cargando = true;

  @Input() idConductor: number;
  @Input() nombreConductor: string;

  constructor(private peticiones: PeticionesService) { }

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
    this.peticiones.get(`api/conductor/${this.idConductor}/vehiculo`).subscribe( data => {
      this.peticiones.get(`api/vehiculo/listado_por_descripcion`).subscribe( data2 => {
        // validamos el status ya que pueden presentarse errores controlados
        if (data['status'] === 200) {
          // validamos el segundo consumo
          if (data2['status'] === 200) {
            this.datosDatatable = data;
            this.datosSelect = data2;
            this.cargando = false;
            this.dataTable();
          }else{
            Swal.fire({
              title: 'Ha ocurrido un error',
              html: `<b>Se ha presentado el siguiente error: ${data2['data']}</b>`,
              icon: 'error',
            });
            return;
          }
        }else{
          Swal.fire({
            title: 'Ha ocurrido un error',
            html: `<b>Se ha presentado el siguiente error: ${data['data']}</b>`,
            icon: 'error',
          });
          return;
        }
      }, error2 => {
        Swal.fire({
          title: 'Ha ocurrido un error',
          html: `<b>Se ha presentado el siguiente error2: ${error2}</b>`,
          icon: 'error',
        });
        return;
      });
    }, error => {
      Swal.fire({
        title: 'Ha ocurrido un error',
        html: `<b>Se ha presentado el siguiente error: ${error}</b>`,
        icon: 'error',
      });
      return;
    });
  }
  // metodo que va guardar y/o asignar el supervisor al conductor
  asignarVehiculo(form: NgForm){
    /* validamos si el formulario es invalido, si es cierto devolvemos un mensaje de validacion,
     * de lo contrario seguimos guardando la informacion
     */
    if (form.invalid) {
      // colocamos todos los campos como touch para que nos muestre la clase respectiva
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      Swal.fire({
        title: 'Ha ocurrido un error',
        html: `Debe seleccionar un VEHÍCULO para poder continuar`,
        icon: 'warning'
      });
      return;
    }
    // si toda la info es correcta, continuamos aqui y guardamos la informacion
    const JSON = {
      id_conductor : this.idConductor,
      id_vehiculo : this.vehiculoSeleccionado
    };
    this.peticiones.post('api/asigna_vehiculo', JSON).subscribe( data => {
      // validamos el segundo consumo
      if (data['status'] === 200) {
        Swal.fire({
          title: 'Felicitaciones, Vehículo Asignado',
          html: `<b>${data['data']}</b>`,
          icon: 'success',
        });
        this.consultaInicial();
        this.cargando = false;
      }else{
        Swal.fire({
          title: 'Ha ocurrido un error',
          html: `<b>Se ha presentado el siguiente error: ${data['data']}</b>`,
          icon: 'error',
        });
        return;
      }

    });
  }

}
