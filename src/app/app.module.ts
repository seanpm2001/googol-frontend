import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ComponentsModule } from '../components/components.module';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { FeedPage } from '../pages/feed/feed';
import { ProfilePage } from '../pages/profile/profile';
import { MatchesPage } from '../pages/matches/matches';
import { EventsPage } from '../pages/events/events';
import { SearchPage } from '../pages/search/search';
import { SignInPage } from '../pages/signin/signin';  

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from './_services/auth';

@NgModule({
  declarations: [
    MyApp,
    FeedPage,
    ProfilePage,
    MatchesPage,
    EventsPage,
    SearchPage,
    SignInPage,
    HomePage
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedPage,
    ProfilePage,
    MatchesPage,
    EventsPage,
    SearchPage,
    SignInPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
