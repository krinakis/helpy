import {Component, ElementRef, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import {AllService} from '../../services/all.service';
import {Tabcomponent} from "../tabcomponent/tabcomponent";

//import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage() @Component({
    selector   : 'page-verification',
    templateUrl: 'verification.html',
})
export class Verification implements OnInit {
    OTPserver: any;
    OPTuser: any;
    mobileNumber: any;
    signupData: any;
    showReSendBtn: Boolean;
    
    // forgetPwdData:any;
    
    
    constructor(public navCtrl: NavController, public allService: AllService, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, private elementRef: ElementRef){
        
        
        this.signupData = navParams.get('signupData');
        // this.signupData.method = 'generateotpno';

        this.OTPserver = navParams.get('otp');
        this.showReSendBtn = false;
        // this.mobileNumber = this.signupData.mobile;  // localStorage.getItem("mobileNumber");
        // console.log('This is my Active Account data', this.signupData);
        
        
        //this.forgetPwdData = navParams.get('mobileNumber');
        //console.log("forgetPwdData data -------->>",this.forgetPwdData)
        
    }
    
    ngOnInit(){
        // var callDuration = this.elementRef.nativeElement.querySelector('#time');
        // this.startTimer(callDuration);
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad Verification');
        this.sendOTPtoUser();
    }
    
    dismiss(){
        this.viewCtrl.dismiss();
    }
    
    
    sendOTPtoUser(){
        console.log('sendOTPtoUser callled');
        this.showReSendBtn = false;
        var callDuration = this.elementRef.nativeElement.querySelector('#time');
        this.startTimer(callDuration);
        
        // this.allService.generateotpno(this.signupData).subscribe(res =>{
        //     console.log('generateotpno response --->>', res);
        //     if (res.status = 200) {
        //         this.OTPserver = res.otp;
        //     }
        // })
    }
    
    verify(){
        if (this.signupData.isForgetPage == true) {
            console.log("now Redirect too reset Page");
            if (this.OPTuser == this.OTPserver) {
                    this.navCtrl.push('resetPwd', {Mobidata: this.signupData});
            }else{
                let alert = this.alertCtrl.create({
                    title   : 'Sorry...',
                    subTitle: 'You might entered wrong OTP',
                    buttons : ['Try Again']
                });
                alert.present();
            }
        } else {
            console.log("OTPserver --", this.OTPserver);
            console.log("OTPUser --", this.OPTuser);
            if (this.OPTuser == this.OTPserver) {
                console.log("opt match");
                this.signupData.method = 'signup';
                this.allService.signup(this.signupData).subscribe(res =>{
                    console.log("Active account resposeeee---->>>>", res);
                    if (res.status == 200) {
                        localStorage.setItem('email', res.profile.email);
                        localStorage.setItem('id', res.profile.id);
                        localStorage.setItem('mobile', res.profile.mobile);
                        localStorage.setItem('username', res.profile.username);
                        localStorage.setItem("facebookId", res.profile.facebookId);
                        localStorage.setItem('usertype', res.profile.usertype);
                        if (res.profile.facebookId && res.profile.facebookId.length > 2) {
                            localStorage.setItem("fb_login", "true");
                        } else {
                            localStorage.setItem("fb_login", "false");
                        }
                        this.navCtrl.setRoot(Tabcomponent);
                    } else {
                        let alert = this.alertCtrl.create({
                            title   : 'Alert',
                            subTitle: res.message,
                            buttons : ['OK']
                        });
                        alert.present();
                    }
                });
            } else {
                let alert = this.alertCtrl.create({
                    title   : 'Sorry...',
                    subTitle: 'You might entered wrong OTP',
                    buttons : ['Try Again']
                });
                alert.present();
            }
        }
    }
    
    startTimer(display){
        var timer = 120;
        var minutes;
        var seconds;
        var s = Observable.interval(1000).subscribe(x =>{
            // console.log(x);
            
            minutes = Math.floor(timer / 60);
            seconds = Math.floor(timer % 60);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
            --timer;
            if (timer < 0) {
                this.showReSendBtn = true;
                s.unsubscribe();
            }
        })
    }
    
}
