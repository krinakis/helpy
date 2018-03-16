import {Component} from '@angular/core';
import {OneSignal} from '@ionic-native/onesignal';
import {
    AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams, Platform, ToastController
} from 'ionic-angular';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import {Tabcomponent} from "../tabcomponent/tabcomponent";
import {AllService} from '../../services/all.service';


@IonicPage() @Component({
    selector   : 'page-login',
    templateUrl: 'login.html',
})
export class Login {
    data = {
        mobileNumber: '',
        matchdata   : '',
        password    : '',
        method      : 'login',
        app_id      : localStorage.getItem("app_id")
    }
    mobileNumber = [];
    splash = true;
    
    constructor(platform: Platform, public navCtrl: NavController, private _OneSignal: OneSignal, public navParams: NavParams, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public allService: AllService, public alertCtrl: AlertController, private fb: Facebook, public toastCtrl: ToastController){
        
        
        if (platform.is('cordova')) {
            // this._OneSignal.startInit('60675ca7-a25e-49ef-ad39-2466ba52b835', '508269750879');
            // this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.Notification);
            // this._OneSignal.setSubscription(true);
            // this._OneSignal.handleNotificationReceived().subscribe(() =>{
            //     // handle received here how you wish.
            // });
            // this._OneSignal.handleNotificationOpened().subscribe(() =>{
            //     // handle opened here how you wish.
            // });
            // this._OneSignal.endInit();
            
            this._OneSignal.getIds().then(ids =>{
                console.log(JSON.stringify(ids['userId']));   //PlayerId
                if (ids['userId'] != null) {
                    localStorage.setItem("app_id", ids['userId']);
                }
                console.log("Appp id saved in local storege from login page");
                console.log(console.log(JSON.stringify(ids['userId'])));
            });
            if (localStorage.getItem("fb_login") == "true") {
                let dataToSend: any = {
                    method      : 'fb_login',
                    app_id      : localStorage.getItem("app_id"),
                    "facebookId": localStorage.getItem("facebookId"),
                };
                this.fbAuthCheck(dataToSend);
            } else {
                let data = {
                    mobileNumber: localStorage.getItem("mobile"),
                    matchdata   : localStorage.getItem("email"),
                    password    : localStorage.getItem("password"),
                    method      : 'login',
                    app_id      : localStorage.getItem("app_id")
                }
                console.log('test: login: ', data)
                this.allService.login(data).subscribe(res =>{
                    console.log(res);
                    if (res.status == 0) {
                    } else {
                        localStorage.setItem("address", res.profile.address);
                        localStorage.setItem("city", res.profile.city);
                        localStorage.setItem("country", res.profile.country);
                        localStorage.setItem("date", res.profile.date);
                        localStorage.setItem("email", res.profile.email);
                        localStorage.setItem("gender", res.profile.gender);
                        localStorage.setItem("id", res.profile.id);
                        localStorage.setItem("mobile", res.profile.mobile);
                        localStorage.setItem("password", localStorage.getItem("password"));
                        localStorage.setItem("state", res.profile.state);
                        localStorage.setItem("status", res.profile.status);
                        localStorage.setItem("userimage", res.profile.userimage);
                        localStorage.setItem("username", res.profile.username);
                        localStorage.setItem("usertype", res.profile.usertype);
                        localStorage.setItem("fb_login", "false");
                        this.navCtrl.setRoot(Tabcomponent);
                    }
                });
            }
        }
        
    }
    
    gotoSignup(){
        console.log("let's Go to signup");
        this.navCtrl.push('Signup');
    }
    
    ionViewDidLoad(){
        setTimeout(() => this.splash = false, 4000);
    }
    
    login(){
        console.log(this.data.mobileNumber);
        console.log(this.data.matchdata);
        console.log(this.data.password);
        if (this.data.mobileNumber == "" && this.data.matchdata == "" && this.data.password) {
            let alert = this.alertCtrl.create({
                title   : 'Opps...',
                subTitle: 'Please fill the Inputs field',
                buttons : ['Try Again']
            });
            alert.present();
        } else {
            let loader = this.loadingCtrl.create({
                content : "Logging....",
                duration: 1000
            });
            
            loader.present();
            console.log("here goes Data", this.data);
            
            this.data.app_id = localStorage.getItem("app_id");
            console.log(this.data);
            this.allService.login(this.data).subscribe(res =>{
                console.log(res);
                if (res.status == 0) {
                    let alert = this.alertCtrl.create({
                        title   : 'Error',
                        subTitle: res.error,
                        buttons : ['Try Again']
                    });
                    alert.present();
                } else {
                    localStorage.setItem("address", res.profile.address);
                    localStorage.setItem("city", res.profile.city);
                    localStorage.setItem("country", res.profile.country);
                    localStorage.setItem("date", res.profile.date);
                    localStorage.setItem("email", res.profile.email);
                    localStorage.setItem("gender", res.profile.gender);
                    localStorage.setItem("id", res.profile.id);
                    localStorage.setItem("mobile", res.profile.mobile);
                    localStorage.setItem("password", this.data.password);
                    localStorage.setItem("state", res.profile.state);
                    localStorage.setItem("status", res.profile.status);
                    localStorage.setItem("userimage", res.profile.userimage);
                    localStorage.setItem("username", res.profile.username);
                    localStorage.setItem("usertype", res.profile.usertype);
                    localStorage.setItem("fb_login", "false");
                    this.navCtrl.setRoot(Tabcomponent);
                }
            });
        }
    }
    
    
    gotoForgetPwd(){
        this.navCtrl.push('forgetPwd');
    }
    
