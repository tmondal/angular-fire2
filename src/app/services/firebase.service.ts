import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

    listings: FirebaseListObservable<any[]>;
    listing: FirebaseObjectObservable<any>;

    folder: any;
    requiredImage:any;

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
    // upload image to Storage(google cloud service) and form data to Realtime database
    addListing(listing){
      let storageRef = firebase.storage().ref();
      for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
        let path = `/${this.folder}/${selectedFile.name}`;
        let iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) =>{
          // keep related image informaton (meta data) in Real time database
          listing.image = selectedFile.name;
          listing.path = path;
          return this.listings.push(listing);
        });
      }
    }
    // Edit listing
    editListing(id,modifiedlisting){
      console.log(modifiedlisting);
      let storageRef = firebase.storage().ref();
      let relatedListing = this.af.database.object('/listings/' + id) as FirebaseObjectObservable<Listing>;
      relatedListing.subscribe((listing) =>{
          this.requiredImage = listing.image;
      });
      let imgRef = storageRef.child('/'+this.folder+ '/' + this.requiredImage);
      imgRef.delete().then(() =>{
      console.log('Image deleted');
      }).catch(function(error) {
        console.log('Error !! Not deleted');
      });
      // Replace data in Realtime database
      for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
        let path = `/${this.folder}/${selectedFile.name}`;
        let iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) =>{
          // keep related image informaton (meta data) in Real time database
          modifiedlisting.image = selectedFile.name;
          modifiedlisting.path = path;
          return firebase.database().ref('/listings/' + id).set(modifiedlisting);
        });
      }

    }
    // Delete a listing
    deleteListing(id){

      let storageRef = firebase.storage().ref();
      let relatedListing = this.af.database.object('/listings/' + id) as FirebaseObjectObservable<Listing>;
      relatedListing.subscribe((listing) =>{
          this.requiredImage = listing.image;
      });
      let path = `/${this.folder}/${this.requiredImage}`;
      let imgRef = storageRef.child(path);
      imgRef.delete().then(() =>{
      console.log('Image deleted');
      }).catch(function(error) {
        console.log('Error !! Not deleted');
      });
      // Replace data in Realtime database
      return firebase.database().ref('/listings/' + id).set(null);

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
