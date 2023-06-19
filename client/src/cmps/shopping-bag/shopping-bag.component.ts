import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IOrder } from '../interfaces/IOrder';
import { IState } from '../store/epicure/epicureReducers';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.scss']
})
export class ShoppingBagComponent {
  isEmpty: boolean = false;
  order$: Observable<IOrder>;
  form: FormGroup

  constructor(private store: Store<IState>) {
    this.form = new FormGroup({
      textArea: new FormControl(),
    });
    this.order$ = this.store.select((state) => state.shoppingBag.order)
  }
}
