import {Component,} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';


@IonicPage() @Component({
    selector   : 'page-beauty',
    templateUrl: 'beauty.html',
})
export class BeautyPage {
    
    SubMenuBeauty = [];
    subChildBeauty = [];
    showHideBeauty: boolean;
    showHideBeautyChild: boolean;
    subSubChildBeauty = [];
    dontShowPlusButtons: boolean;
    
    price: any;
    cartItems = [];
    
    getProductObj = {
        method: 'get_products',
        id    : '',
    }
    enableNextBtn: boolean;
    
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public allService: AllService, public loadingCtrl: LoadingController){
        
        this.showHideBeauty = false;
        this.showHideBeautyChild = false;
        this.price = 0;
        
        this.dontShowPlusButtons = false;
        this.enableNextBtn = false;
    }
    
    ionViewDidLoad(){
        // this.loadMap();
        console.log('ionViewDidLoad Auto Service');
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        
        this.allService.getcategories().subscribe(res =>{
            
            console.log(res);
            
            this.SubMenuBeauty = res[4].sub_categories;
            
            loading.dismiss(() =>{
                console.log('Dismissed loading');
            });
            
        });
    }
    
    
    goBack(){
        this.navCtrl.pop();
    }
    
    goToHistory(){
        console.log('histroy click');
        this.navCtrl.push('Myproject');
    }
    
    // orderInfo() {
    //   this.navCtrl.push('orderInfo', { cartItems: this.cartItems, totalPrice: this.price, pageToShow: 'C' });
    // }
    
    summary(){
        this.navCtrl.push('Summary', {cartItems: this.cartItems});
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
    
    showMoreBeauty(selectedVal){
        this.showHideBeauty = true;
        this.subChildBeauty = selectedVal.sub_categories;
        console.log('printing--->>', this.subChildBeauty);
        this.subSubChildBeauty = [];
        
        this.dontShowPlusButtons = false;
        if (this.subChildBeauty == null) {
            this.showHideBeautyChild = true;
            this.getProductObj.id = selectedVal.id;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildBeauty = res;
            })
        }
        
    }
    
    showMoreChildBeauty(selectedVal){
        this.showHideBeautyChild = true;
        this.subSubChildBeauty = selectedVal.sub_categories;
        // console.log('showMoreChildBeauty printing--->>', this.subSubChildBeauty);
        
        if (this.subSubChildBeauty == null) {
            this.getProductObj.id = selectedVal.id;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildBeauty = res;
            })
        }
    }
    
    
}
