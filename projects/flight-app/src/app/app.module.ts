import { DashboardModule } from './dashboard/dashboard.module';
import { FlightCancellingModule } from './flight-booking/flight-cancelling/flight-cancelling.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FlightApiModule} from '@flight-workspace/flight-api';

import {AppComponent} from './app.component';
import {APP_EXTRA_OPTIONS, APP_ROUTES} from './app.routes';
import {BasketComponent} from './basket/basket.component';
import {FlightBookingModule} from './flight-booking/flight-booking.module';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SharedModule} from './shared/shared.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import { DashboardTileModule } from './dashboard-tile/dashboard-tile.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, CustomSerializer } from './+state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './+state/effects/app.effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthInterceptorService } from './shared/auth/auth-interceptor.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FlightBookingModule,

    BrowserAnimationsModule,
    FlightCancellingModule,
    DashboardModule,
    DashboardTileModule,
    
    FlightApiModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forRoot([...APP_ROUTES], {...APP_EXTRA_OPTIONS}),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ AppEffects ]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    OAuthModule.forRoot()
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BasketComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
