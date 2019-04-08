import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription, Subject, pipe, empty } from 'rxjs';
import { take, tap, share, takeUntil, debounceTime, delay, filter, map, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-api';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  timerSubscription: Subscription;
  destroy$ = new Subject<boolean>();

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;
  
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    // this.rxjsDemo();
    this.initTypeahead();
  }
  
  rxjsDemo(): void {
    this.timer$ =
      timer(0, 1000)
        .pipe(
          takeUntil(this.destroy$),
          take(5),
          tap(
            result => console.log('tap Operator', result)
          ),
          // share()
        );
    
    this.timerSubscription =
    this.timer$
    .subscribe(
        result => console.log('TS subscribe', result)
      );
      
    }

    initTypeahead(): void {
      const customFilter = (noChars: number) =>
        pipe(
          map((value: string) => {
            if (value.length > noChars) {
              return value;
            }
            return empty();
          })
        );

      this.control.valueChanges
        .pipe(
          debounceTime(300),
          // delay(1000),
          filter((value: string) => value.length > 2),
          // customFilter(2),
          tap(() => this.loading = true),
          switchMap(
            value => this.load(value)
/*               .pipe(
                map(flights => ({
                  flights, value
                }))
              ) */
          ),
          tap(() => this.loading = false)
        )
        .subscribe(
          console.log
        )
    }

    load(from: string):Observable<Flight[]>  {
      const url = "http://www.angular.at/api/flight";
  
      const params = new HttpParams()
                          .set('from', from);
  
      const headers = new HttpHeaders()
                          .set('Accept', 'application/json');
  
      return this.http.get<Flight[]>(url, {params, headers});
    };
    
    ngOnDestroy(): void {
      // this.timerSubscription.unsubscribe();
      // this.destroy$.next(true);
    }
  }
  