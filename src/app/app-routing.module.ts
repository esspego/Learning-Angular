import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormsComponent } from './pages/forms/forms.component';
import { HttpRequestComponent } from './pages/http-request/http-request.component';
import { ItemComponent } from './pages/item/item.component';
import { ForumComponent } from './pages/forum/forum.component';

const routes: Routes = [
  {path: 'forum', component: ForumComponent},
  {path: 'http-request', component: HttpRequestComponent},
  {path: 'item/:id', component: ItemComponent},
  {path: 'forms', component: FormsComponent},
  {path: 'home', component: HomeComponent},
  {path: '*', pathMatch: 'full', redirectTo: 'forum'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
