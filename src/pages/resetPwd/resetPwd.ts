import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';


@IonicPage() @Component({
    selector   : 'page-resetPwd',
    templateUrl: 'resetPwd.html',
})
export class resetPwd {
    
    
    data = {
        mobile   : '',
        method   : 'forgotpassword',
        passwod1 : '',
        passwod2 : '' 
    }
  
   
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public allService: AllService){
        
      
        this.data = navParams.get('Mobidata');
        console.log("data recieved on this page--->>>", this.data);
        
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad forgetPwd');
        
    }
    
    reset(){
        console.log('Reset pwd is clicked');
        if (this.data.passwod1 == this.data.passwod2 && this.data.passwod1.length >= 6 && this.data.passwod2.length >= 6) {
            this.data.method = 'forgotpassword';
            this.allService.forgotpassword(this.data).subscribe(res =>{
                console.log('generateotpno response --->>', res);
                if (res.status = 200) {
                    let alert = this.alertCtrl.create({
                        title   : 'Success',
                        subTitle: 'Your Passwords has been changed',
                        buttons : ['Login Now']
                    });
                    alert.present();
                    
                    this.navCtrl.push('Login');
                }
                
            })
        } else if (this.data.passwod1.length < 6 || this.data.passwod2.length < 6) {
            let alert = this.alertCtrl.create({
                title   : 'Alert!!',
                subTitle: 'Password must be atleast 6 characters.',
                buttons : ['OK']
            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title   : 'Sorry...',
                subTitle: 'Your Passwords are not matching',
                buttons : ['Try Again']
            });
            alert.present();
        }
    }
    
    
    goBack(){
        this.navCtrl.pop();
    }
    
    // gotoLogin() {
    //   this.navCtrl.pop();
    // }
    
    
    gotoSignup(){
        
        this.navCtrl.push('Signup');
    }
    
    // sendOTPtoUser() {
    //   console.log('sendOTPtoUser callled', this.data);
    //   this.data.mobile = this.countryCode + this.tempMobile;
    
    //   this.navCtrl.push('Verification', { signupData: this.data })
    
    //   // this.allService.generateotpno(this.forgetPwdObj).subscribe(res => {
    //   //   console.log('generateotpno response --->>', res);
    //   //   if (res.status = 200)
    //   //     this.OTPserver = res.otp;
    //   // })
    // }
    
    
}
