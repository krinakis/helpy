import {ErrorHandler, NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {Camera} from '@ionic-native/camera';
import {Diagnostic} from '@ionic-native/diagnostic';
//import { DatePicker } from 'ionic2-date-picker'
//import { DatePicker } from '../components/ionic2-date-picker/date-picker.component';
import {Geolocation} from '@ionic-native/geolocation';
import {Geocoder, GoogleMaps} from '@ionic-native/google-maps';
import {Keyboard} from '@ionic-native/keyboard';
import {LocationAccuracy} from '@ionic-native/location-accuracy';

import {NativeGeocoder} from '@ionic-native/native-geocoder';
import {OneSignal} from '@ionic-native/onesignal';
import {SocialSharing} from '@ionic-native/social-sharing';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MaplocationPage} from '../pages/maplocation/maplocation';
import {MyApp} from './app.component';
import {Facebook} from '@ionic-native/facebook';
import {Tabcomponent} from '../pages/tabcomponent/tabcomponent';
import {Home} from "../pages/home/home";
import {Message} from "../pages/message/message";
import {Myproject} from "../pages/myproject/myproject";
import {Notification} from "../pages/notification/notification";
import {Profile} from "../pages/profile/profile";
import {Ionic2RatingModule} from 'ionic2-rating';
import {CallNumber} from '@ionic-native/call-number';
import { FeedbackPage } from "../pages/feedback/feedback";
import { FeedbackPageModule } from "../pages/feedback/feedback.module";
import { InAppBrowser } from '@ionic-native/in-app-browser';
@NgModule({
    declarations   : [
        MyApp,//DatePicker
        MaplocationPage,
        Tabcomponent,
        Home,
        Message,
        Myproject,
        FeedbackPage,
        Notification,
        Profile
    ],
    imports        : [
        BrowserModule,
        HttpModule,
        Ionic2RatingModule,
        // FeedbackPageModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap      : [IonicApp],
    entryComponents: [
        MyApp,//DatePicker
        MaplocationPage,
        Tabcomponent,
        Home,
        Message,
        Myproject,
        
        FeedbackPage,
        Notification,
        Profile
    ],
    providers      : [
        StatusBar,
        GoogleMaps,
        Keyboard,
        Diagnostic,
        Geocoder,
        NativeGeocoder,
        LocationAccuracy,
        SplashScreen,
        Camera,
        SocialSharing,
        Geolocation,
        OneSignal,
        Facebook,
        InAppBrowser,
        CallNumber,
        {
            provide : ErrorHandler,
            useClass: IonicErrorHandler
        }
    ]
})
export class AppModule {
}
