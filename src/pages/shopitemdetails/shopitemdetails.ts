import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';

@IonicPage() @Component({
    selector   : 'page-shop-item-details',
    templateUrl: 'shopitemdetails.html',
})
export class ShopItemDetailsPage {
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public allService: AllService){
        
    }
    
    ionViewDidLoad(){
    
    }
    
    openPage(){
        this.navCtrl.push('ShopItemAdd');
    }
    
    goBack(){
        this.navCtrl.pop();
    }
    
}
