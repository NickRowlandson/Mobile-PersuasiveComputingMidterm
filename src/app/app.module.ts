import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

/**
 *
 * @app.module.ts
 * Date: Tuesday February 22nd 2017
 * Author: Nicholas Rowlandson (200167125)
 * Description: This is the app.module for Midterm
 *
*/

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBQQekHcX3pcdrOlNwZDRzIBG4K1X3TFZ0",
  authDomain: "midterm-a4e65.firebaseapp.com",
  databaseURL: "https://midterm-a4e65.firebaseio.com",
  storageBucket: "midterm-a4e65.appspot.com",
  messagingSenderId: "436115732076"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
