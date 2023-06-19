import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { RestaurantsService } from 'src/services/restaurants.service';
import { setAllRestaurants, setAllRestaurantsFailure, setAllRestaurantsSuccess, setFavoriteRestaurants, setFavoriteRestaurantsSuccess, setRestaurantsChefOfTheWeek, setRestaurantsChefOfTheWeekFailure, setRestaurantsChefOfTheWeekSuccess } from './epicureActions';

@Injectable()
export class restaurantsEffects {
    constructor(private actions$: Actions, private restService: RestaurantsService) { }

    loadAllRestaurants$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setAllRestaurants),
            switchMap(() =>
                this.restService.setAllRestaurantPage().pipe(
                    map((props) => setAllRestaurantsSuccess({ props })),
                    catchError((err) => of(setAllRestaurantsFailure({ err })))
                )
            )
        )
    );

    loadFavoriteRestaurants$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setFavoriteRestaurants),
            switchMap(() =>
                this.restService.setPopularRest().pipe(
                    map((props) => setFavoriteRestaurantsSuccess({ props })),
                    catchError((err) => of(setAllRestaurantsFailure({ err })))
                )
            )
        )
    );

    loadRestaurantsOfChef$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setRestaurantsChefOfTheWeek),
            switchMap(({ chefId }) =>
                this.restService.setRestaurntsOfChef(chefId).pipe(
                    map((props) => setRestaurantsChefOfTheWeekSuccess({ props })),
                    catchError((err) => of(setRestaurantsChefOfTheWeekFailure({ err })))
                )
            )
        )
    );
}