import { IRestaurant } from "./IRestaurant";

export interface restaurantsPageState {
    restaurants: IRestaurant[];
    RestPageFilter: IRestPageFilter;
    error: any;
};

export interface IRestPageFilter {
    headFilter: string,
    starRating: boolean[],
    PriceRange: number[],
}