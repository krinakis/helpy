import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage() @Component({
    selector   : 'page-aboutHelpy',
    templateUrl: 'aboutHelpy.html',
})
export class aboutHelpy {
    tab: any;
    totalPrice: any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams){
        this.totalPrice = navParams.get('totalPrice');
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad PaymentSuccess');
        this.tab = "active";
    }
    
    
    // tab_swap(type) {
    //     this.tab = type;
    //    }
    
    goBack(){
        this.navCtrl.pop();
    }
    
}
