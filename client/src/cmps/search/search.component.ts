import { Component, Input, SimpleChanges } from '@angular/core';
import { ChefsService } from 'src/services/chefs.service';
import { DishesService } from 'src/services/dishes.service';
import { RestaurantsService } from 'src/services/restaurants.service';
import { IChef } from '../interfaces/IChef';
import { IDishes } from '../interfaces/IDishes';
import { IRestaurant } from '../interfaces/IRestaurant';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() searchvalue!: string
  @Input() fromHero: boolean = true;

  restResult!: IRestaurant[];
  chefResult!: IChef[];
  dishResult!: IDishes[];

  constructor(
    private chefService: ChefsService,
    private restService: RestaurantsService,
    private dishService: DishesService) { }

  ngOnChanges(changes: SimpleChanges) {
    // this.restResult = this.restService.findRestByName(changes['searchvalue'].currentValue);
    // this.chefResult = this.chefService.findChefByName(changes['searchvalue'].currentValue);
    // this.dishResult = this.dishService.findDishByName(changes['searchvalue'].currentValue);
  }
}
