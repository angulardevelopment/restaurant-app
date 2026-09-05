import { DataService } from './../../services/data.service';
import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgClass, CurrencyPipe, KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-restaurant-details',
    templateUrl: './restaurant-details.component.html',
    styleUrls: ['./restaurant-details.component.scss'],
    imports: [NgClass, CurrencyPipe, KeyValuePipe]
})
export class RestaurantDetailsComponent implements OnInit {
  allRestaurants = [];
  allMenus = [];

  selectedRestaurantDetail = [];
  allRestaurantMenus = [];
  itemCategoriesList = [];
  selectedRestaurantMenus = [];
  selectedItem = 'All';
  constructor(public api: ApiService, private activatedRoute: ActivatedRoute, public data: DataService) { }

  ngOnInit(): void {
    this.getRestaurantDetails();

  }

  getID() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.selectedRestaurantDetail = this.allRestaurants.filter(x => x.id == id);

      this.allRestaurantMenus = this.allMenus.filter(x => x.restaurantName.includes(this.selectedRestaurantDetail[0].restaurantName));

      this.selectedRestaurantMenus = this.allRestaurantMenus;
      this.itemCategoriesList = this.data.getNamesWithCount(this.allRestaurantMenus, 'itemCategory');


    });
  }

  getMenus() {
    this.api.getService('menu').subscribe(data => {
      this.allMenus = data.menu;
      this.getID();
    });
  }

  getRestaurantDetails() {
    this.api.getService('restaurantDetails').subscribe(data => {
      this.allRestaurants = data.restaurantDetails;
      this.getMenus();


    });
  }

  filterData(event) {
    const selectedCategory = (event.target.innerText.split('(')[0]).trim();
    this.selectedItem = selectedCategory;
    if (selectedCategory === 'All') {
      this.selectedRestaurantMenus = this.allRestaurantMenus;

    } else {
      this.selectedRestaurantMenus = this.allRestaurantMenus.filter(x => x.itemCategory.includes(selectedCategory));

    }



  }


}
