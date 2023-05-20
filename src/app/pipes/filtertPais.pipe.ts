import { Pipe, PipeTransform } from '@angular/core';
import { Actor } from '../models/actor';

@Pipe({
    name: 'filterPais'
})
export class FiltroPais implements PipeTransform {
    transform(value: Actor[], arg: string): Actor[] {
      const resultActor: Actor[] = [];
      for (const actor of value) {
        if (actor.nacionalidad.indexOf(arg) > -1) {
          resultActor.push(actor);
        }
      }
      return resultActor;
    }
}