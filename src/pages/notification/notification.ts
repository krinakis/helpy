
import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {AllService} from '../../services/all.service';

@Component({
    selector   : 'page-notification',
    templateUrl: 'notification.html',
})
export class Notification {
    notification=[];

    a:any;
    date:any;
    time:any;
    date1:any;
    date2:any;
    days:any;
    timedata:any;
    image:any;
    url:any;
    imageprofile:any;
    notificationnotfound:boolean;
    getnotification: any =
    {
      method:"get_notifications",
      user_id: localStorage.getItem('id')
    }
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public allService: AllService)
    {
        this.url= 'http://www.huallow.com/helpy/';
        this.notificationnotfound = false;
    }
    ionViewWillEnter(){
        console.log(this.url);
        console.log('ionViewDidLoad Location');

        this.allService.get_orders(this.getnotification).subscribe(res =>{
            this.notification=res.notification;
            console.log(this.notification);
            if(this.notification.length == 0)
            {
                this.notificationnotfound = true;
            }
            
            var date1 = new Date();
            console.log(date1);
            for (let i = 0; i < this.notification.length; i++) 
                
            {
                var date2 = new Date(this.notification[i].added_date);
                console.log(date2);

                
                this.imageprofile = this.url + this.notification[i].userimage;
                console.log(this.imageprofile);

                // this.notification[i].time = this.time;
			  
                // if (date1.getHours() > 12 ) 
                // {
			  	//     date1.setHours(date1.getHours() - 12);
                // }
                
                this.days = this.calcDiff(date1,date2);
			console.log(this.days);
			if (this.days == 0 ) {
                this.notification[i].cdate = this.timedata[0]+":"+this.timedata[1];
                console.log(this.notification);
			}else if(this.days == 1){
                this.notification[i].cdate = 'yesterday';
                console.log(this.notification);
			}else{
                this.notification[i].cdate = this.days+'Days Ago';
                console.log(this.notification);
            }
            
            }
        })

    }
    
    dismiss(){
        this.viewCtrl.dismiss();
    }
    
    calcDiff(firstDate, secondDate){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds    
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        return diffDays;
    }
}
