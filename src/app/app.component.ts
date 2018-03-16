import {Component, ViewChild} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Nav, Platform} from 'ionic-angular';
import {AllService} from '../services/all.service';
//Services
import { OneSignal } from '@ionic-native/onesignal';
import {LoginService} from '../services/login.service';
import { Tabcomponent } from "../pages/tabcomponent/tabcomponent";
//import { OneSignal } from '@ionic-native/onesignal';
import { FeedbackPage } from "../pages/feedback/feedback";
@Component({
    templateUrl: 'app.html',
    providers  : [
        LoginService,
        AllService
    ]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    
    rootPage: any = 'Intro';
    
    pages: Array<{ title: string, component: any }>;
    num:number;
    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private _OneSignal: OneSignal){
        this.initializeApp();
        // used for an example of ngFor and navigation

        this.num = 0
    }
    
    initializeApp(){
        this.platform.ready().then(() =>{
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.ini();
        });
    }
    // ini(){
    //     var notificationOpenedCallback = function(jsonData) {
    //         console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    //         console.log(jsonData);
    //       };
      
    //       window["plugins"].OneSignal
    //         .startInit("d80bf936-473d-4ed1-b302-c45929a807c2", "77989990980")
    //         .handleNotificationOpened(notificationOpenedCallback)
    //         .endInit();
        
    // }
    ini(){
        this._OneSignal.startInit("d80bf936-473d-4ed1-b302-c45929a807c2", "77989990980")
        this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.Notification);
        this._OneSignal.setSubscription(true);
        this._OneSignal.handleNotificationReceived().subscribe(() => {
            // handle received here how you wish.
            console.log('asdsa1');
            // this.rootPage = FeedbackPage;
            if (this.num > 0) {
                this.rootPage = Tabcomponent;
            }
        });
        this._OneSignal.handleNotificationOpened().subscribe((jsonData) => {
            localStorage.setItem('sp_id',jsonData.notification.payload.additionalData.sp_id);
            var order_id = jsonData.notification.payload.additionalData.order_id;
            localStorage.setItem('order_id12',order_id);
            
            try {
                if(order_id !== undefined){
                    this.rootPage = FeedbackPage;
                }
            } catch (error) {
                console.log('sd');
                
            }
            
            // this.nav.push(FeedbackPage);
            // }
        });
        this._OneSignal.endInit();
    }
    openPage(page){
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
