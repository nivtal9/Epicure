import { Component } from '@angular/core';
import { IChef } from '../interfaces/IChef';
import { IRestaurant } from '../interfaces/IRestaurant';
import { Observable } from 'rxjs';
import { IState } from '../store/epicure/epicureReducers';
import { Store } from '@ngrx/store';
import { setChefOfTheWeek, setRestaurantsChefOfTheWeek } from '../store/epicure/epicureActions';
@Component({
  selector: 'app-chefoftheweek',
  templateUrl: './chefoftheweek.component.html',
  styleUrls: ['./chefoftheweek.component.scss']
})
export class ChefoftheweekComponent {
  chefItem$: Observable<IChef | null>;
  chefsRestaurants$: Observable<IRestaurant[]>
  constructor(private store: Store<IState>) {
    this.chefItem$ = this.store.select(state => state.homePage.chef)
    this.chefsRestaurants$ = this.store.select(state => state.homePage.chefRestaurants)
  }

  ngOnInit() {
    this.store.dispatch(setChefOfTheWeek())
    this.chefItem$.subscribe(res => {
      if (res !== null) {
        this.store.dispatch(setRestaurantsChefOfTheWeek({ chefId: res.id }))
      }
    })
  }
}
