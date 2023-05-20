import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Actor } from 'src/app/models/actor';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() actores: Actor[] = [];
  @Input() actor: Actor | null = null;
  @Output() actorActualizado: EventEmitter<Actor> = new EventEmitter<Actor>();

  editando: boolean = false;
  actorEditado: Actor | null = null;

  constructor(private firestoreService: FirestoreService, private storage: AngularFireStorage, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.firestoreService.getDocuments('actors').subscribe((actors) => {
      this.actores = actors;
    });
  }

  activarEdicion(): void {
    if (this.actor) {
      this.actorEditado = { ...this.actor };
      this.editando = true;
    }
  }
  selectFile(inputElement: HTMLInputElement): void {
  inputElement.click();
}

  guardarCambios(): void {
    if (this.actorEditado) {
      if (this.actorEditado.id) {
        this.firestoreService.updateDocument('actors', this.actorEditado.id, this.actorEditado).then(() => {
          if (this.actor) {
            Object.assign(this.actor, this.actorEditado);
            this.actorActualizado.emit(this.actor);
          }
          this.editando = false;
          this.actorEditado = null;
        }).catch((error) => {
          console.error("Error al actualizar el actor:", error);
        });
      } else {
        console.error("No se puede actualizar el actor porque su ID no está definida.");
      }
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.actorEditado = null;
  }

  uploadFile(event: any, type: 'foto' | 'video'): void {
    const file = event.target.files[0];
    const filePath = `actors/${this.actor?.id}/${type}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Observa los cambios en el estado de la subida y actualiza la URL de la foto o video cuando finalice
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          if (this.actorEditado) {
            if (type === 'foto') {
              this.actorEditado.foto = url;
            } else if (type === 'video') {
              this.actorEditado.video = url;
            }
          }
        });
      })
    ).subscribe();
  }
  
}