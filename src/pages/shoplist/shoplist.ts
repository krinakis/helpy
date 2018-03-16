import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';

@IonicPage() @Component({
    selector   : 'page-shop-list',
    templateUrl: 'shoplist.html',
})
export class ShopListPage {
    SubMenuShopList = [];
    subChildShopList = [];
    showHideShopList: boolean;
    showHideShopListChild: boolean;
    subSubChildShopList = [];
    
    price: any;
    cartItems = [];
    
    dontShowPlusButtons: boolean;
    
    getProductObj = {
        method: 'get_products',
        id    : '',
    }
    shopname: any;
    shopobj: any;
    enableNextBtn: boolean;
    orderComment: string;
    searchTerm: string = '';
    stackcall: boolean = true;
    cat_id:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public allService: AllService){        
        
        this.showHideShopList = true;
        this.showHideShopListChild = true;
        this.dontShowPlusButtons = true;
        this.price = 0;
        this.enableNextBtn = true;
        this.shopname = this.navParams.get('shopname');
        this.shopobj = this.navParams.get('shopobj');
        
        if(this.shopobj !=''){
            this.showMoreShopList(this.shopobj);
        }else{
            this.cat_id = this.navParams.get('id');
            this.showMoreShopList1(this.shopobj);
        }
        
    }
    
    ionViewDidLoad(){
        
        console.log('ionViewDidLoad Service');
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        
        this.allService.getcategories().subscribe(res =>{
            console.log(res);
            this.SubMenuShopList = res[5].sub_categories;
            loading.dismiss(() =>{
                console.log('Dismissed loading');
            });
        });
        
    }
    
    
    add(selectedVal){
        this.enableNextBtn = true;
        console.log("selectd value is--", selectedVal)
        let index = this.cartItems.indexOf(selectedVal);
        console.log('Addtion ---- found', index);
        if (index == -1) {
            selectedVal.qty++
            this.cartItems.push(selectedVal);
        } else {
            selectedVal.qty++;
        }
        
        this.price = this.price + Number(selectedVal.product_price);
        console.log("here goes cart Items after add--->>", this.cartItems);
    }
    
    sub(selectedVal){
        //console.log(selectedVal.qty);
        if (selectedVal.qty != 0) {
            selectedVal.qty--;
            this.price = this.price - Number(selectedVal.product_price);
            
            let index = this.cartItems.indexOf(selectedVal);
            console.log("this is index of the value in my array--->>", index);
            this.cartItems.splice(index, 1);
            
            console.log("here goes cart Items after sub", this.cartItems);
        } else {
            selectedVal.qty = 0;
        }
    }
    
    orderInfo(){
        // console.log('Total Time: ', this.totalHours);
        
        // this.navCtrl.push('orderInfo', {
        //     cartItems: this.cartItems,
        //     totalPrice: this.price,
        //     pageToShow: 'C',
        
        // });
        this.navCtrl.push('Summary', {
            fromcomingservice: '2',
            cartItems        : this.cartItems,
            orderComment     : this.orderComment
        });
    }
    
    // doInfinite(infiniteScroll){
    //     console.log('Begin async operation');
    //     if (this.stackcall == true) {
            
            
    //         setTimeout(() =>{
    //             this.showMoreShopList(this.shopobj).then(() =>{
    //                 infiniteScroll.complete();
    //                 this.stackcall = false;
    //             }, () =>{
                
    //             });
                
    //             console.log('Async operation has ended');
                
                
    //         }, 500);
    //     }
    // }
    
    showMoreShopList(selectedVal){
        return new Promise((resolve, reject) =>{
            
            
            this.showHideShopList = true;
            this.subChildShopList = selectedVal.sub_categories;
            console.log('printing--->>', this.subChildShopList);
            this.subSubChildShopList = [];
            
            this.dontShowPlusButtons = false;
            
            if (this.subChildShopList == null) {
                this.showHideShopListChild = true;
                this.getProductObj.id = selectedVal.id;
                this.allService.get_products(this.getProductObj).subscribe(res =>{
                    console.log("here is my all product list", res);
                    for (let g of res) {
                        g.qty = 0;
                        this.subSubChildShopList.push(g);
                        
                    }
                    // this.stackcall = false;
                    this.subSubChildShopList = res;
                    this.allService.setitems(this.subSubChildShopList);
                })
            }
            resolve('1');
        })
    }
    showMoreShopList1(selectedVal){
        return new Promise((resolve, reject) =>{
            
            
            this.showHideShopList = true;
            this.subChildShopList = selectedVal.sub_categories;
            console.log('printing--->>', this.subChildShopList);
            this.subSubChildShopList = [];
            
            this.dontShowPlusButtons = false;
            
            if (this.subChildShopList == null) {
                this.showHideShopListChild = true;
                this.getProductObj.id = this.cat_id;
                this.allService.get_products(this.getProductObj).subscribe(res =>{
                    console.log("here is my all product list", res);
                    for (let g of res) {
                        g.qty = 0;
                        this.subSubChildShopList.push(g);
                        
                    }
                    // this.stackcall = false;
                    this.subSubChildShopList = res;
                    this.allService.setitems(this.subSubChildShopList);
                })
            }
            resolve('1');
        })
    }
    setFilteredItems(){
        
        this.subSubChildShopList = this.allService.filterItemsproduct(this.searchTerm);
        
    }
    
    showMoreChildShopList(selectedVal){
        this.showHideShopListChild = true;
        this.subSubChildShopList = selectedVal.sub_categories;
        // console.log('showMoreChildBeauty printing--->>', this.subSubChildBeauty);
        
        if (this.subSubChildShopList == null) {
            this.getProductObj.id = selectedVal.id;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildShopList = res;
            })
        }
    }
    
    
    goToHistory(){
        console.log('histroy click');
        this.navCtrl.push('Myproject');
    }
    summary(){
        localStorage.setItem('service_type','mall');
        this.navCtrl.push('Summary', {cartItems: this.cartItems});
    }
    
    
    openPage(){
        this.navCtrl.push('ShopDetailsPage');
    }
    
    goBack(){
        this.navCtrl.pop();
    }
    productdetail(g)
    {
        console.log("productdetail");
        this.navCtrl.push('ProductdetailPage',{'data':g});
                
    }
}
