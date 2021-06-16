import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import {PeticionesService} from '../../../../../core/services/peticiones.service';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.scss']
})
export class CrearEditarComponent implements OnInit {
  // variable que se va a encargar de recibir la informacion solicitada
  @Input() idConductor: number;
  // emitimos esta variable al padre para que se realice la actualizacion o recargue nuevamente de los datos en el datatable
  @Output() actualizarDatos = new EventEmitter();
  // variable que va a contener el texto del boton ya sea para guardar o actualizar
  textoBoton = '';
  // variable que va a controlar el loading para que muestre o no la informacion, tambien de departamentos y municipios
  cargando = true;
  cargandoDepartamento = true;
  cargandoMunicipio = true;
  // variable que va a contener los datos consultado de los paises, departamentos y municipios
  dataPaises = {};
  dataDepartamentos = {};
  dataMunicipios = {};
  // variables que van a contener los datos seleccionados de paises y departamentos
  paisSeleccionado = '';
  departamentoSeleccionado = '';
  // variable que va a contener los datos consultados en caso de que sea una actualizacion del registro
  datos = {
    id: '',
    nombres: '',
    apellidos: '',
    identificacion: '',
    telefono: '',
    ciudad_nacimiento: '',
    direccion: ''
  };

  constructor( private peticiones: PeticionesService ) { }

