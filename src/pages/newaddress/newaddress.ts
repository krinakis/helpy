import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AllService} from '../../services/all.service';

@IonicPage() @Component({
    selector   : 'page-newaddress',
    templateUrl: 'newaddress.html',
})
export class Newaddress {
    
    Address: any;
    myForm: FormGroup;
    
    update_addressObj = {
        method : 'update_address',
        user_id: localStorage.getItem('id'),
        address: ''
    }
    
    
    constructor(public navCtrl: NavController, public navParams: NavParams, private builder: FormBuilder, public viewCtrl: ViewController, public loadingCtrl: LoadingController, public allService: AllService){
        
        this.myForm = builder.group({
            'Building': [
                '',
                [Validators.required]
            ],
            'Street'  : [
                '',
                Validators.required
            ],
            'City'    : [''],
            'State'   : [''],
            'ZipCode' : [''],
        })
        
        // this.Address = navParams.get('Address');
        // console.log("recived Adress on this page iss---", this.Address);
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad Newaddress');
    }
    
    
    saveAddress(formValues){
        console.log(formValues);
        
        console.log('JSON.stringify', JSON.stringify(formValues));
        
        //console.log(formValues.Building +'|'+ formValues.Street+'|'+formValues.City +'|'+ formValues.State +'|'+ formValues.ZipCode )
        
        this.update_addressObj.address = (JSON.stringify(formValues));
        
        const loading = this.loadingCtrl.create({
            content: 'Saving Address...'
        });
        loading.present();
        
        console.log('here what m sending data', this.update_addressObj)
        
        this.allService.update_address(this.update_addressObj).subscribe(res =>{
            
            loading.dismiss(() =>{
                console.log('Dismissed loading');
            });
            
            console.log(res);
            if (res.status == 200) {
                this.navCtrl.pop();
            }
            
            // localStorage.setItem("Building", formValues.Building);
            // localStorage.setItem("Street", formValues.Street);
            // localStorage.setItem("City", formValues.City);
            // localStorage.setItem("State", formValues.State);
            // localStorage.setItem("ZipCode", formValues.OTP);
            
            //        this.navCtrl.pop();
            
            //this.navCtrl.push('Login');
            //this.nav.setRoot(HomePage, { loginRes: res });
            //this.nav.push(HomePage, { loginRes: res });
            
        });
        
        
    }
    
    dismiss(){
        this.viewCtrl.dismiss();
    }
    
}
