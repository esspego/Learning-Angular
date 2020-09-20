import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  public chats: Observable<any[]>;

  constructor(firestore: AngularFirestore) {

    this.chats = firestore.collection('chats').valueChanges();
  }

  ngOnInit(): void {
  }

}
