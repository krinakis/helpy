import {Component} from '@angular/core';
import {SocialSharing} from '@ionic-native/social-sharing';
import {App, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AllService} from '../../services/all.service';
import {Login} from "../login/login";

@Component({
    selector   : 'page-profile',
    templateUrl: 'profile.html',
})
export class Profile {
    email: string;
    name: string;
    password: any;
    mobile: any;
    data = {
        userId   : '',
        userimage: null,
    }
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public allService: AllService, private socialSharing: SocialSharing, private app: App, public toastCtrl: ToastController){
        //
        // this.email = localStorage.getItem("email");
        // this.mobile= localStorage.getItem("mobile");
        // this.name= localStorage.getItem("username");
        // this.password= localStorage.getItem("password");
        
        console.log("contructor called");
        
        // this.data.userimage = localStorage.getItem("userimage");
        
    }
    
    ionViewDidEnter(){
        
        //this.getUsersInfo();
        
        this.email = localStorage.getItem("email");
        this.mobile = localStorage.getItem("mobile");
        this.name = localStorage.getItem("username");
        this.password = localStorage.getItem("password");
        
        console.log("ionViewDidEnter");
        
        this.data.userimage = localStorage.getItem("userimage");
        
        
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad Profile');
    }
    
    editprofile(){
        // let modal = this.modalCtrl.create('Editprofile');
        // modal.present();
        this.navCtrl.push('Editprofile');
    }
    
    logout(){
        localStorage.clear();
        this.app.getRootNav().setRoot('Login');
        const toast = this.toastCtrl.create({
            message : 'Logout Successfully.',
            position: 'buttom',
            duration: 3000,
        });
    }
    
    about(){
        console.log("About Click");
        this.navCtrl.push('aboutHelpy');
    }
    
    helpCenter(){
        console.log("About Click");
        this.navCtrl.push('helpCenter');
    }
    
    settingsPage(){
        console.log("Setting Clicked");
        this.navCtrl.push('setting');
    }
    
    share(){
        console.log("Functio called");
        
        this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() =>{
            // Success!
            console.log('Successs');
        }).catch(() =>{
            // Error!
            console.log('Some Erroe happens')
        });
        
        // this.socialSharing.shareViaTwitter('Body', 'Subject','www.google.com').then(() => {
        //   // Success!
        // }).catch(() => {
        //   // Error!
        // });
        // this.socialSharing.shareViaFacebook('Body', 'Subject', 'www.facebook.com').then(() => {
        //   // Success!
        // }).catch(() => {
        //   // Error!
        // });
        // this.socialSharing.shareViaInstagram('Body', 'Subject').then(() => {
        //   // Success!
        // }).catch(() => {
        //   // Error!
        // });
        // this.socialSharing.shareViaWhatsApp('Body', 'Subject','www.google.com').then(() => {
        //   // Success!
        // }).catch(() => {
        //   // Error!
        // });
        
        // this.socialSharing.shareViaSMS('Body', '9889783309').then(() => {
        //   // Success!
        // }).catch(() => {
        //   // Error!
        // });
        
        
    }
    
    
    getUsersInfo(){
        this.data.userId = localStorage.getItem("userId");
        
        this.allService.getUsersInfo(this.data).subscribe(res =>{
            console.log(res);
            
        })
    }
    
    
}
