import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';

import { AllService } from '../../services/all.service';


@IonicPage() @Component({
    selector   : 'page-forgetPwd',
    templateUrl: 'forgetPwd.html',
})
export class forgetPwd {
    tab: any;
    
    //  forgetPwdObj={
    //   method:'generateotpno'
    //  }
    
    data = {
        mobile      : '',
        isForgetPage: true,
        method      : 'generateotpno'
    }
    
    tempMobile: any;
    countryCode: any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams,public allService:AllService,public alertCtrl:AlertController){
        this.countryCode = "60";
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad forgetPwd');
        // this.tab = "active";
    }
    
    
    goBack(){
        this.navCtrl.pop();
    }
    
    gotoLogin(){
        this.navCtrl.pop();
    }
    
    
    gotoSignup(){
        
        this.navCtrl.push('Signup');
    }
    
    // sendOTPtoUser(){
    //     console.log('sendOTPtoUser callled', this.data);
    //     this.data.mobile = this.countryCode + this.tempMobile;
        
    //     this.navCtrl.push('Verification', {signupData: this.data})
        
    //     // this.allService.generateotpno(this.forgetPwdObj).subscribe(res => {
    //     //   console.log('generateotpno response --->>', res);
    //     //   if (res.status = 200)
    //     //     this.OTPserver = res.otp;
    //     // })
    // }
    
    sendOTPtoUser(){
        console.log('sendOTPtoUser callled');
        this.data.mobile = this.countryCode + this.tempMobile;
        this.allService.generateotpno(this.data).subscribe(res =>{
            console.log('generateotpno response --->>', res);
            if (res.status == 200) {
                let OTPserver = res.otp;
                this.navCtrl.push('Verification', {otp: OTPserver,signupData: this.data})
            }else{
                let alert = this.alertCtrl.create({
                    title   : 'Alert!',
                    subTitle: res.message,
                    buttons : ['OK']
                });
                alert.present();
            }
        })
    }
    
}
