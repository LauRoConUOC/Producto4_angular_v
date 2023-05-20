import { Pipe, PipeTransform } from '@angular/core';

// DEFINO NOMBRE FILTRO
@Pipe({
name: 'filtro'
})

export class FiltroPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultActor = [];
    for(const actor of value){
        if(actor.name.indexOf(arg) > -1){
        resultActor.push(actor);
        }
    }
    return resultActor;
}
}







// filtrado de genero y nacionaleidad 

// export class FiltroActoresPipe implements PipeTransform {
//   transform(value: any[], genero: string, nacionalidad: string): any[] {
//     if (!value) {
//       return [];
//     }

//     if (!genero && !nacionalidad) {
//       return value;
//     }

//     return value.filter((item: any) => {
//       let generoMatch = true;
//       let nacionalidadMatch = true;

//       if (genero) {
//         generoMatch = item.genero.toLowerCase() === genero.toLowerCase();
//       }

//       if (nacionalidad) {
//         nacionalidadMatch = item.nacionalidad.toLowerCase() === nacionalidad.toLowerCase();
//       }

//       return generoMatch && nacionalidadMatch;
//     });
//   }
// }
