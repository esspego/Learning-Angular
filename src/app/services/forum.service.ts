import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Message } from '../interface/message.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private itemsCollection: AngularFirestoreCollection<Message>;

  public chats: Message[] = [];
  public user: any = {};

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) {
    this.auth.authState.subscribe(item =>{
      console.log('Estado del usuario:', item);
      if (!item){
        return;
      }
      this.user.name = item.displayName;
      this.user.uid = item.uid;

    });

  }

  login(provider: string) {
    if(provider === 'google'){
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }else{
      return; /* FALTA AÑADIR TWITTER */
    }

  }
  logout() {
    this.user = {};
    this.auth.signOut();
  }

  getMessages(){
    this.itemsCollection = this.afs.collection<any>('chats', ref => ref.orderBy('date', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(map( (messages: Message[]) => {
      console.log(messages);
      this.chats = [];
      for (let message of messages){
        this.chats.unshift(message);
      }
       return this.chats;
    }));
  }
  addMessage(text:string){
    let message: Message = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    };
    return this.itemsCollection.add( message);

  }
}
