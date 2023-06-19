import { Component, Input } from '@angular/core';
import { IRestaurant } from '../interfaces/IRestaurant';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent {
  @Input() restaurantItem!: IRestaurant;
  @Input() fromPopularRest: boolean = true;
  starsArr: boolean[] = []


  ngOnInit() {
    this.starsArr = Array(5).fill(true, 0, this.restaurantItem.rating ? this.restaurantItem.rating : 0)
  }
}
