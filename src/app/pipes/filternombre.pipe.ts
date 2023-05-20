import { Pipe, PipeTransform } from '@angular/core';
import { Actor } from '../models/actor';

@Pipe({
  name: 'filternombre'
})
export class FilternombrePipe implements PipeTransform {

  transform(actores: Actor[], nombre: string): Actor[] {
    if (!nombre) {
      return actores;
    }
    return actores.filter(actor => actor.nombre.toLowerCase().includes(nombre.toLowerCase()));
  }

}