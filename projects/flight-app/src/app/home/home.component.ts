import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  expertMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) {
  }

  changed($event): void {
    console.debug('$event.detail ', $event.target.detail);

    this.expertMode = $event.detail
  }

  needsLogin: boolean;
  _userName: string = '';

  ngOnInit() {
    this.needsLogin = !!this.route.snapshot.params['needsLogin'];
  }

  get userName(): string {
    // return this._userName;
    return this.authService.username;
  }

  login(): void {
    // this._userName = 'Login will be implemented in another exercise!'
    this.authService.login();
  }

  logout(): void {
    // this._userName = '';
    this.authService.logout();
  }


}
