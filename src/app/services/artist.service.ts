import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {NameCodePair} from '../model/name-code-pair';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(public fireStore: AngularFirestore,
              public notifyService: NotificationService) { }
  artists: NameCodePair[];
  loadAllArtists() {
    return this.fireStore.collection('artists').snapshotChanges().pipe(map(artists => {
      return artists.map(a => {
        const data = a.payload.doc.data();
        // @ts-ignore
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }
  loadAllArtistsToLocal() {
    return this.fireStore.collection('artists').snapshotChanges().pipe(map(artists => {
      return artists.map(a => {
        const data = a.payload.doc.data();
        // @ts-ignore
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    })).subscribe((art: NameCodePair[]) => {
      this.artists = art;
      this.notifyService.success(this.artists.length + ' Artists Loaded.');
    });
  }
  get _artists() {
    return this.artists;
  }

  deleteArtist(id: any) {
    this.fireStore.doc('artists/' + id).delete();
  }

  editArtist(id: string, artist: NameCodePair) {
    this.fireStore.doc('artists/' + id).update(artist);
  }

  saveArtist(artist: NameCodePair) {
    return new Promise<NameCodePair> ((resolve, reject) => {
      this.fireStore.collection('artists').add(artist).then(res => {}, err => reject(err));
    });
  }
}
