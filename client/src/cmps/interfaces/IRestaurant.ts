import { Time } from "@angular/common";
import { IChef } from "./IChef";
import { IDishes } from "./IDishes";
import { openHours } from "./OpenHours";

export interface IRestaurant {
    id: number,
    name: string;
    imageURI: string;
    rating: number;
    popularity: number;
    DateOpened: Date
    chef: IChef;
    openingHours: openHours[]
    dishes: IDishes[];
}