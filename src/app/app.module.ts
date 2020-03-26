import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import { ChordsComponent } from './chords/chords.component';
import { ArtistComponent } from './artist/artist.component';
import { ChordsAddComponent } from './chords/chords-add/chords-add.component';
import { ArtistAddComponent } from './artist/artist-add/artist-add.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {
  MatBadgeModule, MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule,
  MatSelectModule, MatSnackBarModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ConfirmComponent } from './services/dialog/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ChordsComponent,
    ArtistComponent,
    ChordsAddComponent,
    ArtistAddComponent,
    HomeComponent,
    NavBarComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatBadgeModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ChordsAddComponent, ArtistAddComponent, ConfirmComponent]
})
export class AppModule { }
