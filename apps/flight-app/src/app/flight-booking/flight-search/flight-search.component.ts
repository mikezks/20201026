import {Component, OnInit} from '@angular/core';
import {Flight, FlightService} from '@flight-workspace/flight-lib';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromFlightBooking from '../+state';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;
  flights$: Observable<Flight[]>;

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private flightService: FlightService,
    private store: Store<fromFlightBooking.FlightBookingAppState>) {
  }

  ngOnInit() {
    this.flights$ = this.store.pipe(
      select(state => state.flightBooking.flights)
    );
  }

  search(): void {
    if (!this.from || !this.to) return;

    /* this.flightService
      .load(this.from, this.to, this.urgent); */

    this.flightService.find(this.from, this.to)
      .subscribe(flights =>
        this.store.dispatch(
          fromFlightBooking.flightsLoaded({
            flights
          })
        )
      );
  }

  delay(): void {
    this.flightService.delay();
  }

}
