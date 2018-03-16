import {Component} from '@angular/core';
import {
    AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams, ViewController
} from 'ionic-angular';
import {AllService} from '../../services/all.service';

@IonicPage() @Component({
    selector   : 'page-selectaddress',
    templateUrl: 'selectaddress.html',
})
export class Selectaddress {
    
    
    get_addressObj = {
        method : 'get_address',
        user_id: localStorage.getItem('id')
    }
    selectedAdd: any;
    allAddress: any;
    
    update_default_addressObj = {
        method    : 'set_default_address',
        user_id   : localStorage.getItem('id'),
        address_id: ''
        
    }
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public allService: AllService, public loadingCtrl: LoadingController, private alertCtrl: AlertController){
    
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad Selectaddress');
        this.get_address();
    }
    
    
    dismiss(){
        this.viewCtrl.dismiss();
    }
    
    newaddress(){
        // let modal = this.modalCtrl.create('Newaddress');
        // modal.present();
        this.navCtrl.push('Newaddress');
    }
    
    
    goBack(){
        this.navCtrl.pop();
    }
    
    updateAddress(add){
        
        console.log('this is old selected value', add);
        const loading = this.loadingCtrl.create({
            content: 'Saving Address...'
        });
        
        this.update_default_addressObj.address_id = add.id;
        this.allService.set_default_address(this.update_default_addressObj).subscribe(res =>{
            console.log('new updated address isss ---', res);
            
            loading.dismiss(() =>{
                console.log('Dismissed loading');
            });
            
            if (res.status == 200) {
                this.navCtrl.pop();
            } else {
                let alert = this.alertCtrl.create({
                    title   : 'Error..',
                    subTitle: 'Something went Wrong',
                    buttons : ['Dismiss']
                });
                alert.present();
            }
        })
    }
    
    
    get_address(){
        console.log(this.get_addressObj);
        this.allService.get_default_address(this.get_addressObj).subscribe(res =>{
            console.log("here goes get_address responce", res);
            
            this.allAddress = res;
            
        })
    }
    
}
