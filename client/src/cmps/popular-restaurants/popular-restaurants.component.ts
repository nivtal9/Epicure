import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RestaurantsService } from 'src/services/restaurants.service';
import { IRestaurant } from '../interfaces/IRestaurant';
import { setFavoriteRestaurants } from '../store/epicure/epicureActions';
import { IState } from '../store/epicure/epicureReducers';

@Component({
  selector: 'app-popular-restaurants',
  templateUrl: './popular-restaurants.component.html',
  styleUrls: ['./popular-restaurants.component.scss']
})
export class PopularRestaurantsComponent {
  itemstest$: Observable<IRestaurant[]>

  constructor(private store: Store<IState>) {
    this.itemstest$ = this.store.select(state => state.homePage.restaurants)
  }

  ngOnInit() {
    this.store.dispatch(setFavoriteRestaurants())
    // this.restService.setPopularRest()
  }
}
