import { createAction, props } from '@ngrx/store';
import { IChef } from 'src/cmps/interfaces/IChef';
import { IDishes } from 'src/cmps/interfaces/IDishes';
import { IRestaurant } from 'src/cmps/interfaces/IRestaurant';

//RestaurantsPage Actions
export const setAllRestaurants = createAction('[restaurants.service]setAllRestaurants');
export const setAllRestaurantsSuccess = createAction('[restaurants.service]setAllRestaurantsSuccess', props<{ props: IRestaurant[] }>());
export const setAllRestaurantsFailure = createAction('[restaurants.service]setAllRestaurantsFailure', props<{ err: any }>());

export const setHeadRestFilter = createAction('[restaurants.service]setHeadRestFilter', props<{ props: string }>());
export const setRatingRestFilter = createAction('[restaurants.service]setRatingRestFilter', props<{ props: boolean[] }>());
export const setPriceRestFilter = createAction('[restaurants.service]setPriceRestFilter', props<{ props: number[] }>());

//HomePage Actions
export const setFavoriteRestaurants = createAction('[restaurants.service]setFavoriteRestaurants');
export const setFavoriteRestaurantsSuccess = createAction('[restaurants.service]setFavoriteRestaurantsSuccess', props<{ props: IRestaurant[] }>());
export const setFavoriteRestaurantsFailure = createAction('[restaurants.service]setFavoriteRestaurantsFailure', props<{ err: any }>());

export const setSignatureDishes = createAction('[dishes.service]setSignatureDishes');
export const setSignatureDishesSuccess = createAction('[dishes.service]setSignatureDishesSuccess', props<{ props: IDishes[] }>());
export const setSignatureDishesFailure = createAction('[dishes.service]setSignatureDishesFailure', props<{ err: any }>());

export const setChefOfTheWeek = createAction('[chefs.service]setChefOfTheWeek');
export const setChefOfTheWeekSuccess = createAction('[chefs.service]setChefOfTheWeekSuccess', props<{ props: IChef }>());
export const setChefOfTheWeekFailure = createAction('[chefs.service]setChefOfTheWeekFailure', props<{ err: any }>());

export const setRestaurantsChefOfTheWeek = createAction('[restaurants.service]setRestaurantsChefOfTheWeek', props<{ chefId: number }>());
export const setRestaurantsChefOfTheWeekSuccess = createAction('[restaurants.service]setRestaurantsChefOfTheWeekSuccess', props<{ props: IRestaurant[] }>());
export const setRestaurantsChefOfTheWeekFailure = createAction('[restaurants.service]setRestaurantsChefOfTheWeekFailure', props<{ err: any }>());

//restaurantPage Action
export const setRestaurantDishes = createAction('[dishes.service]setRestaurantDishes', props<{ restId: number, mealTypeId: number }>());
export const setRestaurantDishesSuccess = createAction('[dishes.service]setRestaurantDishesSuccess', props<{ props: IDishes[] }>());
export const setRestaurantDishesFailure = createAction('[dishes.service]setRestaurantDishesFailure', props<{ err: any }>());

//shoppingBag Actions
export const addShoppingBagItem = createAction('[dishes.service]addShoppingBagItem', props<{ props: IDishes }>());
export const resetShoppingBag = createAction('[dishes.service]resetShoppingBag');