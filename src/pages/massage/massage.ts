import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';

/**
 * Generated class for the MassagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage() @Component({
    selector   : 'page-massage',
    templateUrl: 'massage.html',
})
export class MassagePage {
    
    allCategorys: any;
    
    SubMenuMassage = [];
    subChildMassage = [];
    showHideMassage: boolean;
    showHideMassageChild: boolean;
    subSubChildMassage = [];
    
    dontShowPlusButtons: boolean;
    price: any;
    cartItems = [];
    
    
    getProductObj = {
        method: 'get_products',
        id    : '',
    }
    
    enableNextBtn: boolean;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public allService: AllService){
        
        this.showHideMassage = false;
        this.showHideMassageChild = false;
        this.dontShowPlusButtons = false;
        this.price = 0;
        
        this.enableNextBtn = false;
        
    }
    
    ionViewDidLoad(){
        // this.loadMap();
        console.log('ionViewDidLoad Massage Service ');
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        
        this.allService.getcategories().subscribe(res =>{
            
            console.log(res);
            this.allCategorys = res;
            this.SubMenuMassage = res[1].sub_categories;
            
            console.log("here goes SubMenuMassage--->>", this.SubMenuMassage);
            
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
    
    
    showMoreMassage(selectedVal){
        this.showHideMassage = true;
        this.subChildMassage = selectedVal.sub_categories;
        console.log('printing--->>', this.subChildMassage);
        this.subSubChildMassage = [];
        this.dontShowPlusButtons = false;
        
        if (this.subChildMassage == null) {
            this.showHideMassageChild = true;
            this.getProductObj.id = selectedVal.id;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildMassage = res;
            })
        }
    }
    
    showMoreChildMassage(selectedVal){
        this.showHideMassageChild = true;
        this.subSubChildMassage = selectedVal.sub_categories;
        
        if (this.subSubChildMassage == null) {
            this.getProductObj.id = selectedVal.id;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildMassage = res;
            })
        }
        console.log('printing--->>', this.subSubChildMassage);
    }
    
    
    goBack(){
        this.navCtrl.pop();
    }
    
    goToHistory(){
        console.log('histroy click');
        this.navCtrl.push('Myproject');
    }
    
    orderInfoM(){
        this.navCtrl.push('orderInfo', {
            cartItems : this.cartItems,
            totalPrice: this.price,
            pageToShow: 'M'
        });
    }
    
}
