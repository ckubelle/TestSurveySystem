import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import firebase from 'firebase/app';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    if (credential.user) {
      this.updateUserData(credential.user as User);
    }
  }

  async signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  private updateUserData({
    uid,
    displayName,
    email,
    photoURL,
  }: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${uid}`);
    const data = {
      uid,
      displayName,
      email,
      photoURL,
    };
    return userRef.set(data, { merge: true });
  }
}
