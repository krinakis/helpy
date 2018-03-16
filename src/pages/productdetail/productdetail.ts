import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';


/**
 * Generated class for the ProductdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
})
export class ProductdetailPage {
      
  a:any;
  html:any;

  constructor(public navCtrl: NavController,private sanitizer: DomSanitizer, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.a = this.navParams.get('data');
    console.log('ionViewDidLoad ProductdetailPage');
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.a.product_desc);
  }

  goBack()
  {
    this.navCtrl.pop();
  }



}
