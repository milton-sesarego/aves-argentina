import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable()
export class FirebaseService {

  categoriasTest: Observable<any[]>;

  constructor( private afs: AngularFirestore ) { }

  getCategoriasTest() {
    this.categoriasTest = this.afs.collection('avistajes').valueChanges();
    return this.categoriasTest;
  }
}
