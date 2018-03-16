import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllService } from "../../services/all.service";
/**
 * Generated class for the ShowprocessingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showprocessing',
  templateUrl: 'showprocessing.html',
})
export class ShowprocessingPage {

  orderdata:any;
  show:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public allService: AllService) {

  }
  shipping_address;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowprocessingPage');
    this.get_searching_order();
    this.shipping_address = localStorage.getItem('ship_address');
  }

  get_searching_order(){
    var data ={
      method : 'get_current_order',
      user_id : localStorage.getItem('id')
    }
    this.allService.login(data).subscribe(res =>{
      console.log(res);
       this.orderdata =res.services;
       if(this.orderdata.length > 0){
        this.show = true;
       }else{
         this.show = false;
       }
    })
  }

  goBack(){
    this.navCtrl.pop();
}
}
