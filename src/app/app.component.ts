import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Deeplinks } from '@ionic-native/deeplinks/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  //rootPage: any = 'Index'

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nav: NavController,
    protected deeplinks: Deeplinks
  ) {
    this.initializeApp();
  }

  initializeApp() {
    console.log("**** initializeApp Function INI");

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      console.log("**** initializeApp platform ready");

      this.deeplinks.route({
        'emrtd/:param': '/emrtd/:param'
      }).subscribe((match) => {
        console.log('Successfully matched route: ', match);
        console.log('Successfully matched route: '+match.$route);
        console.log('Successfully matched args: '+match.$args);
        console.log('Successfully matched link: '+match.$link);
        
        this.nav.navigateForward(match.$link.path);
        
      },
      (nomatch) => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      }); 
      
    });
  } // initializeApp

}
