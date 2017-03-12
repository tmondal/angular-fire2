import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

    listings: FirebaseListObservable<any[]>;
    listing: FirebaseObjectObservable<any>;

    folder: any;

    constructor(private af: AngularFire) {
      this.folder = 'imageslisting';
    }

    getListings(){
      this.listings = this.af.database.list('/listings') as FirebaseListObservable<Listing[]>
      return this.listings;
    }
    // Get a single item from json tree
    getListingDetails(id){
      this.listing = this.af.database.object('/listings/' + id) as FirebaseObjectObservable<Listing>
      return this.listing;
    }
    // upload image to Storage(google cloud service) and form data to Real time database
    addListing(listing){
      let storageRef = firebase.storage().ref();
      for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
        let path = `/${this.folder}/${selectedFile.name}`;
        let iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) =>{
          // keep related image informaton in Real time database
          listing.image = selectedFile.name;
          listing.path = path;
          return this.listings.push(listing);
        });
      }
    }
}

interface Listing{
  $key?: String;
  title?: String;
  type?: String;
  image?: String;
  city?: String;
  owner?: String;
  bedrooms?: String;
}
