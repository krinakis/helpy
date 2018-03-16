import {Component, ViewChild} from '@angular/core';
import {Content, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
@Component({
    selector   : 'page-home',
    templateUrl: 'home.html',
})
export class Home {
    @ViewChild(Content) content: Content;
    scrollPosition: number = 0;
    rootCategories: any;
    banner:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public allService: AllService, private locationAccuracy: LocationAccuracy){
    }
    
    ionViewDidLoad(){

        this.locationAccuracy.canRequest().then((canRequest: boolean) =>{
            
            if (canRequest) {
                // the accuracy option will be ignored by iOS
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then((res) =>{
                    console.log('hghgh');
                }, (err) =>{
                console.log(err);
                
                });
            }
            
        });

        console.log('ionViewDidLoad Home');
        this.getrootcategories();
        this.get_slider();
    }
    get_slider(){
        var data = {
            method:"get_slider",
            service_page_id:"0" // for homepage or any category_id like 2 for helpy clean
        }
        this.allService.login(data).subscribe(res =>{
            console.log(res);
            if(res.status == 200){
                this.banner = res.banner;
            }
        });
    }
    getrootcategories(){
        console.log('ionViewDidLoad Service');
        
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        
        // this.allService.getAllServices().subscribe(res => {
        this.allService.getrootcategories().subscribe(res =>{
            
            this.rootCategories = res;
            
            console.log("root rootCategories are ---->>>", this.rootCategories);
            loading.dismiss(() =>{
            });
        });
    }
    
    location(){
        let modal = this.modalCtrl.create('Location');
        modal.present();
    }
    
    
    service(id){
        console.log('here goes selected id-->>', id);
        
        if (id == 0) {
            this.navCtrl.push('CleanPage');
        } else if (id == 1) {
            this.navCtrl.push('MassagePage');
        } else if (id == 2) {
            this.navCtrl.push('AutoPage');
        } else if (id == 3) {
            this.navCtrl.push('RunnerPage');
        } else if (id == 4) {
            this.navCtrl.push('BeautyPage');
        } else if (id == 5) {
            this.navCtrl.push('ShopPage');
        } else if (id == 6) {
            this.navCtrl.push('CarePage');
        } else if (id == 7) {
            this.navCtrl.push('TicketPage');
        } else {
            this.navCtrl.push('Service', {id: id});
        }
    }
    
    fitness(){
        this.navCtrl.push('Fitness');
    }
    
    recommended(){
        this.navCtrl.push('Recommended');
    }

    gonew(){
        // this.navCtrl.push('ShowprocessingPage');
        // cloudSky.iPay88.makePayment(
        //     {
        //         amount: 123, // int amount to charge in cents. 123 = 1.23
        //         name: "sagar",
        //         email: "rajneshkis13@gmail.com",
        //         phone: "2131312112",
        //         refNo: "12545",
        //         currency: "MYR",
        //         lang: "UTF-8",
        //         country: "MY", // iPay88 gateway country
        //         description: "description of the product",
        //         remark: "remarks for the transaction",
        //         paymentId: "123456",
        //         merchantKey: "9rEoec5LB",
        //         merchantCode: "M13248",
        //         backendPostUrl: "http://..." // The URL which iPay will call from their
        //             // servers upon successful payment.
        //     },
        //     function (resp) {
        //         // Success callback
        //         // resp = {
        //         //     transactionId: transId,
        //         //     referenceNo: refNo,
        //         //     amount: amount,
        //         //     remarks: remarks,
        //         //     authCode: auth,
        //         // }
        //     },
        //     function (err) {
        //         // Failure callback
        //         // err = "some error string" OR
        //         // err = {
        //         //     transactionId: transId,
        //         //     referenceNo: refNo,
        //         //     amount: amount,
        //         //     remarks: remarks,
        //         //     err: error message, // "canceled" if user canceled the payment.
        //         // }
        //     }
        // )
    }
    
    
}