  ngOnInit(): void {
    if (this.idConductor > 0){
      this.textoBoton = 'ACTUALIZAR INFORMACIÓN';
      this.consultaPorId();
    }else{
      this.textoBoton = 'CREAR REGISTRO';
      this.consultaPaises();
    }
  }
  devolverDatos() {
    this.actualizarDatos.emit(true);
  }
  // metodo que consulta los paises
  consultaPaises() {
    this.cargando = true;
    this.cargandoDepartamento = true;
    // consultamos los paises
    this.peticiones.get('api/pais/listado').subscribe( data => {
      // validamos el status ya que pueden presentarse errores controlados
      if (data['status'] === 200) {
        this.dataPaises = data;
        this.cargando = false;
      } else {
        Swal.fire({
          title: 'Ha ocurrido un error',
          html: `<b>Se ha presentado el siguiente error: ${data['data']}</b>`,
          icon: 'error',
        });
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
  // metodo que consulta los departamentos
  consultaDepartamentos(idPais) {
    this.cargandoDepartamento = true;
    this.cargandoMunicipio = true;
    if (idPais !== ''){
      // consultamos los departamentos
      this.peticiones.get(`api/departamento/listado/${idPais}`).subscribe( data => {
        // validamos el status ya que pueden presentarse errores controlados
        if (data['status'] === 200) {
          this.dataDepartamentos = data;
          this.cargandoDepartamento = false;
        } else {
          Swal.fire({
            title: 'Ha ocurrido un error',
            html: `<b>Se ha presentado el siguiente error: ${data['data']}</b>`,
            icon: 'error',
          });
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
  // metodo que consulta los municipios
  consultaMunicipios(idDepartamento) {
    this.cargandoMunicipio = true;
    if (idDepartamento !== ''){
      // consultamos los municipios
      this.peticiones.get(`api/municipio/listado/${idDepartamento}`).subscribe( data => {
        // validamos el status ya que pueden presentarse errores controlados
        if (data['status'] === 200) {
          this.dataMunicipios = data;
          this.cargandoMunicipio = false;
        } else {
          Swal.fire({
            title: 'Ha ocurrido un error',
            html: `<b>Se ha presentado el siguiente error: ${data['data']}</b>`,
            icon: 'error',
          });
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
  // consultamos por el id del registro
  consultaPorId () {
    this.cargando = true;
    // realizamos la peticion
    this.peticiones.get(`api/conductor/listado/${this.idConductor}`).subscribe( data => {
      // validamos el status ya que pueden presentarse errores controlados
      if (data['status'] === 200) {
        // consultamos los paises
        this.peticiones.get('api/pais/listado').subscribe( data2 => {
          // validamos el status ya que pueden presentarse errores controlados
          if (data2['status'] === 200) {
            // consultamos los departamentos
            this.peticiones.get(`api/departamento/listado/${data['data'][0].id_pais}`).subscribe(data3 => {
              // validamos el status ya que pueden presentarse errores controlados
              if (data3['status'] === 200) {
                // consultamos los municipios
                this.peticiones.get(`api/municipio/listado/${data['data'][0].id_depa}`).subscribe(data4 => {
                  // validamos el status ya que pueden presentarse errores controlados
                  if (data4['status'] === 200) {
                    this.dataPaises = data2;
                    this.dataDepartamentos = data3;
                    this.dataMunicipios = data4;

                    this.datos.id = data['data'][0].id;
                    this.datos.nombres = data['data'][0].nombres;
                    this.datos.apellidos = data['data'][0].apellidos;
                    this.datos.identificacion = data['data'][0].identificacion;
                    this.datos.telefono = data['data'][0].telefono;
                    this.datos.direccion = data['data'][0].direccion;
                    this.datos.ciudad_nacimiento = data['data'][0].ciudad_nacimiento;

                    this.paisSeleccionado = data['data'][0].id_pais;
                    this.departamentoSeleccionado = data['data'][0].id_depa;

                    this.cargando = false;
                    this.cargandoDepartamento = false;
                    this.cargandoMunicipio = false;
                  }else{
                    Swal.fire({
                      title: 'Ha ocurrido un error',
                      html: `<b>Se ha presentado el siguiente error: ${data4['data']}</b>`,
                      icon: 'error',
                    });
                    return;
                  }
                });
              }else{
                Swal.fire({
                  title: 'Ha ocurrido un error',
                  html: `<b>Se ha presentado el siguiente error: ${data3['data']}</b>`,
                  icon: 'error',
                });
                return;
              }
            });
          }else{
            Swal.fire({
              title: 'Ha ocurrido un error',
              html: `<b>Se ha presentado el siguiente error: ${data2['data']}</b>`,
              icon: 'error',
            });
            return;
          }
        }, error2 => {
          Swal.fire({
            title: 'Ha ocurrido un error',
            html: `<b>Se ha presentado el siguiente error: ${error2.error}</b>`,
            icon: 'error',
          });
          return;
        })
      }else{
        Swal.fire({
          title: 'Ha ocurrido un error',
          html: `<b>Se ha presentado el siguiente error: ${data['error']}</b>`,
          icon: 'error',
        });
        return;
      }
    }, error => {
      Swal.fire({
        title: 'Ha ocurrido un error',
        html: `<b>Se ha presentado el siguiente error: ${error.error}</b>`,
        icon: 'error',
      });
      return;
    });
  }
  // procesarmiento de datos a crear o actualizar
  crearEditarDatos(form: NgForm) {
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
        html: `Todos los campos con el * son obligatorios`,
        icon: 'warning'
      });
      return;
    }
    // validamos en que momento es para crear o actualizar un registro
    if (this.idConductor === -1){ // creamos un registro
      this.peticiones.post('api/conductor', this.datos).subscribe( data => {
        // validamos el status ya que pueden presentarse errores controlados
        if (data['status'] === 200) {
          this.datos = {
            id: '',
            nombres: '',
            apellidos: '',
            identificacion: '',
            telefono: '',
            direccion: '',
            ciudad_nacimiento: ''
          };
          Swal.fire({
            title: 'Felicidades',
            html: `El registro se ha creado satisfactoriamente`,
            icon: 'success',
          });
          this.devolverDatos();
          return;
        }else{
          Swal.fire({
            title: 'Ha ocurrido un error',
            html: `<b>Se ha presentado el siguiente error: ${data['error']}</b>`,
            icon: 'error',
          });
          return;
        }
      }, error => {
        Swal.fire({
          title: 'Ha ocurrido un error',
          html: `<b>Se ha presentado el siguiente error: ${error.error}</b>`,
          icon: 'error',
        });
        return;
      });
    } else { // actualizamos un registro
      this.peticiones.patch('api/conductor', this.datos).subscribe( data => {
        // validamos el status ya que pueden presentarse errores controlados
        if (data['status'] === 200) {
          Swal.fire({
            title: 'Felicidades',
            html: `El registro se ha actualizado satisfactoriamente`,
            icon: 'success',
          });
          this.devolverDatos();
          return;
        }else{
          Swal.fire({
            title: 'Ha ocurrido un error',
            html: `<b>Se ha presentado el siguiente error: ${data['error']}</b>`,
            icon: 'error',
          });
          return;
        }
      }, error => {
        Swal.fire({
          title: 'Ha ocurrido un error',
          html: `<b>Se ha presentado el siguiente error: ${error.error}</b>`,
          icon: 'error',
        });
        return;
      });
    }
  }

}
