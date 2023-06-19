import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
// import { dishes } from 'src/cmps/DB/DishesDB';
import { MealType } from 'src/cmps/interfaces/DishExtrasEnum';
import { homePageState } from 'src/cmps/interfaces/homePageState';
import { IDishes } from 'src/cmps/interfaces/IDishes';
import { IRestaurant } from 'src/cmps/interfaces/IRestaurant';
import { restaurantPageState } from 'src/cmps/interfaces/restaurantPageState';
import { shoppingBagState } from 'src/cmps/interfaces/shoppingBagState';
import { addShoppingBagItem, resetShoppingBag, setRestaurantDishes } from 'src/cmps/store/epicure/epicureActions';


@Injectable({
  providedIn: 'root'
})
export class DishesService {

  constructor(private homePageStore: Store<{ homePage: homePageState }>,
    private restaurantPageStore: Store<{ restaurantPage: restaurantPageState }>,
    private shoppingBag: Store<{ shoppingBag: shoppingBagState }>, private http: HttpClient) { }

  setDishesByHeader(currRest: number, mealFilter: number) {
    return this.http.get<IDishes[]>(`https://localhost:5001/api/dishes/${currRest}/getbymealtype/${mealFilter}`)
    // this.restaurantPageStore.dispatch(setRestaurantDishes({
    //   props: currRest.dishes?.filter(dish => {
    //     let flag: boolean = false;
    //     dish.dishMealTypes?.forEach(type => {
    //       if (type.enum === mealFilter) {
    //         flag = true;
    //       }
    //     });
    //     return flag ? true : false
    //   })
    // }));
  }

  setSignatureDish() {
    return this.http.get<IDishes[]>('https://localhost:5001/api/dishes/signature')
    // return of(dishes.slice(0, 3))
    // this.homePageStore.dispatch(setSignatureDishes({ props: dishes.slice(0, 3) }))
  }

  findDishByName(str: string) {
    //need to be replace
    return this.http.get<IDishes[]>('https://localhost:5001/api/dishes/signature')
    // return dishes.filter((dish: IDishes) => dish.name.toLowerCase().includes(str))
  }

  addToShoppingBag(value: any, currDish: IDishes, newOrder: boolean = false) {
    if (newOrder) {
      this.shoppingBag.dispatch(resetShoppingBag())
    }
    const dish = JSON.parse(JSON.stringify(currDish));
    const tempChange: number[] = []
    dish.changes.forEach((ele: number, i: number) =>
      value.checkboxes[i] ? tempChange.push(ele) : null
    );
    dish.changes = tempChange;
    dish.sides = dish.sides?.filter((ele: number) => ele === Number(value.radio))
    dish.quantity = value.quantity;
    dish.restaurant = history.state.restaurant.name;
    this.shoppingBag.dispatch(addShoppingBagItem({ props: dish }))
  }
}
