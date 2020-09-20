import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styles: [
  ]
})
export class ChatsComponent implements OnInit {
  message = '';
  element: any;
  constructor(public _fs: ForumService) {
    this._fs.getMessages().subscribe(()=> {
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);

    });
   }

  ngOnInit(): void {
    this.element = document.getElementById('app-mensajes');
  }
  sendMessage(){
    console.log(this.message);
    if (this.message.length === 0){
      return;
    }
    this._fs.addMessage( this.message)
      .then(() => console.log(this.message = ''))
      .catch((err) => console.log('Error al guardar', err));

  }

}
