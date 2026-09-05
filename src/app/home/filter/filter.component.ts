import { DataService } from './../../services/data.service';
import { ApiService } from './../../services/api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgClass, KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    imports: [NgClass, KeyValuePipe]
})
export class FilterComponent implements OnInit {
  @Output() closePopup = new EventEmitter();
  allRestaurantCuisines = [];
  selectedItem = 'All';

  constructor(public api: ApiService, public data: DataService) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.api.getService('allRestaurants').subscribe(data => {


      this.allRestaurantCuisines = this.data.getNamesWithCount(data.allRestaurants, 'restaurantCuisine');

    });
  }

  hide() {
    this.closePopup.emit(false);
    this.data.addBlur.next(false);
  }

  filterData(event) {
    const selectedCategory = (event.target.innerText.split('(')[0]).trim();
    this.selectedItem = selectedCategory;
    this.data.selectedCuisineItem.next(selectedCategory);
  }
}
