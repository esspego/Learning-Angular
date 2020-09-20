import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsComponent } from './pages/forms/forms.component';
import { HomeComponent } from './pages/home/home.component';
import { from } from 'rxjs';
import { HttpRequestComponent } from './pages/http-request/http-request.component';
import { ItemComponent } from './pages/item/item.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { ForumComponent } from './pages/forum/forum.component';
import { ChatsComponent } from './components/chats/chats.component';
import { ForumService } from './services/forum.service';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    HomeComponent,
    HttpRequestComponent,
    ItemComponent,
    ForumComponent,
    ChatsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    ForumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
