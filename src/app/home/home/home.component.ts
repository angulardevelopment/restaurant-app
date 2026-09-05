import { DataService } from './../../services/data.service';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [NgClass, FilterComponent, RouterOutlet]
})
export class HomeComponent implements OnInit {
  restaurantList = [];
  popupOpenedName = '';
  fiterPopup = false;
  addBlurOnElement = false;
  subscriptions;
  constructor(public api: ApiService, private router: Router, public data: DataService) {
    this.subscriptions = this.data.addBlur.subscribe((val) => {


      this.addBlurOnElement = val;

    });
  }

  ngOnInit(): void {

  }



  openFilter(popupName): void {

    this.popupOpenedName = popupName;
    this[popupName] = true;
    this.addBlurOnElement = true;

    this.data.addBlur.next(true);
  }

  ngOnDestroy() { this.subscriptions.unsubscribe(); }

}
