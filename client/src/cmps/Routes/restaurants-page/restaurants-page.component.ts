import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRestaurant } from 'src/cmps/interfaces/IRestaurant';
import { setAllRestaurants } from 'src/cmps/store/epicure/epicureActions';
import { IState } from 'src/cmps/store/epicure/epicureReducers';

@Component({
  selector: 'app-restaurants-page',
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.scss']
})
export class RestaurantsPageComponent {
  itemstest$: Observable<IRestaurant[]>;
  constructor(private store: Store<IState>) {
    this.itemstest$ = this.store.select(state => state.restaurantsPage.restaurants)
  }

  ngOnInit() {
    this.store.dispatch(setAllRestaurants());
    // this.restService.setAllRestaurantPage()
    // this.restService.HttpReqGetAll().subscribe((item: any) => console.log(item))
  }
}
