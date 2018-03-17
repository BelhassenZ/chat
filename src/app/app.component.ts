import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCGX1E244MSZ5rBzsNSZH3GOCPWKOA78ew",
  authDomain: "chat-3d025.firebaseapp.com",
  databaseURL: "https://chat-3d025.firebaseio.com",
  projectId: "chat-3d025",
  storageBucket: "chat-3d025.appspot.com",
  messagingSenderId: "700308797648"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

