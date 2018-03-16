import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';


@IonicPage() @Component({
    selector   : 'page-care',
    templateUrl: 'care.html',
})
export class CarePage {
    
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public allService: AllService){
    
    
    }
    
    ionViewDidLoad(){
        console.log('care page is loaded');
    }
    
    
    goToHistory(){
        console.log('histroy click');
        this.navCtrl.push('Myproject');
    }
    
    
    goBack(){
        this.navCtrl.pop();
    }
    
    
}