    goBack(){
        this.navCtrl.pop();
    }
    
    fbLogin(){
        this.fb.login([
            'public_profile',
            'email'
        ]).then((res: FacebookLoginResponse) =>{
            console.log('Logged into Facebook!', res);
            if (res.status === 'connected') {
                this.fb.api('/me?fields=id,name,first_name,last_name,picture,email', [
                    'public_profile',
                    'email'
                ]).then((response) =>{
                    console.log('Successful API: ', response);
                    this.checkFBExists(response);
                }).catch(e =>{
                    let alert = this.alertCtrl.create({
                        title   : 'Error !!',
                        subTitle: 'Facebook Authorization Failed, Pelase try again.',
                        buttons : ['OK']
                    });
                    alert.present();
                    console.log('Error logging into Facebook', e);
                });
            } else {
                let alert = this.alertCtrl.create({
                    title   : 'Error !!',
                    subTitle: 'Unable to connect to Facebook for Authentication, Pelase try again.',
                    buttons : ['OK']
                });
                alert.present();
                console.log('Failed Log in to Facebook!', res);
            }
        }).catch(e =>{
            let alert = this.alertCtrl.create({
                title   : 'Error !!',
                subTitle: 'Facebook Authorization Cancelled !!',
                buttons : ['OK']
            });
            alert.present();
            console.log('Error logging into Facebook', e)
        });
    }
    
    checkFBExists(response_data: any){
        let dataToSend: any = {
            method      : 'fb_login',
            app_id      : localStorage.getItem("app_id"),
            "facebookId": response_data.id,
        };
        this.allService.fb_login(dataToSend).subscribe(res =>{
            if (res.status == 0) {
                this.navCtrl.push('Signup', {
                    facebookId: response_data.id,
                    email     : response_data.email ? response_data.email : '',
                    fullname  : response_data.name
                });
                console.log('fre', res, response_data);
                const toast = this.toastCtrl.create({
                    message : 'Please set a password to signup using facebook.',
                    position: 'buttom',
                    duration: 3000,
                });
                toast.present();
            } else {
                localStorage.setItem("address", res.profile.address);
                localStorage.setItem("city", res.profile.city);
                localStorage.setItem("country", res.profile.country);
                localStorage.setItem("date", res.profile.date);
                localStorage.setItem("email", res.profile.email);
                localStorage.setItem("gender", res.profile.gender);
                localStorage.setItem("id", res.profile.id);
                localStorage.setItem("mobile", res.profile.mobile);
                //localStorage.setItem("password", res.profile.password);
                localStorage.setItem("state", res.profile.state);
                localStorage.setItem("status", res.profile.status);
                localStorage.setItem("userimage", res.profile.userimage);
                localStorage.setItem("username", res.profile.username);
                localStorage.setItem("facebookId", res.profile.facebookId);
                localStorage.setItem("usertype", res.profile.usertype);
                localStorage.setItem("fb_login", "true");
                
                this.navCtrl.setRoot(Tabcomponent);
            }
        });
    }
    
    fbAuthCheck(dataToSend: any){
        this.fb.getLoginStatus().then((res: FacebookLoginResponse) =>{
            console.log('Logged into Facebook!', res);
            if (res.status === 'connected') {
                this.allService.fb_login(dataToSend).subscribe(res =>{
                    if (res.status == 0) {
                        const toast = this.toastCtrl.create({
                            message : 'Facebook Auto login failed.',
                            position: 'buttom',
                            duration: 3000,
                        });
                        toast.present();
                    } else {
                        localStorage.setItem("address", res.profile.address);
                        localStorage.setItem("city", res.profile.city);
                        localStorage.setItem("country", res.profile.country);
                        localStorage.setItem("date", res.profile.date);
                        localStorage.setItem("email", res.profile.email);
                        localStorage.setItem("gender", res.profile.gender);
                        localStorage.setItem("id", res.profile.id);
                        localStorage.setItem("mobile", res.profile.mobile);
                        //localStorage.setItem("password", res.profile.password);
                        localStorage.setItem("state", res.profile.state);
                        localStorage.setItem("status", res.profile.status);
                        localStorage.setItem("userimage", res.profile.userimage);
                        localStorage.setItem("username", res.profile.username);
                        localStorage.setItem("facebookId", res.profile.facebookId);
                        localStorage.setItem("usertype", res.profile.usertype);
                        localStorage.setItem("fb_login", "true");
                        
                        this.navCtrl.setRoot(Tabcomponent);
                    }
                });
            } else {
                let alert = this.alertCtrl.create({
                    title   : 'Error !!',
                    subTitle: 'Unable to connect to Facebook for Authentication, Pelase try again.',
                    buttons : ['OK']
                });
                alert.present();
                console.log('Failed Log in to Facebook!', res);
            }
        }).catch(e =>{
            const toast = this.toastCtrl.create({
                message : 'Error Getting Facebook Permission, Pelase try again.',
                position: 'buttom',
                duration: 3000,
            });
            toast.present();
            console.log('Error logging into Facebook', e)
        });
    }
}
