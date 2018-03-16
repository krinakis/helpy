import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage() @Component({
    selector   : 'page-location',
    templateUrl: 'location.html',
})
export class Location {
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController){
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad Location');
    }
    
    dismiss(){
        this.viewCtrl.dismiss();
    }
    
    
}
