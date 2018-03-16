import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
import {Chat} from "../chat/chat";
import { AllService } from "../../services/all.service";
import { Myproject } from "../myproject/myproject";
@IonicPage() @Component({
    selector   : 'page-orderDetailsHistroy',
    templateUrl: 'orderDetailsHistroy.html',
})
export class orderDetailsHistroy {
    order: any = {
        id              : '',
        order_status    : '',
        order_date      : '',
        shipping_address: '',
        payment_option  : '',
        products        : [{}],
    };
    rate: any;
    products: any;
    statusText: string = '';
    gender:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public alertCtrl: AlertController, private callNumber: CallNumber, public allService: AllService){
        this.order = navParams.get('order');
        localStorage.setItem("toUserId",this.order.sp_id);
        console.log('orderDetailsHistroy: ', this.order);
        if (this.order.order_status == 2) {
            this.statusText = 'In Progress';
        } else if (this.order.order_status == 3) {
            this.statusText = 'Completed';
        } else if (this.order.order_status == 0) {
            this.statusText = 'Cancelled';
        }else{
            this.statusText = 'Pending';
        }


        if (this.order.gender =='M') {
            this.gender = 'Male';
        }else if (this.order.gender =='F') {
            this.gender = 'Female';
        } else {
            this.gender = 'Any';
        }
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad orderDetailsHistroy');
    }
    
    
    presentPopover(){
        let popover = this.popoverCtrl.create('Wizardpopover');
        popover.present();
    }
    
    goBack(){
        this.navCtrl.pop();
    }
    
    message(){
        this.navCtrl.push('Chat');
    }
    
    callNumer(val){
        console.log(val);
        
        this.callNumber.callNumber(val, true).then(() => console.log('Launched dialer!')).catch(() => console.log('Error launching dialer'));
    }
    track(){
        this.navCtrl.push('TrackorderPage',{'order_id':this.order});
    }
    cancelbooking(id){
        
        let alert = this.alertCtrl.create({
            title: 'Confirm cencel',
            message: 'Do you want cencel this order ?',
            buttons: [
              {
                text: 'No',
                role: 'No',
                handler: () => {
                  console.log('No clicked');
                }
              },
              {
                text: 'Yes',
                handler: () => {
                  console.log('Yes clicked');
                    var data ={
                        method : 'cancel_orders_tmp',
                        id : id
                    }
                    this.allService.cencel_orders(data).subscribe(res =>{
                        console.log(res);
                        this.navCtrl.setRoot(Myproject);
                    })
                  alert = this.alertCtrl.create({
                    title   : 'Alert',
                    subTitle: 'Your Order with order '+ id +' 29659 has been cancelled',
                    buttons : ['Dismiss']
                });
                alert.present();
                
                }
              }
            ]
          });
          alert.present();
    }
    
}
