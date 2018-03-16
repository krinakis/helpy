import {Component, Renderer} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AllService} from '../../services/all.service';

@IonicPage() @Component({
    selector   : 'page-clean',
    templateUrl: 'clean.html',
})
export class CleanPage {
    
    allCategorys: any;
    
    SubMenuClean = [];
    subChildClean = [];
    subChildCleanSub = [];
    showHideClean: boolean;
    showHideCleanChild: boolean;
    subSubChildClean = [];
    
    price: any;
    cartItems = [];
    maincat: any;
    dontShowPlusButtons: boolean;
    
    getProductObj = {
        method: 'get_products',
        id    : '',
    }
    
    enableNextBtn: boolean;
    
    inHouseService = [];
    
    totalHours: number = 0;
    showservices: boolean = false;
    extraservices: any;
    showno: boolean = false;
    
    constructor(public navCtrl: NavController, public allService: AllService, public navParams: NavParams, public loadingCtrl: LoadingController, private render: Renderer, public alertCtrl: AlertController){
        
        this.showHideClean = false;
        this.showHideCleanChild = false;
        this.dontShowPlusButtons = false;
        this.price = 0;
        this.enableNextBtn = false;

    }
    
    ionViewDidLoad(){
        // this.loadMap();

        
        console.log('ionViewDidLoad Service');
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        
        this.allService.getcategories().subscribe(res =>{
            console.log(res);
            this.allCategorys = res;
            for (let g of res[0].sub_categories) {
                if (g.id != 23) {
                    this.SubMenuClean.push(g);
                }
                
            }
            
            //this.SubMenuClean = res[0].sub_categories;
            //this.subChildCleanSub = this.SubMenuClean.splice(1, 1);
            console.log("here goes allCategorys--->>", this.allCategorys, this.SubMenuClean, this.subChildCleanSub);
            
            loading.dismiss(() =>{
                console.log('Dismissed loading');
            });
        });
    }
    
    add(selectedVal){
        this.totalHours = this.totalHours + this.calculatehour(selectedVal);
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
        this.getlevelservices();
        this.price = this.price + Number(selectedVal.product_price);
        console.log("here goes cart Items after add--->>", this.cartItems);
        console.log('Total Time: ', this.totalHours);
    }
    
    calculatehour(selectedVal){
        var finaltime = 0;
        if (selectedVal.product_time_unit == 'min') {
            finaltime = parseFloat(selectedVal.product_time) / 60;
        } else if (selectedVal.product_time_unit == 'hr') {
            finaltime = parseFloat(selectedVal.product_time);
        } else {
            finaltime = parseFloat(selectedVal.product_time) / 3600;
        }
        console.log(finaltime);
        return finaltime;
        
    }
    
    sub(selectedVal){
        //console.log(selectedVal.qty);
        if (selectedVal.qty != 0) {
            this.totalHours = this.totalHours - this.calculatehour(selectedVal);
            selectedVal.qty--;
            this.price = this.price - Number(selectedVal.product_price);
            
            let index = this.cartItems.indexOf(selectedVal);
            console.log("this is index of the value in my array--->>", index);
            this.cartItems.splice(index, 1);
            
            console.log("here goes cart Items after sub", this.cartItems);
        } else {
            selectedVal.qty = 0;
            this.showservices = false;
        }
        console.log('Total Time: ', this.totalHours);
    }
    
    showMore(selectedVal){
        this.showHideClean = true;
        this.maincat = selectedVal.id;
        if (selectedVal.category_name == 'ASSISTANT') {
            this.showno = true;
        } else {
            this.showno = false;
        }
        this.showservices = false;
        this.subChildClean = selectedVal.sub_categories;
        console.log('printing---at 1st lavel>>', this.subChildClean);
        this.subSubChildClean = [];
        this.dontShowPlusButtons = false;
        
        if (this.subChildClean == null) {
            this.showHideCleanChild = true;
            this.getProductObj.id = selectedVal.id;
            // this.maincat = selectedVal.id;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildClean = res;
            })
        }
        //this.totalHours = 0;
    }
    
    showMoreChild(selectedVal){
        this.showHideCleanChild = true;
        //this.subSubChildClean = selectedVal.sub_categories;
        this.getProductObj.id = selectedVal.id;
        
        if (selectedVal.category_name == 'IN HOUSE SERVICE') {
            this.dontShowPlusButtons = true;
            
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                console.log('old values are', this.inHouseService);
                if (this.inHouseService.length == 0) {
                    //console.log("if k anagar hu mai");
                    this.inHouseService = res;
                }
            })
        } else {
            this.dontShowPlusButtons = false;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                if (this.subSubChildClean.length == 0) {
                    this.subSubChildClean = res;
                }
            })
        }
        console.log('subSubChildClean printing--->>', selectedVal);
    }
    
    addThisItem(event: any, selectedVal){
        
        let classList = event.target.classList;
        this.enableNextBtn = true;
        
        if (classList.contains("btnAdd")) {
            console.log("Foudddd");
            event.preventDefault();
            this.render.setElementClass(event.target, "btnAdd", false);
            // this.cartItems.splice(index, 1);
            
            let index = this.cartItems.indexOf(selectedVal);
            console.log("this is index of the value in my CartItems--->>", index);
            this.cartItems.splice(index, 1);
            
            this.price = this.price - Number(selectedVal.product_price);
            selectedVal.qty--;
        } else {
            event.preventDefault();
            this.render.setElementClass(event.target, "btnAdd", true);
            
            console.log("addthis item too cart", selectedVal);
            this.cartItems.push(selectedVal);
            this.price = this.price + Number(selectedVal.product_price);
            console.log("here goes cart Items", this.cartItems);
            selectedVal.qty++;
        }
        
    }
    
    goBack(){
        this.navCtrl.pop();
    }
    
    goToHistory(){
        console.log('histroy click');
        this.navCtrl.push('Myproject');
    }
    
    orderInfo(){
        console.log('Total Time: ', this.totalHours);
        if (this.totalHours >= 1) {
            localStorage.setItem('service_type','clean');
            this.navCtrl.push('orderInfo', {
                cartItems : this.cartItems,
                totalPrice: this.price,
                pageToShow: 'C',
                totalHours: this.totalHours
            });
        } else {
            let alert = this.alertCtrl.create({
                title   : 'Opps...',
                subTitle: 'Minimum service time must be higher than 1 hour.<br>Please select more service.',
                buttons : ['OK']
            });
            alert.present();
        }
    }
    
    getlevelservices(){
        if (this.maincat == '22') {
            let getProductObjlocal = {
                method: 'get_products',
                id    : '23',
            }
            this.allService.get_products(getProductObjlocal).subscribe(res =>{
                console.log(res);
                this.showservices = true;
                this.extraservices = res;
            })
        }
    }
    
    addextra(subChildx){
        subChildx.select = true;
        this.enableNextBtn = true;
        
    }
    
    rmextra(subChildx){
        subChildx.select = false;
        
    }
    
    onlyclick(subChildx){
        if (subChildx.select == false) {
            subChildx.select = true;
            let gettime = this.calculatehour(subChildx);
            this.totalHours = this.totalHours + gettime;
            this.price = this.price + Number(subChildx.product_price);
            subChildx.qty++
            this.cartItems.push(subChildx);
        } else {
            
            subChildx.select = false;
            let gettime = this.calculatehour(subChildx);
            this.totalHours = this.totalHours - gettime;
            this.price = this.price - Number(subChildx.product_price);
            let index = this.cartItems.indexOf(subChildx);
            subChildx.qty--
            this.cartItems.splice(index, 1);
        }
    }
}
