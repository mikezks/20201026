import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { Observable, of, Subscription, timer } from 'rxjs';
import { catchError, debounceTime, delay, distinctUntilChanged, filter, share, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  subscription: Subscription;
  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.rxjsDemo();

    this.flights$ =
      this.control.valueChanges.pipe(
          filter(from => from.length > 2),
          debounceTime(300),
          distinctUntilChanged(),
          tap(_ => this.loading = true),
          switchMap(from => this.load(from).pipe(
            catchError(_ => of([]))
          )),
          // delay(1000),
          tap(_ => this.loading = false)
        );
  }

  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

  rxjsDemo(): void {

    this.timer$ = timer(0, 2000).pipe(
      tap(value => console.log('pipe processing', value)),
      // share()
    );

    /* this.subscription = this.timer$
      .subscribe(console.log); */

  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
}
