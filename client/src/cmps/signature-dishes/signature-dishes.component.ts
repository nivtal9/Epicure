import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DishesService } from 'src/services/dishes.service';
import { IDishes } from '../interfaces/IDishes';
import { setSignatureDishes } from '../store/epicure/epicureActions';
import { IState } from '../store/epicure/epicureReducers';

@Component({
  selector: 'app-signature-dishes',
  templateUrl: './signature-dishes.component.html',
  styleUrls: ['./signature-dishes.component.scss']
})
export class SignatureDishesComponent {
  itemstest$: Observable<IDishes[]>

  constructor(private dishesService: DishesService, private store: Store<IState>) {
    this.itemstest$ = this.store.select(state => state.homePage.dishes)
  }

  ngOnInit() {
    this.store.dispatch(setSignatureDishes())
    // this.dishesService.setSignatureDish()
  }

}
