import { createReducer, on } from '@ngrx/store';
import { addShoppingBagItem, resetShoppingBag, setAllRestaurants, setAllRestaurantsFailure, setAllRestaurantsSuccess, setChefOfTheWeek, setChefOfTheWeekFailure, setChefOfTheWeekSuccess, setFavoriteRestaurants, setFavoriteRestaurantsFailure, setFavoriteRestaurantsSuccess, setHeadRestFilter, setPriceRestFilter, setRatingRestFilter, setRestaurantDishes, setRestaurantDishesFailure, setRestaurantDishesSuccess, setRestaurantsChefOfTheWeek, setRestaurantsChefOfTheWeekFailure, setRestaurantsChefOfTheWeekSuccess, setSignatureDishes, setSignatureDishesFailure, setSignatureDishesSuccess } from './epicureActions';
import { restaurantsPageState } from 'src/cmps/interfaces/restaurantsPageState';
import { restaurantPageState } from 'src/cmps/interfaces/restaurantPageState';
import { homePageState } from 'src/cmps/interfaces/homePageState';
import { shoppingBagState } from 'src/cmps/interfaces/shoppingBagState';
export interface IState {
    homePage: homePageState,
    restaurantsPage: restaurantsPageState,
    restaurantPage: restaurantPageState
    shoppingBag: shoppingBagState
}

const HomePageInitialState: homePageState = {
    restaurants: [],
    dishes: [],
    chef: null,
    chefRestaurants: [],
    error: null
};

const RestaurantPageInitialState: restaurantPageState = {
    dishes: [],
    error: null
};

const shoppingBagInitialState: shoppingBagState = {
    order: {
        restName: '',
        dishes: [],
        totalSum: 0,
        comment: ''
    },
    error: null

};


const RestaurantsPageInitialState: restaurantsPageState = {
    restaurants: [],
    RestPageFilter: {
        headFilter: 'All',
        starRating: new Array(5).fill(false),
        PriceRange: [12, 357]
    },
    error: null
};

export const restaurantsPageReducer = createReducer(RestaurantsPageInitialState,
    on(setAllRestaurants, (state) => ({ ...state })),
    on(setAllRestaurantsSuccess, (state, { props }) => ({ ...state, restaurants: props })),
    on(setAllRestaurantsFailure, (state, { err }) => ({ ...state, error: err })),

    on(setHeadRestFilter, (state, { props }) => ({ ...state, RestPageFilter: { ...state.RestPageFilter, headFilter: props } })),
    on(setRatingRestFilter, (state, { props }) => ({ ...state, RestPageFilter: { ...state.RestPageFilter, starRating: props } })),
    on(setPriceRestFilter, (state, { props }) => ({ ...state, RestPageFilter: { ...state.RestPageFilter, PriceRange: props } })),
);

export const homePageReducer = createReducer(HomePageInitialState,
    on(setFavoriteRestaurants, (state) => ({ ...state })),
    on(setFavoriteRestaurantsSuccess, (state, { props }) => ({ ...state, restaurants: props })),
    on(setFavoriteRestaurantsFailure, (state, { err }) => ({ ...state, error: err })),

    on(setSignatureDishes, (state) => ({ ...state })),
    on(setSignatureDishesSuccess, (state, { props }) => ({ ...state, dishes: props })),
    on(setSignatureDishesFailure, (state, { err }) => ({ ...state, error: err })),

    on(setChefOfTheWeek, (state) => ({ ...state })),
    on(setChefOfTheWeekSuccess, (state, { props }) => ({ ...state, chef: props })),
    on(setChefOfTheWeekFailure, (state, { err }) => ({ ...state, error: err })),

    on(setRestaurantsChefOfTheWeek, (state,) => ({ ...state })),
    on(setRestaurantsChefOfTheWeekSuccess, (state, { props }) => ({ ...state, chefRestaurants: props })),
    on(setRestaurantsChefOfTheWeekFailure, (state, { err }) => ({ ...state, error: err }))
);

export const restaurantPageReducer = createReducer(RestaurantPageInitialState,
    on(setRestaurantDishes, (state) => ({ ...state })),
    on(setRestaurantDishesSuccess, (state, { props }) => ({ ...state, dishes: props })),
    on(setRestaurantDishesFailure, (state, { err }) => ({ ...state, error: err }))
);

export const shoppingBagReducer = createReducer(shoppingBagInitialState,
    on(addShoppingBagItem, (state, { props }) => ({
        ...state, order: {
            ...state.order,
            dishes: [...state.order.dishes, props],
            restName: props.restaurant?.name!,
            totalSum: state.order.totalSum + (props.price * props.quantity!)
        }
    })),
    on(resetShoppingBag, (state) => state = shoppingBagInitialState)
);

