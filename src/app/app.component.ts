import { Component } from '@angular/core';
import { Actor } from './models/actor';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'producto1';

  actorClicado: Actor | null = null;
  nombre: string = "";
  actores: Actor[] = [];
  actoresRef: AngularFireList<any>;

  pais: string = "";

  masculino: boolean = false;
  femenino: boolean = false;

  constructor(private db: AngularFireDatabase) {
    this.actoresRef = db.list('actors'); 
    this.actoresRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.actores = data;
    });
  }

  recibirActorClicado(actor: Actor): void {
    this.actorClicado = actor;
  }
}
