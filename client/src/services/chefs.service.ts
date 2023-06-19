import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
// import { chefs } from 'src/cmps/DB/ChefDB';
import { homePageState } from 'src/cmps/interfaces/homePageState';
import { IChef } from 'src/cmps/interfaces/IChef';
import { setChefOfTheWeek } from 'src/cmps/store/epicure/epicureActions';
@Injectable({
  providedIn: 'root'
})
export class ChefsService {

  constructor(private homePageStore: Store<{ homePage: homePageState }>, private http: HttpClient) { }

  setChefOfTheWeek() {
    return this.http.get<IChef>('https://localhost:5001/api/chefs/chefoftheweek');
    // https://localhost:5001/api/chefs/chefoftheweek
    // return of(chefs.find((chef: IChef) => chef.chefOfTheWeek) as IChef)
    // this.homePageStore.dispatch(setChefOfTheWeek({ props: filter }))
  }

  findChefByName(str: string) {
    //need to replace
    return this.http.get<IChef>('https://localhost:5001/api/chefs/chefoftheweek');
    // return chefs.filter((chef: IChef) => chef.name.toLowerCase().includes(str))
  }
}
