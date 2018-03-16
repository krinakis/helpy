
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';

@IonicPage() @Component({
    selector   : 'page-setting',
    templateUrl: 'setting.html',
})
export class setting {
    
    
    pushnoti: boolean;
    emailnoti: boolean;
    promotionalsettingnoti: boolean;
    promotionalemailnoti: boolean;

    stats:any;
    setstatus: any =
    {
      method:"setting_change",
      user_id: localStorage.getItem('id'),
      status:"",     
      to_type:""
    }
    getstatus:any=
    {
      method : "get_setting",
      user_id: localStorage.getItem('id'),
    }
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public allService: AllService)
    {
        
        // this.pushnoti = true;
        // this.promotionalemailnoti = true;
       
    }
    
    ionViewWillEnter(){
        console.log('ionViewDidLoad PaymentSuccess');

        this.getstat();
        
    }
    getstat()
    {
      this.allService.login(this.getstatus).subscribe(res =>
      {
        this.stats=res.setting[0];
        console.log(this.stats);
        if(this.stats.push_noti == "1")
        {
          this.pushnoti = true;
          console.log(this.pushnoti);
        }
        if(this.stats.email_noti == "1")
        {
          this.emailnoti = true;
        }
        if(this.stats.promotional_push_noti == "1")
        {
          this.promotionalsettingnoti = true;
        }
        if(this.stats.promotional_email == "1")
        {
          this.promotionalemailnoti = true;
        }
      })
    }
    
    // tab_swap(type) {
    //     this.tab = type;
    //    }
    
    goBack(){
        this.navCtrl.pop();
    }

    Change_pushnoti() 
    {
    this.setstatus.to_type = 'push_noti';  
    if(this.pushnoti == true)
    {
      
      this.setstatus.status = 1;
      this.allService.login(this.setstatus).subscribe(res =>
      {
      })
        console.log("Activate");
    }
    else
    {
      
      this.setstatus.status = 0;
      this.allService.login(this.setstatus).subscribe(res =>
      {
      })
    console.log("DActivate");
    }

  }

  Change_emailnoti() 
    {
        this.setstatus.to_type='email_noti';
    if(this.emailnoti == true)
    {
      
      this.setstatus.status = 1;
      this.allService.login(this.setstatus).subscribe(res =>
      {
      })
        console.log("Activate");
    }
    else
    {
     
      this.setstatus.status = 0;
      this.allService.login(this.setstatus).subscribe(res =>
      {
      })
    console.log("DActivate");
    }

  }


  Change_promtionalemail() 
    {
        this.setstatus.to_type='promotional_email';
    if(this.promotionalemailnoti == true)
    {
      
      this.setstatus.status = 1;
      this.allService.login(this.setstatus).subscribe(res =>
      {
      })
        console.log("Activate");
    }
    else
    {
    
      this.setstatus.status = 0;
      this.allService.login(this.setstatus).subscribe(res =>
      {
      })
    console.log("DActivate");
    }

  }

  
  Change_promotionalnoti() 
    {
        this.setstatus.to_type='promotional_push_noti';
    if(this.promotionalsettingnoti == true)
    {
      
      this.setstatus.status = 1;
      this.allService.login(this.setstatus).subscribe(res =>
      {
      })
        console.log("Activate");
    }
    else
    {
      
      this.setstatus.status = 0;
      this.allService.login(this.setstatus).subscribe(res =>
      {
      })
    console.log("DActivate");
    }

  }
    
}
