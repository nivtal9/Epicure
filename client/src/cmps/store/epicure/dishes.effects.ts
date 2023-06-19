import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { DishesService } from 'src/services/dishes.service';
import { setChefOfTheWeek, setChefOfTheWeekFailure, setChefOfTheWeekSuccess, setRestaurantDishes, setRestaurantDishesFailure, setRestaurantDishesSuccess, setSignatureDishes, setSignatureDishesFailure, setSignatureDishesSuccess } from './epicureActions';

@Injectable()
export class dishesEffects {
    constructor(private actions$: Actions, private dishesService: DishesService) { }
    loadDishes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setSignatureDishes),
            switchMap(() =>
                this.dishesService.setSignatureDish().pipe(
                    map((props) => setSignatureDishesSuccess({ props })),
                    catchError((err) => of(setSignatureDishesFailure({ err })))
                )
            )
        )
    );

    loadDishesByHeader$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setRestaurantDishes),
            switchMap(({ restId, mealTypeId }) =>
                this.dishesService.setDishesByHeader(restId, mealTypeId).pipe(
                    map((props) => setRestaurantDishesSuccess({ props })),
                    catchError((err) => of(setRestaurantDishesFailure({ err })))
                )
            )
        )
    );
}