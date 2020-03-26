import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Chord} from '../model/chord';

@Injectable({
  providedIn: 'root'
})
export class ChordsService {

  constructor(public fireStore: AngularFirestore) { }
  loadAllChords() {
    return this.fireStore.collection('chords').snapshotChanges().pipe(map(chords => {
      return chords.map(a => {
        const data = a.payload.doc.data();
        // @ts-ignore
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }

  findChordsByArtist(artist) {
    return this.fireStore.collection('chords', ref => ref.where('artistCode', '==', artist)
    ).snapshotChanges().pipe(map(chords => {
      return chords.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }

  deleteChord(id: any) {
    this.fireStore.doc('chords/' + id).delete();
  }

  editChord(id: string, chord: Chord) {
    this.fireStore.doc('chords/' + id).update(chord);
  }

  saveChord(chord: Chord) {
    return new Promise<Chord> ((resolve, reject) => {
      this.fireStore.collection('chords').add(chord).then(res => {}, err => reject(err));
    });
  }
}
