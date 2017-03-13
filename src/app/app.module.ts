import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule , Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';

import { FirebaseService } from './services/firebase.service';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';


export const firebaseConfig = {
  apiKey: 'AIzaSyCAaBlSKpG9USI6G60_WLumCskBVcaEuLc',
  authDomain: 'learnfirebase-87beb.firebaseapp.com',
  databaseURL: 'https://learnfirebase-87beb.firebaseio.com',
  storageBucket: 'learnfirebase-87beb.appspot.com',
  messagingSenderId: '218698815061'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'listings', component: ListingsComponent},
  {path: 'listing/:id', component: ListingComponent},
  {path: 'add-listing', component: AddListingComponent},
  {path: 'edit-listing/:id', component: EditListingComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
