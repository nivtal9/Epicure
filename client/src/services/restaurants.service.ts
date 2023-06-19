
import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
// import { restaurants } from 'src/cmps/DB/RestaurantDB';
import { homePageState } from 'src/cmps/interfaces/homePageState';
import { IRestaurant } from 'src/cmps/interfaces/IRestaurant';
import { openHours } from 'src/cmps/interfaces/OpenHours';
import { IRestPageFilter, restaurantsPageState } from 'src/cmps/interfaces/restaurantsPageState';
import { setAllRestaurantsSuccess, setHeadRestFilter, setPriceRestFilter, setRatingRestFilter, setRestaurantsChefOfTheWeek } from 'src/cmps/store/epicure/epicureActions';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private restaurantsStore: Store<{ restaurantsPage: restaurantsPageState }>,
    private homePageStore: Store<{ homePage: homePageState }>, private http: HttpClient) { }
  setAllRestaurantPage() {
    return this.http.get<IRestaurant[]>('https://localhost:5001/api/restaurants/');
    // return of(restaurants)
  }

  // findByChef(chefName: string) {
  //   return restaurants.filter((restaurant: IRestaurant) => restaurant.chef === chefName)
  // }

  setRestaurntsOfChef(chefId: number) {
    return this.http.get<IRestaurant[]>(`https://localhost:5001/api/restaurants/bychef/${chefId}`)
    // return of(restaurants.filter((res: IRestaurant) => res.chef === chefName))
  }

  setPopularRest() {
    return this.http.get<IRestaurant[]>('https://localhost:5001/api/restaurants/top3')
    // return of([...restaurants].sort((rest1: IRestaurant, rest2: IRestaurant) => (rest2.rating ? rest2.rating : 0) - (rest1.rating ? rest1.rating : 0)).slice(0, 3))
  }

  findRestByName(str: string) {
    //need to replace
    return this.http.get<IRestaurant[]>('https://localhost:5001/api/restaurants/top3')
    // return restaurants.filter((rest: IRestaurant) => rest.name.toLowerCase().includes(str))
  }

  filterRating(input: HTMLInputElement, filterObj: IRestPageFilter) {
    filterObj.starRating[Number(input.id)] = input.checked;
    this.restaurantsStore.dispatch(setRatingRestFilter({ props: filterObj.starRating }))
    this.filterAll(filterObj);
  }

  filterByRating(boolArr: boolean[], restArr: IRestaurant[]) {
    return boolArr.every(e => !e) ? restArr : restArr.filter(ele => boolArr[ele.rating - 1])
  }

  clearByRating(filterObj: IRestPageFilter) {
    filterObj.starRating = new Array(5).fill(false);
    this.restaurantsStore.dispatch(setRatingRestFilter({ props: filterObj.starRating }))
    this.filterAll(filterObj);
  }

  filterHeader(str: string, filterObj: IRestPageFilter) {
    filterObj.headFilter = str;
    this.restaurantsStore.dispatch(setHeadRestFilter({ props: filterObj.headFilter }))
    this.filterAll(filterObj)
  }

  filterByHeader(filter: string) {
    // switch (filter) {
    //   case 'All': {
    //     return restaurants;
    //   }
    //   case 'New': {
    //     return restaurants.filter(ele => {
    //       const today: Date = new Date();
    //       return ele.DateOpened.getTime() >= today.setFullYear(today.getFullYear() - 1);
    //     });
    //   }
    //   case 'Most Popular': {
    //     return restaurants.filter(ele => ele.popularity > 35);
    //   }
    //   case 'Open Now': {
    //     return restaurants.filter(ele => {
    //       return this.timeComperator(ele.openingHour)
    //     });
    //   }
    //   default:
    //     return restaurants;
    // }
  }

  filterRange(rangeArr: number[], filterObj: IRestPageFilter) {
    filterObj.PriceRange = rangeArr;
    this.restaurantsStore.dispatch(setPriceRestFilter({ props: filterObj.PriceRange }))
    this.filterAll(filterObj)
  }

  filterByRange(rangeArr: number[], restArr: IRestaurant[]) {
    return restArr.filter(rest => {
      let flag: boolean = false
      rest.dishes?.forEach(dish => {
        if (dish.price >= rangeArr[0] && dish.price <= rangeArr[1]) {
          flag = true;
        }
      });
      return flag ? true : false;
    });
  }

  clearByRange(filterObj: IRestPageFilter) {
    filterObj.PriceRange = [12, 357];
    this.restaurantsStore.dispatch(setPriceRestFilter({ props: filterObj.PriceRange }))
    this.filterAll(filterObj);
  }

  filterAll(filterObj: IRestPageFilter) {

    let filterArr: IRestaurant[] = []//this.filterByHeader(filterObj.headFilter)
    filterArr = this.filterByRating(filterObj.starRating, filterArr);
    filterArr = this.filterByRange(filterObj.PriceRange, filterArr);
    this.restaurantsStore.dispatch(setAllRestaurantsSuccess({ props: filterArr }))
  }

  timeComperator(openHour: openHours[]) {
    const date: Date = new Date();
    const today = date.getDay();
    const timeNow: Time = { hours: date.getHours(), minutes: date.getMinutes() };
    var openeingtimetoday = new Date(openHour[today].opening)
    var closingtimetoday = new Date(openHour[today].closing)
    if (timeNow.hours > openeingtimetoday.getHours() && timeNow.hours < closingtimetoday.getHours()) {
      return true;
    }
    else {
      if (timeNow.hours === openeingtimetoday.getHours()) {
        return timeNow.minutes >= openeingtimetoday.getMinutes() ? true : false;
      }
      else if (timeNow.hours === closingtimetoday.getHours()) {
        return timeNow.minutes <= closingtimetoday.getMinutes() ? true : false;
      }
    }
    return false;
  }

  findMinMax(filterArr: IRestaurant[]) {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    filterArr.forEach(rest => rest.dishes?.forEach(dish => {
      if (dish.price > max) {
        max = dish.price
      }
      if (dish.price < min) {
        min = dish.price
      }
    }))
    return [min, max];
  }
}
