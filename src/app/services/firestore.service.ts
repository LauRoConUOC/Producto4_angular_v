import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Actor } from '../models/actor';


@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Método para obtener documentos de una colección
  getDocuments(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).valueChanges({ idField: 'id' });
  }

  // Método para eliminar un documento de una colección
  deleteDocument(collection: string, documentId: string): Promise<void> {
    return this.firestore.collection(collection).doc(documentId).delete();
  }

  
  // Método para actualizar un documento en una colección
  updateDocument(collection: string, documentId: string, data: any): Promise<void> {
    return this.firestore.collection(collection).doc(documentId).update(data);
  }
  //método PARA añadir un nuevo actor en la colección de actores
  addActor(collectionName: string, actor: Actor): Promise<any> {
    return this.firestore.collection(collectionName).add(actor);
  }
}