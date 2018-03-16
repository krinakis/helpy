import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';
//import { DatePicker } from '../../components/ionic2-date-picker/date-picker.component';
//import { DatePicker } from 'ionic2-date-picker';

@IonicPage() @Component({
    selector   : 'page-address',
    templateUrl: 'address.html', //providers: [DatePicker]
})
export class Address {
    
    totalPrice: any;
    numberOfItem: any;
    cartItems = [];
    
    defaultAddress = {
        Building: '',
        Street  : '',
        City    : '',
        State   : '',
        country : '',
        ZipCode : '',
    }
    orderDate: String = new Date().toISOString();
    orderTime: any;
    
    // saveOrders = {
    //   userId: '',
    //   Orders: [],
    //   isPaymentDone: false,
    //   date: '',
    //   time: '',
    //   Address: {}
    // };
    
    saveOrderObj = {
        method          : 'save_orders',
        user_id         : localStorage.getItem('id'),
        total_price     : 0,
        address_id      : '',
        shipping_address: '',requested_date  : '',
        requested_time  : '',
        payment_status  : 0,
        payment_option  : '',
        order_status     : 1,
        products        : []
    }
    
    get_default_addressObj = {
        method : 'get_default_address',
        user_id: localStorage.getItem('id')
    }
    
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public allService: AllService, public loadingCtrl: LoadingController){
        //public datePicker: DatePicker, public viewController: ViewController
        
        this.totalPrice = navParams.get('totalPrice');
        //this.numberOfItem = navParams.get('numberOfItem');
        this.numberOfItem = this.cartItems.length;
        this.cartItems = navParams.get('cartItems');
        //this.orderDate= Date.now();
        console.log("i have this in my cart---->> ", this.cartItems);
        
        // this.Address.address = localStorage.getItem("address");
        // console.log(this.Address.address);
        // this.Address.city = localStorage.getItem("city");
        // this.Address.state = localStorage.getItem("state");
        // this.Address.country = localStorage.getItem("country");
        
        
        //  this.datePicker = new DatePicker(<any>this.modalCtrl, <any>this.viewController);
        
        //   this.datePicker.onDateSelected.subscribe((date) => {
        //     console.log(date);
        //     var a = new Date(date);
        //     console.log(a);
        //     var mon = a.getMonth() + 1;
        //     this.orderDate = '' + a.getDate() + '-' + mon + '-' + a.getFullYear();
        //     console.log('After Converting Iso String', this.orderDate);
        //   });
        
    }
    
    ionViewDidEnter(){
        this.get_default_address();
    }
    
    // ionViewDidLoad() {
    
    //   this.get_default_address();
    // }
    
    goBack(){
        this.navCtrl.pop();
    }
    
    payment(){
        
        this.saveOrderObj.total_price = this.totalPrice;
        
        var temp = [];
        
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
            totalPrice  : this.totalPrice,
            saveOrderObj: this.saveOrderObj
        });
    }
    
    selectaddress(){
        this.navCtrl.push('Selectaddress');
    }
    
    newaddress(){
        // let modal = this.modalCtrl.create('Newaddress', { Address: this.Address });
        // modal.present();
        this.navCtrl.push('Newaddress');
    }
    
    // opendate(){
    //   this.datePicker.showCalendar();
    // }
    
    
    get_default_address(){
        
        const loading = this.loadingCtrl.create({
            content: 'Getting Address...'
        });
        
        console.log(this.get_default_addressObj);
        
        this.allService.get_default_address(this.get_default_addressObj).subscribe(res =>{
            console.log("here goes get_default_address responce", res);
            
            // console.log("here goes get_default_address option_values", res.option_values);
            this.defaultAddress = res; //.option_values;
            
            console.log("this is defualt addres", this.defaultAddress);
            this.saveOrderObj.address_id = res.id;
            
            loading.dismiss(() =>{
                console.log('Dismissed loading');
            });
            
            
        })
    }
    
    
}
