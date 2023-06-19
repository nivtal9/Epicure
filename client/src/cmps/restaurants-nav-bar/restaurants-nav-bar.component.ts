import { Component } from '@angular/core';
import { ChangeContext, Options } from '@angular-slider/ngx-slider';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RestaurantsService } from 'src/services/restaurants.service';
import { Observable } from 'rxjs';
import { IRestPageFilter } from '../interfaces/restaurantsPageState';
import { IState } from '../store/epicure/epicureReducers';

@Component({
  selector: 'app-restaurant-nav-bar',
  templateUrl: './restaurants-nav-bar.component.html',
  styleUrls: ['./restaurants-nav-bar.component.scss']
})
export class RestaurantsNavBarComponent {
  activeTab: string
  filter$: Observable<IRestPageFilter>
  filter!: IRestPageFilter
  form: FormGroup;
  slider: FormGroup;
  options!: Options
  priceRange: boolean = false;
  priceRangeBtn: boolean = false;
  rating: boolean = false;
  ratingBtn: boolean = false;

  constructor(private store: Store<IState>, private restService: RestaurantsService) {
    this.form = new FormGroup({
      input0: new FormControl(false),
      input1: new FormControl(false),
      input2: new FormControl(false),
      input3: new FormControl(false),
      input4: new FormControl(false),
    });
    this.slider = new FormGroup({
      ngxSlider: new FormControl([12, 357])
    });
    this.filter$ = this.store.select((state) => state.restaurantsPage.RestPageFilter)
    this.activeTab = 'All'
  }

  ngOnInit() {
    this.filter$.subscribe(filter => this.filter = filter);
    this.options = {
      floor: 12,
      ceil: 357
    };
  }

  clearStars() {
    this.ratingBtn = false;
    this.form.reset({
      input0: false,
      input1: false,
      input2: false,
      input3: false,
      input4: false,
    });
    this.restService.clearByRating(this.deepCopy());
  }


  onStarChange(ev: Event) {
    Object.values(this.form.controls).every(control => !control.value) ? this.ratingBtn = false : this.ratingBtn = true;
    this.restService.filterRating(ev.target as HTMLInputElement, this.deepCopy());
  }

  clearRange() {
    this.priceRangeBtn = false;
    this.slider.reset({ ngxSlider: [12, 357] });
    this.restService.clearByRange(this.deepCopy());
  }

  onRangeChange(ev: ChangeContext) {
    const isRangbarChanged = ev.highValue === this.options.ceil && ev.value === this.options.floor;
    isRangbarChanged ? this.priceRangeBtn = false : this.priceRangeBtn = true
    this.restService.filterRange([ev.value, ev.highValue!], this.deepCopy());
  }

  setHeader(filter: string) {
    this.activeTab = filter;
    this.restService.filterHeader(filter, this.deepCopy());
  }

  isBold(tab: string) {
    return this.activeTab === tab
  }

  deepCopy() {
    return { starRating: [...this.filter.starRating], PriceRange: [...this.filter.PriceRange], headFilter: this.filter.headFilter };
  }
}
