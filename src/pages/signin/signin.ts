import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LoginService} from '../../services/login.service';

@IonicPage() @Component({
    selector   : 'page-signin',
    templateUrl: 'signin.html'
})
export class Signin {
    selectedItem: any;
    icons: string[];
    data = {
        mobileNumber: '',
        email       : ''
    }
    tempMobile: any;
    items: Array<{ title: string, note: string, icon: string }>;
    
    countryCode: any;
    
    //mobileNumber =[];
    
    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public loginService: LoginService, public alertCtrl: AlertController){
        this.countryCode = "60";
        
        
    }
    
    //   signup() {
    // this.navCtrl.push('Signup');
    // }
    
    signup(){
        
        if (this.data.email == "" && this.tempMobile == "") {
            let alert = this.alertCtrl.create({
                title   : 'Opps...',
                subTitle: 'Please Enter Valid Email OR Phone Number',
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
            
            this.data.mobileNumber = this.countryCode + this.tempMobile;
            console.log("After Add both ", this.data.mobileNumber);
            
            this.loginService.checkUserExist(this.data).subscribe(res =>{
                
                console.log(res);
                if (res == true) {
                    
                    this.navCtrl.push('Login', {
                        email       : this.data.email,
                        mobileNumber: this.data.mobileNumber
                    });
                    
                    // this.nav.setRoot(HomePage, { loginRes: res });
                    //this.nav.push(HomePage, { loginRes: res });
                } else if (res == false) {
                    
                    this.navCtrl.push('Signup', {
                        email       : this.data.email,
                        mobileNumber: this.tempMobile
                    });
                    
                    // let alert = this.alertCtrl.create({
                    //   title: 'Opps...',
                    //   subTitle: 'You might entered wrong username or password',
                    //   buttons: ['Try Again']
                    // });
                    // alert.present();
                }
            });
        }
    }
}
