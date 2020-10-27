import {Component} from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';
import { Observable } from 'rxjs';


@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {

  flightCount$: Observable<number>;

  constructor(private flightService: FlightService) {
    this.flightCount$ = flightService.flightCount$;
  }
}
