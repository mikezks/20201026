import { Flight } from '@flight-workspace/flight-lib';
import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[];
  passengerMapping: { [id: number]: number[] };
  activeUser: { id: number, name: string };
}

export const initialState: State = {
  flights: [],
  passengerMapping: {
    4: [3, 5]
  },
  activeUser: {
    id: 4,
    name: 'Michael'
  }
};

export interface FlightBookingAppState {
  flightBooking: State
}

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.flightsLoaded, (state, action) => {
    const flights = action.flights;
    return { ...state, flights };
  }),
  on(FlightBookingActions.flightUpdate, (state, action) => {
    const flights = state.flights.map(f => f.id === action.flight.id ? action.flight : f);
    return { ...state, flights };
  }),

);
