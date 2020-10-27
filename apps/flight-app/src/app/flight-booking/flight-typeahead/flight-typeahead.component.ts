import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { share, tap } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.rxjsDemo();
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
