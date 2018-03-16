import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';
import { elementAt } from 'rxjs/operators/elementAt';

@Component({
    selector   : 'page-myproject',
    templateUrl: 'myproject.html',
})
export class Myproject {
    tab: any;
    
    get_ordersObj = {
        method  :   'get_orders',
        user_id :   localStorage.getItem('id'),
        page  :   1
    }
    productList:any=[];
    rate: any;
    orders: any;
    products: any;
    page;
    record:any;
    record1:any;
    show1:boolean
    show:boolean;
    //TODO: update photo, name, stars
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public allService: AllService, public loadingCtrl: LoadingController){
        this.record = 0;
        this.record1 = 0;
        this.show = false;
        this.show1 = false;
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad Myproject');
        this.tab = "active";
    }
    ionViewWillEnter(){
        this.page = 1;
        this.productList=[];
        this.getAllOrders(this.page);
    }
    loadMore(infiniteScroll){
        this.page = this.page+1;
        var response=this.getAllOrders(this.page,infiniteScroll);
    }
    tab_swap(type){
        this.tab = type;
    }
    
    projectlist(){
        this.navCtrl.push('Projectlist');
    }
    
    getAllOrders(pageno,infiniteScroll?){
        this.get_ordersObj.page =pageno;
        const loading = this.loadingCtrl.create({
            content: 'Saving Address...'
        });
        
        this.allService.get_orders(this.get_ordersObj).subscribe(res =>{
            console.log("here is the get_orders", res);
            if(res.status == 200)
            {

                this.orders = res.orders;
                console.log("here is the get_orders", this.orders);
                for(let i=0; i<this.orders.length; i++) 
                {
                    this.productList.push(this.orders[i]);

                    if(this.orders[i].order_status == 0 || this.orders[i].order_status == 3)
                    {
                        this.record = this.record + 1;
                    }
                    else
                    {
                        this.record1 = this.record1 + 1;
                    }
                }

                if(this.record == 0)
                {
                    this.show = true;
                }
                if(this.record1 == 0)
                {
                    this.show1 = true;
                }

            }
           
            // this.products=res.orders[0].products;
            // console.log("here foes ",this.products);
            // console.log("order-----", this.orders[0].order_date);
            // console.log("Date----", this.orders.order_date);
            loading.dismiss(() =>{
                console.log('Dismissed loading');
            });

            if(infiniteScroll != null){
                if(this.orders.length < 10){
                  //return false;
                  infiniteScroll.enable(false);
                }else{
                  //return true;
                  infiniteScroll.complete();
                }
            }
        })
    }
    
    
    orderDetails(order: any){
        this.navCtrl.push('orderDetailsHistroy', {
            order: order
        });
    }
    
    Projectlist(){
        this.navCtrl.push('Projectlist');
    }
    
}
