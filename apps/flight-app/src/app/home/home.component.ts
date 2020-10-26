import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  expertMode = false;
  needsLogin$: Observable<boolean>;
  _userName = '';

  get userName(): string {
    return this._userName;
  }

  constructor(private route: ActivatedRoute) {}

  changed($event): void {
    console.debug('$event.detail ', $event.target.detail);

    this.expertMode = $event.detail;
  }

  ngOnInit() {
    this.needsLogin$ = this.route.params.pipe(
      map(params => !!params['needsLogin'])
    );
  }

  login(): void {
    this._userName = 'Login will be implemented in another exercise!';
  }

  logout(): void {
    this._userName = '';
  }
}
