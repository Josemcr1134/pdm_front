import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }


  currentAlert(title:string, msg:string, theme:any){
    Swal.fire(title, msg, theme);
  };



  handleErrors(err:any) {
    let errorMessage = '';

    // Verifica si existen errores específicos por campo
    if (err.error) {
      Object.keys(err.error).forEach((field) => {
        if (Array.isArray(err.error[field])) {
          errorMessage += `: ${err.error[field].join(', ')}\n`;
        }
      });
         // Mostrar alerta de SweetAlert con los mensajes de error
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage || 'Algo salió mal. Por favor intenta de nuevo.'
        });
    };
  };
}
