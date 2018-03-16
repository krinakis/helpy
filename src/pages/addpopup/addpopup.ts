import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage() @Component({
    selector   : 'page-addpopup',
    templateUrl: 'addpopup.html',
})
export class Addpopup {
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController){
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad Addpopup');
    }
    
    dismiss(){
        this.viewCtrl.dismiss();
    }
    
}
