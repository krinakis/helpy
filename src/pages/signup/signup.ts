import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
//import { LoginService } from '../../services/login.service';
import {AllService} from '../../services/all.service';

@IonicPage() @Component({
    selector   : 'page-signup',
    templateUrl: 'signup.html',
})
export class Signup {
    data = {
        mobile    : '',
        email     : '',
        password  : '',
        fullname  : '',
        facebookId: '',
        usertype  : '1',
        method    : 'signup'
    }
    
    validateMobile = {
        method: 'validateuser',
        mobile: ''
    }
    validateEmail = {
        method: 'validateuser',
        email : ''
    }
    isEmailValid: boolean;
    isPhoneValid: boolean;
    
    tempMobile: any;
    countryCode: any;
    
    //mobileNumber =[];
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public allService: AllService, public alertCtrl: AlertController){
        this.countryCode = "60";
        
        this.isEmailValid = false;
        this.isPhoneValid = false;
     
        this.data.email = navParams.get('email');
        this.data.fullname = navParams.get('fullname');
        this.data.facebookId = navParams.get('facebookId') ? navParams.get('facebookId') : '';
        console.log('signup: ', navParams.get('email'))
    }
    
    ionViewDidLoad(){
    }
    
    // verification() {
    //   let modal = this.modalCtrl.create('Verification');
    //   modal.present();
    // }
    
    goBack(){
        this.navCtrl.pop();
    }
    
    checkMobile(){
        this.data.mobile = this.countryCode + this.tempMobile;
        this.validateMobile.mobile = this.data.mobile;
        
        if (this.validateMobile.mobile != '') {
            console.log("Check Mobile number called", this.validateMobile);
            this.allService.validateuser(this.validateMobile).subscribe(res =>{
                console.log("here is the validate mobile res", res);
                if (res.status == 200) {
                    this.isPhoneValid = true;
                    
                } else {
                    let alert = this.alertCtrl.create({
                        title   : 'Sorry...',
                        subTitle: 'This mobile number is taken',
                        buttons : ['Try Again']
                    });
                    alert.present();
                }
                
            })
        }else{
            this.isPhoneValid = false;
        }
    }
    
    checkEmail(){
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
        
        this.validateEmail.email = this.data.email;
        console.log("Check Mobile number called", this.validateEmail);
        
        if (pattern.test(this.data.email)) {
            this.allService.validateuser(this.validateEmail).subscribe(res =>{
                console.log("here is the validate Email res", res);
                
                if (res.status == 200) {
                    
                    this.isEmailValid = true;
                }
                
                else {
                    let alert = this.alertCtrl.create({
                        title   : 'Sorry...',
                        subTitle: 'This email is taken',
                        buttons : ['Try Again']
                    });
                    alert.present();
                }
                
            })
        }else{
             this.isEmailValid = false;
        }
    }
    
    signup(){
        let loader = this.loadingCtrl.create({
            content : "Logging....",
            duration: 1000
        });
        
        loader.present();
        console.log("here goes Data", this.data);
        
        // this.data.mobile = this.countryCode+this.tempMobile;
        //console.log("After Add both ", this.data.mobile);
        console.log(this.isEmailValid);
        console.log(this.isPhoneValid);
        if (this.isEmailValid == true && this.isPhoneValid == true && this.data.password.length >= 6 && this.data.fullname !='') {
            // this.allService.signup(this.data).subscribe(res => {
            //   console.log(res);
            //   if (res != null) {
            //     localStorage.setItem("OTP", res.otp);
            //     this.navCtrl.push('Verification', { signupData: this.data });
            //   }
            // });
            this.data.email = this.data.email.toLowerCase();
            this.navCtrl.push('Verification', {signupData: this.data});
        } else if (this.data.password.length < 6 && this.isEmailValid == true && this.isPhoneValid == true) {
            let alert = this.alertCtrl.create({
                title   : 'Alert!!',
                subTitle: 'Password must be atleast 6 characters.',
                buttons : ['OK']
            });
            alert.present();
        }else{
            let alert = this.alertCtrl.create({
                title   : 'Alert!!',
                subTitle: 'Please filled valid data.',
                buttons : ['OK']
            });
            alert.present();
        }
    }
    
    gotoLogin(){
        this.navCtrl.push('Login');
    }
    
}
