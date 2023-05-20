import { Component, Input } from '@angular/core';
import { Actor } from 'src/app/models/actor';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input() actores: Actor[] = Array(10).fill({nombre: '', genero: '', nacionalidad: '', edad: 0, descripcion: '', video: ''});

  @Input() actorClicado: any;
  
  
}
