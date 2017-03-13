import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {

  id:any;

  title:any;
  owner:any;
  city:any;
  bedrooms:any;
  price:any;
  type:any;
  image:any

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }

  onEditSubmit(){
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      bedrooms: this.bedrooms,
      pirce: this.price,
      type: this.type
    }
    this.firebaseService.editListing(this.id,listing);

    this.router.navigate(['listings']);
  }

}
