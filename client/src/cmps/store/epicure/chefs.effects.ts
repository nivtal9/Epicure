import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ChefsService } from 'src/services/chefs.service';
import { setChefOfTheWeek, setChefOfTheWeekFailure, setChefOfTheWeekSuccess } from './epicureActions';

@Injectable()
export class chefsEffects {
    constructor(private actions$: Actions, private chefService: ChefsService) { }
    loadChefs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setChefOfTheWeek),
            switchMap(() =>
                this.chefService.setChefOfTheWeek().pipe(
                    map((props) => setChefOfTheWeekSuccess({ props })),
                    catchError((err) => of(setChefOfTheWeekFailure({ err })))
                )
            )
        )
    );
}