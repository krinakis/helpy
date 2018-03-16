import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';

/**
 * Generated class for the AutoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage() @Component({
    selector   : 'page-auto',
    templateUrl: 'auto.html',
})
export class AutoPage {
    
    
    allCategorys: any;
    
    banner = [
        {'media_image': ''},
        {'media_image': ''}
    ];
    SubMenuAuto = [];
    subChildAuto = [];
    showHideAuto: boolean;
    showHideAutoChild: boolean;
    subSubChildAuto = [];
    
    showSend: boolean;
    
    price: any;
    cartItems = [];
    
    dontShowPlusButtons: boolean;
    enableNextBtn: boolean;
    
    getProductObj = {
        method: 'get_products',
        id    : '',
    }
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public allService: AllService, public loadingCtrl: LoadingController){
        
        this.showHideAuto = false;
        this.showHideAutoChild = false;
        this.dontShowPlusButtons = false;
        this.price = 0;
        this.enableNextBtn = false;
        this.idarray=[];    
    }   
    SubMenuAuto1:any;
    SubMenuAuto2:any;
    SubMenu:any;
    ionViewDidLoad(){
        // this.loadMap();
        console.log('ionViewDidLoad Auto Service');
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        
        this.allService.getcategories().subscribe(res =>{
            console.log(res);
            this.allCategorys = res;
            this.SubMenuAuto = res[2].sub_categories;
            console.log(this.SubMenuAuto[0]);
            console.log(this.SubMenuAuto[1]);
            this.SubMenuAuto1= this.SubMenuAuto[0].sub_categories;
            this.SubMenuAuto2= this.SubMenuAuto[1];
            this.SubMenu=this.SubMenuAuto[0];
            console.log("here goes allCategorys--->>", this.allCategorys);
            loading.dismiss(() =>{
                console.log('Dismissed loading');
            });
        });
        this.allService.getbanners().subscribe(res =>{
            this.banner = res.media;
            console.log("here goes getbanners--->>", res, this.banner);
        });
    }
    
    showhidewash:boolean;
    showMoreAuto(selectedVal){
        console.log(selectedVal);
        localStorage.setItem('autotype','emergency');
        this.cartItems=[];
        this.idarray =[];
        this.showHideAuto = true;

        this.price = 0;
        this.showhidewash = false;

        this.subChildAuto = selectedVal.sub_categories;
        console.log('printing--->>', this.subChildAuto);
        this.subSubChildAuto = [];
        
        this.dontShowPlusButtons = false;
        
        if (this.subChildAuto == null) {
            this.showHideAutoChild = true;
            this.getProductObj.id = selectedVal.id;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildAuto = res;
            })
        }
    }
    
    showMoreChildAuto(selectedVal){
        this.cartItems=[];
        this.idarray =[];
        this.showHideAutoChild = true;
        this.subSubChildAuto = selectedVal.sub_categories;
        
        if (this.subSubChildAuto == null) {
            this.getProductObj.id = selectedVal.id;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildAuto = res;
            })
        }
        
        console.log('showMoreChildBeauty printing--->>', this.subSubChildAuto);
    }
    name:any;
    showMoreChildAutomodi(selectedVal){
        this.cartItems=[];
        this.idarray =[];
        this.showHideAutoChild = true;
        this.subSubChildAuto = null;
        console.log(selectedVal);

        localStorage.setItem('autotype','');

        this.price = 0;
        this.showhidewash=true;
        if(selectedVal == 45)
        {
            this.name = "Car";
        }
        else
        {
            this.name = "Motorcycle";
        }
        if (this.subSubChildAuto == null) {
            this.getProductObj.id = selectedVal;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildAuto = res;
            })
        }
        
        console.log('showMoreChildBeauty printing--->>', this.subSubChildAuto);
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
        console.log(this.cartItems);
        localStorage.setItem('service_type','auto');
        this.navCtrl.push('Summary', {
            fromcomingservice: 'auto',
            cartItems        : this.cartItems
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
    idarray=[];
    selectpro(obj){
        let id = obj.id;
        console.log(id);
        this.enableNextBtn = true;

        if(this.idarray.length != 0)
        {
                if(this.idarray.indexOf(id) > -1 )
                {
                    let index = this.cartItems.indexOf(obj);

                    this.cartItems.splice(index, 1);
                    
                    let index1 = this.cartItems.indexOf(id);
                    this.idarray.splice(index1, 1);
                    console.log("CartItems",this.cartItems);
                    console.log("IdArray",this.idarray);

                    this.price = this.price - Number(obj.product_price);
                    if(this.price < 1)
                    {
                        this.enableNextBtn = false;
                    }
                    else{
                        this.enableNextBtn = true;
                    }
                }
                else
                {
                    console.log("B");
                    this.idarray.push(id);
                    console.log("IdArray",this.idarray);
                    obj.qty='1';
                    this.cartItems.push(obj);
                    console.log("CartItems",this.cartItems);
                    this.price = this.price + Number(obj.product_price);
                }   
        }
        else
        {
            this.idarray.push(id);
            obj.qty='1';
            this.cartItems.push(obj);

            console.log("IdArray",this.idarray);
            console.log("CartItems",this.cartItems);

            this.price = this.price + Number(obj.product_price);
            this.enableNextBtn = true;
            
        }
    }
}
