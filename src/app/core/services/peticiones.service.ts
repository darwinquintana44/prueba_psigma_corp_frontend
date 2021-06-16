import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RutaGlobalModule } from '../models/ruta-global.module';

@Injectable({
  providedIn: 'root',
})
export class PeticionesService {
  // variable instanciada que va a contener la ruta global para el consumo de la API
  rutaPadre: RutaGlobalModule = new RutaGlobalModule();

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Metodo getMenu que se encarga de consultar el menu del usuario segun el token
   * @param url => se debe especificar la url en un string
   */
  getMenu(url: string) {
    return this.http.get(`${this.rutaPadre.rutaGlobal}${url}`);
  }

  /**
   * Metodo GET de consumo para las diferentes rutas de la API
   * @param url => se debe especificar la ruta a la cual se va a hacer GET
   */
  get(url: string) {
    return this.http.get(`${this.rutaPadre.rutaGlobal}${url}`);
  }

  /**
   * Metodo POST de consumo para las diferentes rutas de la API
   * @param url => se debe especificar la ruta a la cual se va a hacer POST
   * @param data => los datos que se van a enviar al momento de ejecutar del metodo POST
   */
  post(url: string, data: object) {
    return this.http.post(`${this.rutaPadre.rutaGlobal}${url}`, data);
  }

  /**
   * Metodo PUT de consumo para las diferentes rutas de la API
   * @param url => se debe especificar la ruta a la cual se va a hacer PUT
   * @param data => los datos que se van a enviar al momento de ejecutar del metodo PUT
   */
  put(url: string, data: object) {
    return this.http.put(`${this.rutaPadre.rutaGlobal}${url}`, data);
  }

  /**
   * Metodo PATCH de consumo para las diferentes rutas de la API
   * @param url => se debe especificar la ruta a la cual se va a hacer PATCH
   * @param data => los datos que se van a enviar al momento de ejecutar del metodo PATCH
   */
  patch(url: string, data: object) {
    return this.http.patch(`${this.rutaPadre.rutaGlobal}${url}`, data);
  }

  /**
   * Metodo DELETE de consumo para las diferentes rutas de la API
   * @param url => se debe especificar la ruta a la cual se va a hacer DELETE
   */
  delete(url: string) {
    return this.http.delete(`${this.rutaPadre.rutaGlobal}${url}`);
  }
}
