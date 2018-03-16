import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';
import { NativeGeocoder,  NativeGeocoderForwardResult  } from '@ionic-native/native-geocoder';
import { InAppBrowserEvent,InAppBrowser } from "@ionic-native/in-app-browser";
@IonicPage() @Component({
    selector   : 'page-payment',
    templateUrl: 'payment.html',
})
export class Payment {
    tab: any;
    totalPrice: any;
    paymentMode: any = '';
    cartItems: any;
    code: any;
    paymentbtn: any = 'Paynow';
    saveOrderObj = {
        method          : 'save_orders_tmp',
        user_id         : localStorage.getItem('id'),
        total_price     : 0,
        address_id      : '',
        shipping_address: '',
        requested_date  : '',
        requested_time  : '',
        payment_status  : 0,
        payment_option  : '',
        order_status    : 1,
        cityname        :'',
        products        : []
    }
    array_p=[];
    len:any;
    
    providers = [
        {id      :'',address :'',lat     :'',long    :'',distance :'',player_id:''},
        {id      :'',address :'',lat     :'',long    :'',distance :'',player_id:''},
        {id      :'',address :'',lat     :'',long    :'',distance :'',player_id:''},
        {id      :'',address :'',lat     :'',long    :'',distance :'',player_id:''},
        {id      :'',address :'',lat     :'',long    :'',distance :'',player_id:''},
        {id      :'',address :'',lat     :'',long    :'',distance :'',player_id:''}
]
    

