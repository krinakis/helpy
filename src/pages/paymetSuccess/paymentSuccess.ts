import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Tabcomponent} from "../tabcomponent/tabcomponent";

 

@IonicPage() @Component({
    selector   : 'page-paymentSuccess',
    templateUrl: 'paymentSuccess.html',
})
export class PaymentSuccess {
    tab: any;
    totalPrice: any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams){
        this.totalPrice = navParams.get('totalPrice');
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad PaymentSuccess');
        this.tab = "active";
    }
    
    
    tab_swap(type){
        this.tab = type;
    }
    
    goBack(){
        this.navCtrl.pop();
    }
    
    home(){
        this.navCtrl.pop();
    }
    
    Feedback(){
        this.navCtrl.push('FeedbackPage');
    }
    
}
