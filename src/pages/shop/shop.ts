import {Component, NgZone, ViewChild} from '@angular/core';
import {Content, Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {MaplocationPage} from '../../pages/maplocation/maplocation';
import {AllService} from '../../services/all.service';

/**
 * Generated class for the ShopPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage() @Component({
    selector: 'page-shop',
    templateUrl: 'shop.html',
})
export class ShopPage {
    @ViewChild(Content) content: Content;
    SubMenuShop = [];
    subChildShop = [];
    showHideShop: boolean;
    showHideShopChild: boolean;
    subSubChildShop = [];
    shopname: any;
    price: any;
    cartItems = [];
    
    dontShowPlusButtons: boolean;
    selected: any;
    getProductObj = {
        method: 'get_products',
        id    : '',
    }
    enableNextBtn: boolean;
    searchTerm: string = '';
    public scrollAmount = 0;
    loc: any = 'SS 7, Kelana Jaya, Petaling Jaya, Malaysia';
    showme: boolean = true;
    
    constructor(public navCtrl: NavController, public zone: NgZone, public eventz: Events, public navParams: NavParams, public loadingCtrl: LoadingController, public allService: AllService){
        
        this.showHideShop = false;
        this.showHideShopChild = false;
        this.dontShowPlusButtons = false;
        this.price = 0;
        this.enableNextBtn = false;
        
        localStorage.setItem('service_type','mall');
    }
    
    loadaddr(){
        this.eventz.subscribe('getaddress', () =>{
            this.loc = this.allService.getaddress();
        })
    }
    
    ionViewDidLoad(){
        this.loadaddr();
        console.log('ionViewDidLoad Service');
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        
        this.allService.getcategories().subscribe(res =>{
            console.log(res);
            this.SubMenuShop = res[5].sub_categories;
            this.allService.setitems(this.SubMenuShop);
            // this.setFilteredItems();
            loading.dismiss(() =>{
                console.log('Dismissed loading');
            });
        });
    }
    search:boolean;
    searchdata;

   
    setFilteredItems(ev:any){
        let val = ev.target.value;
        console.log(val);
        // this.SubMenuShop = this.allService.filterItems(this.searchTerm);
        // console.log(this.SubMenuShop);
        var data ={
            "method":"get_search",
            "search":this.searchTerm
        }
    if(this.searchTerm !=''){
        this.allService.searchItemMall(data).subscribe(res =>{
            this.searchdata = res;
            if(this.searchdata.length > 0){
              this.search=true;
            }
            console.log(this.searchdata);     
          });
          }else{
            this.search=false;
          }
        
    }
    
    location(){
        this.navCtrl.push(MaplocationPage);
        
    }
    
    scrollTo(){
        // set the scrollLeft to 0px, and scrollTop to 500px
        // the scroll duration should take 200ms
        this.content.scrollTo(0, 500, 200);
    }
    
    scrollHandler(event){
        console.log(`ScrollEvent: ${event}`)
        this.zone.run(() =>{
            // since scrollAmount is data-binded,
            // the update needs to happen in zone
            this.scrollAmount++
        })
    }
    
    ionViewDidEnter(){
        this.content.scrollToBottom(300).then(() =>{
        
        
        })
        this.eventz.subscribe('scrollme', () =>{
            console.log('ok');
            //300ms animation speed
        })
        
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
    
    doInfinite(infiniteScroll){
        console.log('Begin async operation');
        
        setTimeout(() =>{
            // for (let i = 0; i < 30; i++) {
            //     this.items.push(this.items.length);
            // }
            
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    }
    
    showMoreShop(selectedVal){
        
        this.showme = false;
        
        this.selected = selectedVal.id;
        this.showHideShop = true;
        this.shopname = selectedVal.category_name;
        this.subChildShop = selectedVal.sub_categories;
        console.log('printing--->>', this.subChildShop);
        this.subSubChildShop = [];
        
        this.dontShowPlusButtons = false;
        
        if (this.subChildShop == null) {
            this.showHideShopChild = true;
            this.getProductObj.id = selectedVal.id;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildShop = res;
                this.content.resize()
                this.content.scrollToBottom(1000).then(() =>{
                
                })
                
            })
        }
        
    }
    
    showshops(){
        this.showme = true;
        this.showHideShop = false;
        //this.showHideShopChild = false;
    }
    
    showMoreChildShop(selectedVal){
        this.showHideShopChild = true;
        this.subSubChildShop = selectedVal.sub_categories;
        // console.log('showMoreChildBeauty printing--->>', this.subSubChildBeauty);
        
        if (this.subSubChildShop == null) {
            this.getProductObj.id = selectedVal.id;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildShop = res;
            })
        }
    }
    
    goToHistory(){
        console.log('histroy click');
        this.navCtrl.push('Myproject');
    }
    
    
    goBack(){
        this.navCtrl.pop();
    }
    
    summary(){
        this.navCtrl.push('Summary', {cartItems: this.cartItems});
    }
    
    openPagex(subChild){
        this.navCtrl.push('ShopListPage', {
            shopname: subChild.category_name,
            shopobj : subChild,
            id      :''
        });
    }
    getVal(s){
        
        console.log('category id is '+s.id);
        this.navCtrl.push('ShopListPage', {
            shopname: s.category_name,
            shopobj : '',
            id  : s.id
        });
    } 
    goToBottom(){
    
    }
}
