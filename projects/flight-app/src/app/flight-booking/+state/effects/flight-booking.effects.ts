import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap, switchMap, map, catchError } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { FlightBookingActionTypes, FlightBookingActions, FlightsLoadAction, FlightsLoadedAction } from '../actions/flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-api';


@Injectable()
export class FlightBookingEffects {

 
  @Effect()
  loadFlights$ = this.actions$
    .pipe(
      ofType(FlightBookingActionTypes.FlightsLoadAction),
      switchMap((a: FlightsLoadAction) =>
        this.flightService
          .find(a.from, a.to, a.urgent)
          .pipe(
            catchError(() => of([]))
          )
      ),
      map(flights => new FlightsLoadedAction(flights))
    );


  constructor(
    private actions$: Actions<FlightBookingActions>,
    private flightService: FlightService) {}

}
