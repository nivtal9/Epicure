import { IChef } from "./IChef";
import { IDishes } from "./IDishes";
import { IRestaurant } from "./IRestaurant";

export interface homePageState {
    restaurants: IRestaurant[];
    dishes: IDishes[];
    chef: IChef | null
    chefRestaurants: IRestaurant[];
    error: any;
}