import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(public _fs:ForumService) { }

  login(provider: string){
    console.log(provider);
    this._fs.login(provider);

  }

  ngOnInit(): void {
  }

}