    termsncond: any;
    reallat:any;
    reallong:any;
    servicepdata:any;
    //saveOrderObj:any;
    sendstatus:boolean;
    service_type;
    show_service_type:boolean;
    clat;
    clong;
    cat_id;
    s_type;
    service_type_name;
    refno;
    constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public allService: AllService, public loadingCtrl: LoadingController,private nativeGeocoder: NativeGeocoder,private iab: InAppBrowser){
        this.totalPrice = navParams.get('totalPrice');
        this.discount_price = this.totalPrice;
        this.discount   =   0;
        this.saveOrderObj  = navParams.get('saveOrderObj');
        this.cat_id        = navParams.get('cat_id');
        this.s_type        = navParams.get('s_type');    
        console.log(this.s_type);
        
        // this.clat         = navParams.get('lat');
        // this.clong         = navParams.get('long');
        this.array_p=[];
        // this.providers=[];
        this.sendstatus=false;

        this.service_type= localStorage.getItem('service_type');


        var data ={ 
            method : "get_category_name",
            category_id: this.s_type
           }
           allService.login(data).subscribe(res =>{
                this.service_type_name =  res.category_name;
        })
    }
    clicl(){

    }
    ionViewDidLoad(){
        console.log('ionViewDidLoad Payment');
        this.tab = "active";
    }
    
    tab_swap(type){
        this.tab = type;
        if (this.tab == 'active') {
            this.paymentbtn = 'PayNow'
        } else {
            this.paymentbtn = 'PayLater';
        }
    }
    
    goBack(){
        this.navCtrl.pop();
    }
    
    closeBrowser(){
        console.log('ssad');
        
    }

    dec2hex (dec) {
        return ('0' + dec.toString(16)).substr(-2)
      }
    
      generateId (len) {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr,this.dec2hex).join('')
      }
      

    payOption(val){
        console.log('selected val is ---', val);
        this.saveOrderObj.payment_option = val;
        if(val != 'cod'){

              console.log(this.generateId(20));
              this.refno = this.generateId(20);
            // this.refno = Math.floor((Math.random() * 1000000000) + 1);
            const browser = this.iab.create('http://www.huallow.com/helpy/request.php');
            browser.on("loadstop")
            .subscribe((ev: InAppBrowserEvent) => {
                    
                        if(ev.url == "https://www.huallow.com/helpy/response.php"){
                        console.log("payment failed");
                        browser.close();
                        }else if(ev.url == "https://www.huallow.com/helpy/response.php"){
                        console.log("payment success");
                        this.closeBrowser();
                        browser.close();
                        }
            });
        }
    }
    radius:any;
    order_id;
    prodata;
    paymentSucces(){

        
        console.log('paymentSucces: ', this.saveOrderObj);
        if (this.termsncond == true) {
            if (this.paymentMode == 'creditcard' || this.paymentMode == 'netbanking' || this.paymentMode == 'wallet' || this.paymentMode == 'cod') {
                if (this.saveOrderObj.payment_option == 'cod') {
                    this.saveOrderObj.payment_status = 0;
                }
                const loading = this.loadingCtrl.create({
                    content: 'Saving Order...'
                });
                loading.present();

                localStorage.setItem('ship_address',this.saveOrderObj.shipping_address);
                // this.saveOrderObj.total_price = this.totalPrice;
                // this.saveOrderObj.address_id = "15";
                // var temp = [];
                
                // this.cartItems.forEach(element => {
                //   temp[0] = element.prod_id;
                //   temp[1] = element.qty;
                //   temp[2] = element.product_price;
                
                //   this.saveOrderObj.products.push(temp);
                //   console.log(temp);
                // });
                // console.log(this.saveOrderObj);
                // console.log(this.saveOrderObj);
                this.nativeGeocoder.forwardGeocode(this.saveOrderObj.shipping_address)
                .then((coordinates: NativeGeocoderForwardResult) => {
                    this.reallat = coordinates.latitude;
                    this.reallong = coordinates.longitude;
                    console.log('The coordinates are latitude='+this.reallong);
                    console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)

                    var data ={
                        method : 'get_city1',
                        // city   : this.saveOrderObj.cityname,
                        service_type:this.s_type,
                        lat     :this.reallat,
                        long    :this.reallong,
                        category_id : this.cat_id
                    }
    
                    this.allService.get_city(data).subscribe(res =>{
                        console.log(res);
                        console.log(res.response);
                        this.prodata = res.response;
                    
                        this.saveOrderObj.method ='save_orders_tmp';
                        this.saveOrderObj.total_price = this.discount_price;
                this.allService.save_orders(this.saveOrderObj).subscribe(res =>{
                    console.log("here is the validate Email res", res);
                    loading.dismiss(() =>{
                        console.log('Dismissed loading');
                    });
                    this.order_id = res.order_id;
                    // this.send();
                    if (res.status == 200) {

                        this.navCtrl.push('ListserviceproviderPage', {
                            totalPrice : this.discount_price,
                            orderdata  : this.saveOrderObj,
                            order_id   : res.order_id,
                            providers : this.providers,
                            radius  :   this.radius,
                            prodata : this.prodata,
                            service_type_name:this.service_type_name
                        }, {
                            animate  : true,
                            animation: 'md-transition'
                        });

                    }
                  
                })
                    })

                })
                .catch((error: any) => console.log(error));
            } else {
                let alert = this.alertCtrl.create({
                    title   : 'Alert',
                    subTitle: 'You must select an payment method before placing an order',
                    buttons : ['Dismiss']
                });
                alert.present();
            }
        } else {
            let alert = this.alertCtrl.create({
                title   : 'Alert',
                subTitle: 'You must accept terms and condition before placing an order',
                buttons : ['Dismiss']
            });
            alert.present();
        }
    }
   
      discount:any;
      discount_price:any;
    applyCoupon(){
        console.log(this.code);
        if (this.code == undefined) {
            let alert = this.alertCtrl.create({
                title   : 'No Promo code Applied !',
                subTitle: 'Please apply Promo code.',
                buttons : ['OK']
            });
            alert.present();
        } else {

            var data =
            {
            method:"match_coupon",
            coupon_code:this.code
            }
 
            this.allService.login(data).subscribe(res =>{
            console.log(res);
            
                if(res.status == '200'){
                        
                        var valid_date = res.coupon[0].coupon_valid_date;
                    
                        if(new Date(valid_date) > new Date()){
                            console.log('aaplied');
                            
                            let alert = this.alertCtrl.create({
                                title   : 'Promo Code Applied !',
                                subTitle: 'Your Promo Code is Applied successfully !',
                                buttons : ['OK']
                            });
                            alert.present();

                            var price = res.coupon[0].coupon_discount_price;
                            var dis_type = res.coupon[0].coupon_discount_type;

                            if(dis_type == 'Percent'){
                                this.discount = ( (price * this.totalPrice)/100);
                                // discount = this.totalPrice;
                                this.discount_price =  this.totalPrice -( (price * this.totalPrice)/100);
                                
                                console.log('discount',this.discount);
                                console.log('discount_price',this.discount_price);

                            }else{
                                this.totalPrice =  this.totalPrice - price;
                                console.log('no in if');
                                
                            }

                        }else{


                            console.log('not applied');
                            let alert = this.alertCtrl.create({
                                title   : 'Promo  Code not Applied !',
                                subTitle: 'Your Promo Code is Expired !',
                                buttons : ['OK']
                            });
                            alert.present();
                        }

                }else{
                    let alert = this.alertCtrl.create({
                        title   : 'Promo Code not Applied !',
                        subTitle: 'Your Promo Code is Invalid fdf!',
                        buttons : ['OK']
                    });
                    alert.present();
                    
                }
           });
            
        }
    }
}
