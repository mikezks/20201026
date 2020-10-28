import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);

export const selectActiveUser = createSelector(
  // Selectors
  selectFlightBookingState,
  // Projector
  (state) => state.activeUser
);

export const selectFlights = createSelector(
  // Selectors
  selectFlightBookingState,
  // Projector
  (state) => state.flights
);

export const selectPassengerMapping = createSelector(
  // Selectors
  selectFlightBookingState,
  // Projector
  (state) => state.passengerMapping
);

export const selectFlightsByActiveUser = createSelector(
  // Selectors
  selectActiveUser,
  selectFlights,
  selectPassengerMapping,
  // Projector
  (user, flights, mapping) =>
    flights.filter(f => mapping[user.id][f.id])
);
