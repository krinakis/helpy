import {Component, ElementRef, Renderer, ViewChild} from '@angular/core';
import {Content, IonicPage, LoadingController, NavController, NavParams, Slides} from 'ionic-angular';
import {AllService} from '../../services/all.service';

declare var google;

@IonicPage() @Component({
    selector   : 'page-service',
    templateUrl: 'service.html',
})
export class Service {
    
    //Check these variables and remove which are not in use
    showPrev: any;
    showNext: any;
    currentIndex: any;
    
    currentNumber = 0;
    currentNumber1 = 0;
    currentNumberMassage = 0;
    // currentBathroom = 0;
    //currentOther = 0;
    location: any;
    showHide2: boolean;
    showGlam: boolean;
    product: any;
    showAuto: boolean;
    showSend: boolean;
    showShops: boolean;
    
    dontShowPlusButtons: boolean;
    isAddButton: boolean;
    
    
    getProductObj = {
        method: 'get_products',
        id    : '',
    }
    
    
    @ViewChild(Content) content: Content;
    @ViewChild('mySlider') slider: Slides;
    
    //These are final and working variables dont change or deleted them.
    slidertab: any;
    SubMenuClean = [];
    subChildClean = [];
    showHideClean: boolean;
    showHideCleanChild: boolean;
    subSubChildClean = [];
    
    SubMenuMassage = [];
    subChildMassage = [];
    showHideMassage: boolean;
    showHideMassageChild: boolean;
    subSubChildMassage = [];
    
    SubMenuBeauty = [];
    subChildBeauty = [];
    showHideBeauty: boolean;
    showHideBeautyChild: boolean;
    subSubChildBeauty = [];
    
    SubMenuShop = [];
    subChildShop = [];
    showHideShop: boolean;
    showHideShopChild: boolean;
    subSubChildShop = [];
    
    SubMenuAuto = [];
    subChildAuto = [];
    showHideAuto: boolean;
    showHideAutoChild: boolean;
    subSubChildAuto = [];
    
    subMenuRunner = [];
    subChildRunner = [];
    showHideRunner: boolean;
    showHideRunnerChild: boolean;
    subSubChildRunner = [];
    
    
    inHouseService = [];
    allCategorys: any;
    
    //unUsess Vriable need to be removed !
    // SubMenuMassage: any;
    //subChildMassage:any;
    //showHideMassage:boolean;
    //SubMenuShop:any;
    //subChildShop:any;
    //categorys: any;
    
    
    price: any;
    cartItems = [];
    
