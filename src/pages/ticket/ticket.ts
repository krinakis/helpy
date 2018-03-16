import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';

/**
 * Generated class for the ShopPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage() @Component({
    selector   : 'page-ticket',
    templateUrl: 'ticket.html',
})
export class TicketPage {
    
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public allService: AllService){
    
    
    }
    
    ionViewDidLoad(){
        console.log('tkcket page is loaded');
    }
    
    
    goToHistory(){
        console.log('histroy click');
        this.navCtrl.push('Myproject');
    }
    
    
    goBack(){
        this.navCtrl.pop();
    }
    
    
}
