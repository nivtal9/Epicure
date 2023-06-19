import { Sides, Changes, DishIcon, MealTypes, Side, Change } from "./DishExtrasEnum";
import { IRestaurant } from "./IRestaurant";

export interface IDishes {
    name: string;
    ingredients: string;
    imageURI: string;
    price: number;
    dishIcons?: DishIcon[];
    dishMealTypes?: MealTypes[];
    dishSides?: Side[];
    dishChanges?: Change[];
    quantity?: number;
    restaurant?: IRestaurant;
}