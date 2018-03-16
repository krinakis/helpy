import { Component } from '@angular/core';
import {LoadingController,AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {PopoverController} from 'ionic-angular';
import {AllService} from '../../services/all.service';
import { Home } from '../home/home';
import { Tabcomponent } from "../tabcomponent/tabcomponent";
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  PopoverContentPage:any;
   rating: any;
   coment: any;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public popoverCtrl: PopoverController, public alertCtrl: AlertController, public allService: AllService) {
    this.rating='';
    this.coment = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }
  onModelChange($event)
  {
    console.log($event);
  }
  openPopover($event)
  {
     console.log($event);
 }
 feedback(){

  if (this.rating == "" || this.coment == "") {
    let alert = this.alertCtrl.create({
        title   : 'Opps...',
        subTitle: 'Please fill rating and Phone Coments',
        buttons : ['Try Again']
    });
    alert.present();
 }
 else{

          let loader = this.loadingCtrl.create({
            content : "Logging....",
            duration: 1000
          });
          loader.present();
          // console.log("here goes Data", this.rating);\
          var data={

            user_id:localStorage.getItem('id'),
                // "user_id":"2",
                sp_id:localStorage.getItem('sp_id'),
                service_id:"1",
                order_id:localStorage.getItem('order_id12'),
                rating_count:this.rating,
                comment:this.coment,
                method:"save_feedback"

          }
          this.allService.savefeedback(data).subscribe(res =>{
              console.log(res);
              if (res.status == 200) {
                let alert = this.alertCtrl.create({
                  title   : 'Success',
                  subTitle: 'feedback saved',
                  buttons : ['thank you']
              });
              alert.present();
                this.navCtrl.setRoot(Tabcomponent);
            } else {
                let alert = this.alertCtrl.create({
                    title   : 'Sorry...',
                    subTitle: 'This mobile number is taken',
                    buttons : ['Try Again']
                });
                alert.present();
            }
          });
 }

 
}
}
