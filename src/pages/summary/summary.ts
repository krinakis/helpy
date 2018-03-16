import {Component} from '@angular/core';
import {Keyboard} from '@ionic-native/keyboard';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
import {AlertController, Events, IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import * as moment from 'moment';
import {MaplocationPage} from '../../pages/maplocation/maplocation';
import {ShopPage} from '../../pages/shop/shop';
import {AllService} from '../../services/all.service';
import { NativeGeocoder,  NativeGeocoderForwardResult  } from '@ionic-native/native-geocoder';
import { Geolocation } from "@ionic-native/geolocation";
@IonicPage() @Component({
    selector   : 'page-summary',
    templateUrl: 'summary.html',
})
export class Summary {
    
    cartItems = [];
    // cartItems = Array<{}>;
    totalPrice: any;
    overtime: boolean = false;
    numberOfItem: any;
    product_desc: any;
    quantity: any;
    // price:any;
    gender: any;
    person: any;
    orderComment: string;
    
    saveOrderObj = {
        method          : 'save_orders',
        user_id         : localStorage.getItem('id'),
        total_price     : 0,
        address_id      : 0,
        requested_date  : '',
        requested_time  : '',
        shipping_address: 0,
        payment_status  : 0,
        payment_option  : '',
        order_staus     : 1,
        cityname        :'',
        service_type    :'',
        gender          :'',
        runner_from     :'',
        runner_to       :'',
        products        : []
    }
    deliveryDate: any;
    deliveryTime: any;
    minDate: any;
    maxDate: any;
    addr: any = '';
    fromcomingservice: any = '1';
    city:any;
    gggbtn: any = 'ADD MORE SERVICES';
    formatedAddress: any;
    cleanerinto:any;
    service_type;

    latforp:number;
    longforp:number;
    categ:any;
    aorr:boolean;
    constructor(public navCtrl: NavController, private locationAccuracy: LocationAccuracy, public events: Events, public keyboard: Keyboard, public modalCtrl: ModalController, public navParams: NavParams, public allService: AllService, public alertCtrl: AlertController, public toastCtrl: ToastController,private nativeGeocoder: NativeGeocoder,private geolocation: Geolocation){
        this.getCurrentLocation();
        console.log("last page data--->>", navParams.get('cartItems'));
        this.fromcomingservice = this.navParams.get('fromcomingservice');
        if (this.fromcomingservice == '2') {
            this.gggbtn = 'ADD MORE PRODUCT';
        }

        // this.category_idforradius = "";
        this.gender = localStorage.getItem('selecetdGender');
        this.person = localStorage.getItem('noOfPerson');
        
        this.cartItems = (navParams.get('cartItems'));
        console.log(this.cartItems);
        
        this.product_desc = this.cartItems[0].product_desc;
        this.orderComment = (navParams.get('orderComment'));
        this.cleanerinto = navParams.get('radioselected');
        console.log(this.cleanerinto);
        console.log("Data revied on this page-- Summary Page", this.cartItems, this.fromcomingservice);
        this.saveOrderObj.service_type = this.cartItems[0].main_cat_id;
        this.saveOrderObj.gender =  this.gender;
        this.service_type = localStorage.getItem('service_type');

        if (this.service_type =='runner') {
            this.saveOrderObj.runner_from   =  this.cartItems[0].runner_from;
            this.saveOrderObj.runner_to     =  this.cartItems[0].runner_to;
        }
        //this.price = navParams.get('totalPrice');
        this.numberOfItem = this.cartItems.length;
        
        this.totalPrice = 0;
        var total = 0;
        this.quantity = 1;



        this.categ = this.cartItems[0].cat_id;
        console.log(this.categ);
        this.aorr = false;
        if (this.service_type == 'runner' || this.service_type == 'auto') {
            this.aorr = true;
        }

        // if(this.service_type !='runner'){
            this.cartItems.forEach(function (element){
                total = total + Number(element.product_price) * element.qty;
                console.log(total);
            });
        // }else{
        //     this.cartItems.forEach(function (element){
        //         if(element.worker== 0 ){
        //             total = total + (Number(element.product_price) * element.qty);
        //         }else{
        //             total = total + ((Number(element.product_price) * element.qty) + (element.worker * 10));
        //         }
        //     })
            
        // }
        let date = moment().format();
        this.deliveryDate = date;
        this.deliveryTime = date;
        if (this.fromcomingservice == 'auto') {
            if (this.isDoubleCharge()) {
                const toast = this.toastCtrl.create({
                    message : 'Total price will be 1.5 times higher chosen time is between 12AM to 6AM.',
                    position: 'buttom',
                    duration: 3000,
                });
                toast.present();
            }
        }
        
        this.totalPrice = total;
        //console.log('test: ', date)
        this.minDate = moment.utc().startOf('day').format('YYYY-MM-DD');
        //console.log(this.minDate);
        
        this.maxDate = moment.utc().add(1, 'y').format('YYYY-MM-DD');
        console.log(this.maxDate);
        this.events.subscribe('getaddress', () =>{
            this.addr = this.allService.getaddress();
        })

    }
    
    getCurrentLocation(){
        console.log("Here ");
        let alert=this.alertCtrl.create({
          title:"Notice",
          message:"Loading...",
          enableBackdropDismiss:false
        });
        // alert.present();
        var posOptions = {
          timeout: 10000, enableHighAccuracy: false
      };
        console.log('API called');
        this.geolocation.getCurrentPosition(posOptions).then((resp) => {
          alert.dismiss();
          // resp.coords.longitude
          this.latforp = resp.coords.latitude;
          this.longforp = resp.coords.longitude;
          this.getCurrentAddress(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
          console.log('Error getting location', error);
        });
      }

      getCurrentAddress(lat, long) {
        console.log('Get current address');
        let alert=this.alertCtrl.create({
          title:"Notice",
          message:"Loading...",
          enableBackdropDismiss:false
        });
        // alert.present();
        
        this.allService.getCurrentAddress(lat, long)
          .then(data => {
            // alert.dismiss();
            var addResponse = (JSON.parse(data['_body']).results[0]);
            if(addResponse != undefined){
              
              var addressComponents = JSON.parse(data['_body']).results[0].address_components;
              this.addr=JSON.parse(data['_body']).results[0].formatted_address;
              
            }
    
          }).catch((error)=>{
            alert.dismiss();
          });
      }

    ionViewDidLoad(){
        console.log('ionViewDidLoad Summary');
    }
    
    presentModal(){
        this.locationAccuracy.canRequest().then((canRequest: boolean) =>{
            
            if (canRequest) {
                // the accuracy option will be ignored by iOS
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then((res) =>{
                    console.log('hghgh');
                    this.keyboard.close()
                    this.navCtrl.push(MaplocationPage);
                }, (err) =>{
                
                });
            }
            
        });
    }
    
    decrease(item, index){
        if (item.qty == 1) {
            //console.log(this.cartItems);
            console.log("Removed Index is", index);
            this.cartItems.splice(index, 1);
            
            let total = 0;
            this.cartItems.forEach(function (element){
                total = total + Number(element.product_price) * element.qty;
            })
            this.totalPrice = total;
            //console.log(this.totalPrice);
            
        } else {
            item.qty--;
            
            let total = 0;
            this.cartItems.forEach(function (element){
                total = total + Number(element.product_price) * element.qty;
            })
            this.totalPrice = total;
            //console.log(this.totalPrice);
            
        }
    }
    
    incresse(item){
        item.qty++;
        console.log("incressed Quantity...", item);
        
        var total = 0;
        this.cartItems.forEach(function (element){
            
            total = total + Number(element.product_price) * element.qty;
        })
        this.totalPrice = total;
        console.log(this.totalPrice);
    }
    
    goBack(){
        this.navCtrl.pop();
    }
    
    address(){

        // let data12 = this.addr.split(',');
        // let i = data12.length -1;
        // let cp = data12[i-2];
        // let ccp = cp.split(' ');
        // console.log(ccp);
        // // remove space from string
        // // let str = ccp.replace(/\s/g, '');

        // if(ccp.length ==2){
        //     this.city= ccp[1];
        // }else if(ccp.length ==3){
        //     if(ccp[0]==''){
        //         this.city= ccp[2];
        //     }else{
        //         this.city= ccp[1] +''+ccp[2];
        //     }
        // }else{
        //     if(ccp[0]==''){
        //         this.city= ccp[2]+' '+ccp[3];
        //     }else{
        //         this.city= ccp[1] +''+ccp[2];
        //     }
        // }
        this.city = '';
        // let cp = data12[i-1];
        // let ccp = cp.split(' ');

        let today = moment(this.deliveryDate).isAfter();
        //console.log(today);
        let timeNow = new Date();
        //console.log(timeNow.getTime());
        let time60 = new Date();
        time60.setMinutes(timeNow.getMinutes() + 59);
        let delTime = new Date(this.deliveryTime);
        this.saveOrderObj.requested_date = this.deliveryDate;
        this.saveOrderObj.requested_time = this.deliveryTime;
        this.saveOrderObj.shipping_address = this.addr;
        this.saveOrderObj.cityname = this.city;
        //console.log(delTime.getTime());
        //console.log(time60.getTime());
        //console.log('Submitted value: ', '\n', timeNow, '\n', time60, '\n', delTime, '\n', time60.getTime(), '\n', delTime.getTime(), '\n', this.deliveryTime);
        //this.navCtrl.push('Address', { totalPrice: this.totalPrice, cartItems: this.cartItems });
        if (!today) {
            console.log(this.service_type);
            console.log(localStorage.getItem('runnertype'));
            
            if (this.service_type =='auto') {
                if (localStorage.getItem('autotype') == 'emergency') {
                    
                    this.navCtrl.push('Payment', {
                        totalPrice  : this.saveOrderObj.total_price,
                        saveOrderObj: this.saveOrderObj,
                        cat_id      : this.categ,
                        s_type      : this.saveOrderObj.service_type
                    });
                }else{
                        if (delTime.getTime() > time60.getTime()) {
                            this.saveOrderObj.total_price = this.priceCalc();
                            var temp = [];
                            this.cartItems.forEach(element =>{
                                temp[0] = element.prod_id;
                                temp[1] = element.qty;
                                temp[2] = element.product_price;
                                
                                this.saveOrderObj.products.push(temp);
                                temp = [];
                                //console.log(element);
                            });
                            console.log('my new Save OderObj on address page', this.saveOrderObj);
                            this.navCtrl.push('Payment', {
                                totalPrice  : this.saveOrderObj.total_price,
                                saveOrderObj: this.saveOrderObj,
                                cat_id      : this.categ,
                                s_type      : this.saveOrderObj.service_type
                            });
                        } else {
                            let alert = this.alertCtrl.create({
                                title   : 'Alert!',
                                subTitle: 'Please choose time later than 1 hour from now.',
                                buttons : ['OK']
                            });
                            alert.present();
                        }
                }

            }else if(this.service_type =='runner'){
                this.saveOrderObj.total_price = this.priceCalc();
                var temp = [];
                this.cartItems.forEach(element =>{
                    temp[0] = element.prod_id;
                    temp[1] = element.qty;
                    temp[2] = element.product_price;
                    
                    this.saveOrderObj.products.push(temp);
                    temp = [];
                    //console.log(element);
                });
                console.log('my new Save OderObj on address page', this.saveOrderObj);
                this.navCtrl.push('Payment', {
                    totalPrice  : this.saveOrderObj.total_price,
                    saveOrderObj: this.saveOrderObj,
                    cat_id      : this.categ,
                    s_type      : this.saveOrderObj.service_type
                });
            }else if(this.service_type =='mall'){
                this.navCtrl.push('Payment', {
                    totalPrice  : this.saveOrderObj.total_price,
                    saveOrderObj: this.saveOrderObj,
                    cat_id      : this.categ,
                    s_type      : this.saveOrderObj.service_type
                });
            }
            else{
            if (delTime.getTime() > time60.getTime()) {
                this.saveOrderObj.total_price = this.priceCalc();
                var temp = [];
                this.cartItems.forEach(element =>{
                    temp[0] = element.prod_id;
                    temp[1] = element.qty;
                    temp[2] = element.product_price;
                    
                    this.saveOrderObj.products.push(temp);
                    temp = [];
                    //console.log(element);
                });
                console.log('my new Save OderObj on address page', this.saveOrderObj);
                this.navCtrl.push('Payment', {
                    totalPrice  : this.saveOrderObj.total_price,
                    saveOrderObj: this.saveOrderObj,
                    cat_id      : this.categ,
                    s_type      : this.saveOrderObj.service_type
                });
            } else {
                let alert = this.alertCtrl.create({
                    title   : 'Alert!',
                    subTitle: 'Please choose time later than 1 hour from now.',
                    buttons : ['OK']
                });
                alert.present();
            }
        }
        } else {
            this.saveOrderObj.total_price = this.priceCalc();
            let temp = [];
            this.cartItems.forEach(element =>{
                temp[0] = element.prod_id;
                temp[1] = element.qty;
                temp[2] = element.product_price;
                
                this.saveOrderObj.products.push(temp);
                temp = [];
                //console.log(temp);
            });
            console.log('my new Save OderObj on address page', this.saveOrderObj);
            this.navCtrl.push('Payment', {
                totalPrice  : this.saveOrderObj.total_price,
                saveOrderObj: this.saveOrderObj,
                cat_id      : this.categ,
                s_type      : this.saveOrderObj.service_type
                // lat         : this.latforp,
                // long        : this.longforp
            });
        }
    }
    
    priceCalc(): any{
        let total = 0;
        let type = localStorage.getItem('service_type');
        let delTime = new Date(this.deliveryTime);
        console.log(delTime);

        if(type !="runner"){
            console.log(type);
            
        this.cartItems.forEach(function (element){
            
                    if (element.category_id == "52" || type == 'mall' || type == 'runner') {
                        if ((delTime.getHours() >= 0 && delTime.getHours() < 6)) {
                            total = total + ((Number(element.product_price) * element.qty) * 1.5);
                        }else{
                            total = total + Number(element.product_price) * element.qty;
                        }
                    } else {
                        total = total + Number(element.product_price) * element.qty;
                    }
        })
        }else{
            console.log(type);
            this.cartItems.forEach(function (element){
                if(element.worker== 0 ){
                    total = total + (Number(element.product_price) * element.qty);
                }else{
                    total = total + ((Number(element.product_price) * element.qty) + (element.worker * 10));
                }
            })
        }
        return total;
    }
    
    // placeOrder() {
    //   console.log(this.saveOrderObj);
    //   this.allService.save_orders(this.cartItems).subscribe(res => {
    //     console.log("here is the validate Email res", res);
    //   })
    // }
    
    addMoreService(){
        console.log("addMoreService");
        if(this.service_type=='clean'){
            this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3));
        }else{
        if (this.fromcomingservice == '2') {
            // this.navCtrl.setRoot('ShopPage');
            this.navCtrl.pop();
        } else {
            //this.navCtrl.setRoot('Service');
            this.navCtrl.pop();
        }
    }
    }
    
    onTimeChange(){
        if (this.fromcomingservice == 'auto') {
            if (this.isDoubleCharge()) {
                const toast = this.toastCtrl.create({
                    message : 'Total price will be 1.5 times higher chosen time is between 12AM to 6AM.',
                    position: 'buttom',
                    duration: 3000,
                });
                toast.present();
            }
        }
    }
    
    isDoubleCharge(): boolean{
        let delTime = new Date(this.deliveryTime);
        console.log('isDoubleCharge: ', this.deliveryTime, delTime, delTime.getHours());
        if ((delTime.getHours() >= 0 && delTime.getHours() < 6)) {
            return true;
        } else {
            return false;
        }
    }
}
