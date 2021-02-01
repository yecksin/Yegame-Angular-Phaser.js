import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayComponent } from './play/play.component';


const routes: Routes = [
  { path: '', component: PlayComponent },
  { path: 'play', component: PlayComponent },
  { path: 'path3', component: PlayComponent },
  { path: 'path4', component: PlayComponent },
  { path: '**', component: PlayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
