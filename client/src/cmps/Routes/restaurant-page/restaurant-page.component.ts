import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MealType } from 'src/cmps/interfaces/DishExtrasEnum';
import { IDishes } from 'src/cmps/interfaces/IDishes';
import { IRestaurant } from 'src/cmps/interfaces/IRestaurant';
import { setRestaurantDishes } from 'src/cmps/store/epicure/epicureActions';
import { IState } from 'src/cmps/store/epicure/epicureReducers';
import { DishesService } from 'src/services/dishes.service';
import { RestaurantsService } from 'src/services/restaurants.service';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.scss']
})
export class RestaurantPageComponent {
  currRest!: IRestaurant
  openClosed!: string
  mealFilter: MealType = MealType.BREAKFAST;
  restaurantDishes$: Observable<IDishes[]>
  constructor(private restService: RestaurantsService, private store: Store<IState>, private dishService: DishesService) {
    this.restaurantDishes$ = this.store.select(state => state.restaurantPage.dishes)
  }

  ngOnInit() {
    this.currRest = history.state.restaurant;
    this.openClosed = this.restService.timeComperator(this.currRest.openingHours) ? 'Open now' : 'Closed now'
    this.store.dispatch(setRestaurantDishes({ restId: this.currRest.id, mealTypeId: this.mealFilter }))
    // this.dishService.setDishesByHeader(this.currRest, this.mealFilter)
  }

  isUnderline(id: MealType) {
    return this.mealFilter === id
  }

  setHeader(id: MealType) {
    this.mealFilter = id
    this.store.dispatch(setRestaurantDishes({ restId: this.currRest.id, mealTypeId: this.mealFilter }))
  }
}
