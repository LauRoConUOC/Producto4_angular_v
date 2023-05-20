import { Pipe, PipeTransform } from '@angular/core';
import { Actor } from '../models/actor';

@Pipe({
    name: 'filterGenero'
})
export class FiltroGenero implements PipeTransform {
    transform(value: Actor[], generos: { masculino: boolean; femenino: boolean }): Actor[] {
        if (!generos.masculino && !generos.femenino) {
            return value;
        }

        if (generos.masculino && !generos.femenino) {
            return value.filter(actor => actor.genero === 'Masculino');
        }

        if (!generos.masculino && generos.femenino) {
            return value.filter(actor => actor.genero === 'Femenino');
        }

        return value;
    }
}