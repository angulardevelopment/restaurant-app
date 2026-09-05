import { DataService } from './../../services/data.service';
import { ApiService } from '../../services/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, SlicePipe, KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-restaurants',
    templateUrl: './restaurants.component.html',
    styleUrls: ['./restaurants.component.scss'],
    imports: [NgClass, SlicePipe, KeyValuePipe]
})
export class RestaurantsComponent implements OnInit {
  allRestaurantList = [];
  allRestaurantCategories = [];
  selectedRestaurantList = [];
  subscriptions;
  constructor(private router: Router, public api: ApiService, public data: DataService) {
    this.subscriptions = this.data.selectedCuisineItem.subscribe((data) => {
      if (data) {
        this.getSelectedCuisine(data)
      }
    });

  }

  ngOnInit(): void {
    this.getData();

  }

  openRestaurantDetail(id): void {
    this.router.navigate(['/restaurantDetails/', id]);

  }

  getData() {
    this.api.getService('allRestaurants').subscribe(data => {
      this.allRestaurantList = data.allRestaurants;
      this.selectedRestaurantList = this.allRestaurantList;


      this.allRestaurantCategories = this.data.getNamesWithCount(this.allRestaurantList, 'restaurantCategory');

    });
  }

  getSelectedCuisine(selectedCategory) {
    if (selectedCategory === 'All') {
      this.selectedRestaurantList = this.allRestaurantList;

    } else {
      this.selectedRestaurantList = this.allRestaurantList.filter(x => x.restaurantCuisine.includes(selectedCategory));

    }
  }

  ngOnDestroy() { this.subscriptions.unsubscribe(); }

}
