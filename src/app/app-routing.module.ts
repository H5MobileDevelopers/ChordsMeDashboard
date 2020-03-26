import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChordsComponent} from './chords/chords.component';
import {ArtistComponent} from './artist/artist.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'chords', component: ChordsComponent},
  {path: 'artist', component: ArtistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