    productList: any;
    
    
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public allService: AllService, public loadingCtrl: LoadingController, private render: Renderer){
        
        this.showHideClean = false;
        
        this.showHideMassage = false;
        this.showHideMassageChild = false;
        
        this.showShops = false;
        this.showHideCleanChild = false;
        
        this.showHideBeauty = false;
        this.showHideBeautyChild = false;
        
        this.showHideShop = false;
        this.showHideShopChild = false;
        
        this.showHideAuto = false;
        this.showHideAutoChild = false;
        
        
        this.showHideRunnerChild = false;
        
        this.showHide2 = false;
        this.showGlam = false;
        this.showSend = true;
        this.price = 0;
        
        this.isAddButton = false;
        this.dontShowPlusButtons = false;
        
        let id = this.navParams.get("id");
        this.slidertab = id;
        console.log("id", id);
        setTimeout(() =>{
            this.goToSlide(id);
            
        }, 500)
    }
    
    
    ionViewDidLoad(){
        this.loadMap();
        console.log('ionViewDidLoad Service');
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        
        this.allService.getcategories().subscribe(res =>{
            
            console.log(res);
            this.allCategorys = res;
            this.SubMenuClean = res[0].sub_categories;
            this.SubMenuMassage = res[1].sub_categories;
            this.SubMenuAuto = res[2].sub_categories;
            this.subMenuRunner = res[3].sub_categories;
            
            this.SubMenuBeauty = res[4].sub_categories;
            this.SubMenuShop = res[5].sub_categories;
            
            // console.log("here goes SubMenuClean", this.SubMenuClean);
            // console.log("here goes SubMenuMassage", this.SubMenuMassage);
            // console.log("yuvam sir result--->>>", this.allCategorys);
            // console.log("here goes Beauty result-->>",this.SubMenuBeauty);
            // console.log("here goes SubMenuShop--->>",this.SubMenuShop);
            console.log("here goes allCategorys--->>", this.allCategorys);
            
            loading.dismiss(() =>{
                console.log('Dismissed loading');
            });
            
        });
    }
    
    
    add(selectedVal){
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
    
    
    showMore(selectedVal){
        this.showHideClean = true;
        this.subChildClean = selectedVal.sub_categories;
        console.log('printing--->>', this.subChildClean);
        this.subSubChildClean = [];
        this.dontShowPlusButtons = false;
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
        
        // this.allService.get_products(this.getProductObj).subscribe(res => {
        //   console.log("here is my all product list", res);
        //   this.subSubChildClean = res;
        // })
        
        
        console.log('subSubChildClean printing--->>', selectedVal);
    }
    
    addThisItem(event: any, selectedVal){
        
        let classList = event.target.classList;
        
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
    
    
    showMoreMassage(selectedVal){
        this.showHideMassage = true;
        this.subChildMassage = selectedVal.sub_categories;
        console.log('printing--->>', this.subChildMassage);
        this.subSubChildMassage = [];
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
    
    showMoreBeauty(selectedVal){
        this.showHideBeauty = true;
        this.subChildBeauty = selectedVal.sub_categories;
        console.log('printing--->>', this.subChildBeauty);
        this.subSubChildBeauty = [];
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
    
    showMoreShop(selectedVal){
        this.showHideShop = true;
        this.subChildShop = selectedVal.sub_categories;
        console.log('printing--->>', this.subChildShop);
        this.subSubChildShop = [];
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
    
    showMoreAuto(selectedVal){
        this.showHideAuto = true;
        this.subChildAuto = selectedVal.sub_categories;
        console.log('printing--->>', this.subChildAuto);
        this.subSubChildAuto = [];
    }
    
    showMoreChildAuto(selectedVal){
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
    
    showMoreRunner(selectedVal){
        this.showHideRunnerChild = true;
        this.subSubChildRunner = selectedVal.sub_categories;
        
        if (this.subSubChildRunner == null) {
            this.getProductObj.id = selectedVal.id;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildRunner = res;
            })
        }
        
        console.log('showMoreChildBeauty printing--->>', this.subSubChildRunner);
    }
    
    
    // addToCart(value) {
    //   console.log("Selected value", value);
    //   console.log(value.product_price);
    //   this.price = this.price + value.product_price;
    //   this.cartItems.push(value);
    //   console.log(this.cartItems);
    // }
    
    loadMap(){
        
        let latLng = new google.maps.LatLng(3.127887, 101.594489);
        let mapOptions = {
            center   : latLng,
            zoom     : 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }
    
    addMarker(){
        let marker = new google.maps.Marker({
            map      : this.map,
            animation: google.maps.Animation.DROP,
            position : this.map.getCenter()
        });
        let content = "<h4>Information!</h4>";
        this.addInfoWindow(marker, content);
    }
    
    
    addInfoWindow(marker, content){
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', () =>{
            infoWindow.open(this.map, marker);
        });
    }
    
    
    goToSlide(id){
        this.slider.slideTo(id, 500);
    }
    
    slideChanged(){
        let currentIndex = this.slider.getActiveIndex();
        
        this.slidertab = currentIndex;
        console.log("Current index is", currentIndex);
        
        console.log("within if ... current index not matched")
        this.price = 0;
        this.cartItems = [];
        
        
        this.subChildClean = [];
        this.subSubChildClean = [];
        this.showHideCleanChild = false;
        
        this.subChildMassage = [];
        this.subSubChildMassage = [];
        this.showHideMassageChild = false;
        
        this.subChildAuto = [];
        this.subSubChildAuto = [];
        this.showHideAutoChild = false;
        
        this.subChildBeauty = [];
        this.subSubChildBeauty = [];
        this.showHideBeautyChild = false;
        
        this.subChildShop = [];
        this.subSubChildShop = [];
        this.showHideShopChild = false;
        
        this.subChildRunner = [];
        this.showHideRunnerChild = false;
        
    }
    
    // showShopList(selectedVal){
    //   this.showShops = !this.showShops;
    //     //this.showHideClean = true;
    //     console.log("here is Show Shop valueeeeee",selectedVal);
    //     // this.SubMenu.forEach(category => console.log( this.categorys.Massage[selectedVal])); //ngFor
    //     this.SubMenuShop.forEach(category => this.subChildShop = this.categorys.Shop[selectedVal]); //ngFor
    //     console.log("Printing value of SubMenuShop", this.subChildShop);
    // }
    
    
    summary(){
        this.navCtrl.push('Summary', {cartItems: this.cartItems});
    }
    
    orderInfo(){
        this.navCtrl.push('orderInfo', {
            cartItems : this.cartItems,
            totalPrice: this.price,
            pageToShow: 'C'
        });
    }
    
    orderInfoM(){
        this.navCtrl.push('orderInfo', {
            cartItems : this.cartItems,
            totalPrice: this.price,
            pageToShow: 'M'
        });
    }
    
    showDiv(){
        this.showHide2 = !this.showHide2;
    }
    
    showGlamDiv(){
        this.showGlam = !this.showGlam;
    }
    
    showAutoDiv(){
        this.showAuto = !this.showAuto;
    }
    
    goBack(){
        this.navCtrl.pop();
    }
    
    placeOrder(){
        this.showSend = false;
        
    }
    
    updateSend(){
        this.showSend = true;
    }
    
    goToHistory(){
        console.log('histroy click');
        this.navCtrl.push('Myproject');
    }
    
}
