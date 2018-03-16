import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage() @Component({
    selector   : 'page-orderInfo',
    templateUrl: 'orderInfo.html',
})
export class orderInfo {
    cartItems: any;
    gender: any;
    person: any;
    price: any;
    pageToShow: any;
    therapist: any;
    duration: any;
    totalHours: number;
    orderComment: string;
    radio:string;
    constructor(public navCtrl: NavController, public navParams: NavParams){
        
        this.cartItems = navParams.get('cartItems');
        this.price = navParams.get('totalPrice');
        console.log("price one this page-->>", this.price);
        this.pageToShow = navParams.get('pageToShow');
        this.totalHours = navParams.get('totalHours');
        this.radio ='go';
        
        if (this.totalHours <= 2) {
            this.person = '1';
        } else if (this.totalHours > 2) {
            this.person = '2';
            
        } else if (this.totalHours > 4) {
            this.person = '3';
        }
        
        this.therapist = 'M';
        this.duration = '90';
        localStorage.setItem('noOfPerson', this.person);
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad orderInfo');
        
    }
    
    ionViewWillEnter(){
        this.gender = 'any';
    }
    goBack(){
        this.navCtrl.pop();
    }
    
    //  home(){
    //   this.navCtrl.setRoot('Home');
    //  }
    setRadio(str){
        this.radio = str;
    }
    
    summary(){
        console.log(this.radio);
        this.navCtrl.push('Summary', {
            cartItems   : this.cartItems,
            orderComment: this.orderComment,
            radioselected:this.radio
        });
    }
    
    noOfPerson(val){
        console.log('Selected Val is --->>', val);
        localStorage.setItem('noOfPerson', val);
    }
    
    selecetdGender(val){
        console.log('gneder Val is --->>', val);
        localStorage.setItem('selecetdGender', val);
    }
}
