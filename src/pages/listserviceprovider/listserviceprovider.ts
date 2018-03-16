import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {AllService} from '../../services/all.service';
import {Observable} from 'rxjs/Rx';
import { Tabcomponent } from "../tabcomponent/tabcomponent";
import { Myproject } from "../myproject/myproject";
import { timer } from 'rxjs/observable/timer';
// import {Observable} from 'rxjs/Rx';
/**
 * Generated class for the ListserviceproviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listserviceprovider',
  templateUrl: 'listserviceprovider.html',
})
export class ListserviceproviderPage {
  totalPrice:any;
  orderdata:any;
  providers:any;
  order_id:any;
  radius:number;
  showornot:boolean;
  service_providerdata:any;
  dis:boolean;
  ticks =300;
  displaytime;
  sendstatus;
  prodata;
  timerId;
  timer;
  service_type_name;
  constructor(public navCtrl: NavController, public navParams: NavParams, public allService: AllService,public alertCtrl:AlertController) {
    this.totalPrice = navParams.get('totalPrice');
    this.orderdata = navParams.get('orderdata');
    this.order_id = navParams.get('order_id');
    this.providers = navParams.get('providers');
    this.radius =  navParams.get('radius');
    this.prodata = navParams.get('prodata');
    this.service_type_name = navParams.get('service_type_name');
    this.send();
    console.log(this.prodata);
    this.dis=true;

        this.timer = Observable.interval(1000).subscribe(t =>{
          this.tickerFunc();
        })
  }
  
  tickerFunc()
  {
    if(this.ticks < 0){
      this.delete_product();
      this.timer.unsubscribe();
    }  
    console.log(this);
    --this.ticks;
   
   if(!this.showornot){
     this.get_provider_id();
     this.displaytime = this.secondsTimeSpanToHMS(this.ticks);
   }
  
  }

  secondsTimeSpanToHMS(s) {
        var h = Math.floor(s/3600); //Get whole hours
        s -= h*3600;
        var m = Math.floor(s/60); //Get remaining minutes
        s -= m*60;
        return (m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
  }
  cencle_order(){
    this.ticks =0;
    // this.timer.unsubscribe();
    // clearTimeout(this.timerId);
  }
  delete_product(){
    var data ={
      method  :"delete_orders",
      id      : this.order_id
  }
  
  this.allService.login(data).subscribe(res =>{
        console.log(res);
          // let alert = this.alertCtrl.create({
          //     title   : 'success',
          //     subTitle: 'Order is cancelled',
          //     buttons : ['OK']
          // });
          // alert.present();
          
        let view = this.navCtrl.getActive().name;
        if(view =='ListserviceproviderPage'){
          this.navCtrl.setRoot(Tabcomponent);
        }
          this.timer.unsubscribe();
  });
  }
  gotonew(){
    this.navCtrl.setRoot(Tabcomponent);
  }

  send(){
    console.log('in payment');
    for (let i = 0; i < this.prodata.length; i++) {
      
            var arra = new Array();
            arra.push(this.prodata[i].player_id);
            var con ={
              en :"New service notification"
            }

            var data = {
              order_id        : this.order_id,
              sp_id           : this.prodata[i].id,
              km              : this.prodata[i].distance,
              address         : this.orderdata.shipping_address,
              price           : this.totalPrice,
              requested_date  : this.orderdata.requested_date,
              requested_time  : this.orderdata.requested_time,
              user_player_id : localStorage.getItem('app_id')
            }

            var realdata ={
                app_id: "9c73229f-f1ad-4085-9b1c-29f2a0bf673d",
                include_player_ids:arra,
                contents: con,
                data:data,
                small_icon:'ic_stat_onesignal_default',
                accent_color:'#FFDD30'
                // priority:10
            }

            this.allService.call_noti(realdata).subscribe(res =>{
              console.log(res);
            });
      console.log('in payment out');
    }
  }

 
  get_provider_id(){

    var data ={
      method : 'get_spid',
      order_id : this.order_id
    }
    this.allService.login(data).subscribe(res =>{
      console.log(res);
      let sp =res.services.sp_id;

      if(sp > 0){
        this.showornot=true;
        this.dis = false;
        // this.get_provider_details(sp);
        this.final_order(sp);
        this.ticks =0;
      }
    })
  }

  get_provider_details(sp_id){

    
      var data ={
          method : "get_about_details",
          sp_id   : sp_id
      }
      this.allService.login(data).subscribe(res =>{
        console.log(res);
        this.service_providerdata= res.services[0];
        // services
      });
  }

  final_order(sp_id){
    if(this.showornot){
      this.orderdata.sp_id  = sp_id;
          this.orderdata.method = 'save_orders';
          this.allService.login(this.orderdata).subscribe(res =>{
              console.log(res);
              if(res.status==200){
            //   let alert = this.alertCtrl.create({
            //     title   : 'success',
            //     subTitle: 'Order placed',
            //     buttons : ['Thank you']
            // });
            // alert.present();
            var data12 = {
              method:"send_email",
              order_id:res.order_id,
              username:localStorage.getItem('username'),
              useremail:localStorage.getItem('email'),
              mobile : localStorage.getItem('mobile')
            }
            this.allService.login(data12).subscribe(res =>{

            });

            this.navCtrl.setRoot(Myproject);
          }
          });
  }else{
    let alert = this.alertCtrl.create({
      title   : 'Fail',
      subTitle: 'Your Order is not yet accepted',
      buttons : ['Thank you']
  });
  alert.present();
  }
  }

  goBack(){
    this.navCtrl.pop();
}

}
