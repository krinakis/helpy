import {Component, Renderer,ElementRef,ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
// import {
//     Geocoder, GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, LatLng, Marker, MarkerOptions
// } from '@ionic-native/google-maps';
import {
    Geocoder,
    LatLng,
    MarkerOptions,
    GoogleMapOptions,
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    Marker,
    GoogleMapsAnimation,
    MyLocation
  } from '@ionic-native/google-maps';
import {Events, IonicPage, LoadingController, NavController, NavParams,AlertController} from 'ionic-angular';
import {AllService} from '../../services/all.service';
import { NativeGeocoder,  NativeGeocoderForwardResult  } from '@ionic-native/native-geocoder';
import { empty } from 'rxjs/observable/empty';
import {LocationAccuracy} from '@ionic-native/location-accuracy';

declare var google;

@IonicPage() @Component({
    selector   : 'page-runner',
    templateUrl: 'runner.html',
})


   
export class RunnerPage {
    
    @ViewChild('map') mapElement1: ElementRef;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;


    
    map: any;
    mapx: GoogleMap;
    mapElement: HTMLElement;
    subMenuRunner = [];
    subChildRunner = [];
    showHideRunner: boolean;
    showHideRunnerChild: boolean;
    subSubChildRunner = [];
    showSend: boolean;
    enableNextBtn: boolean;
    hideNextBtn: boolean;
    latitudes: any;
    longitudes: any;
    latitude: any;
    longitude: any;
    latitude1: any;
    longitude1: any;
    tapshow: boolean;
    tapshow1: boolean;
    selects: any;
    acService: any;
    fes: any;
    fes2: any;
    subSubs = {};
    
    
    autocompleteItems: any;
    autocompleteItems1: any;
    autocomplete: any;
    autocomplete1: any;
    
    getProductObj = {
        method: 'get_products',
        id    : '',
    }
    
    price: any;
    cartItems = [];
    
    start:any;
    end:any;
    toshow:boolean;
    km:any;
    checkbox;
    miter:any;
    second:any;
    mul:any;
    no:number;
    constructor(private geocode: Geocoder, private event: Events, public navCtrl: NavController, public navParams: NavParams, public allService: AllService, public loadingCtrl: LoadingController, private render: Renderer, private googleMaps: GoogleMaps, private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder, public alertCtrl: AlertController, private locationAccuracy: LocationAccuracy){
        this.toshow=false;
        this.acService = new google.maps.places.AutocompleteService();
        this.showSend = true;
        this.price = 0;
        this.enableNextBtn = false;
        this.hideNextBtn = false;
        this.autocompleteItems = [];
        this.autocompleteItems1 = [];
        this.autocomplete = {
            query: ''
        };
        this.no = 0;
        this.autocomplete1 = {
            query: ''
        };
        this.checkbox=false;
        this.subSubs = {
            'qty': 0
        }
    }
    
    ionViewDidLoad(){


        this.locationAccuracy.canRequest().then((canRequest: boolean) =>{
            
            if (canRequest) {
                // the accuracy option will be ignored by iOS
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then((res) =>{
                    console.log('hghgh');
                }, (err) =>{
                console.log(err);
                
                });
            }
            
        });

        // this.initMap();
        localStorage.setItem('service_type','runner');
        this.getCurrentLocation();
        this.disablepm = true;
    this.start = 'ahmedabad';
    this.end = 'surat';

        this.geolocation.getCurrentPosition({
            
            enableHighAccuracy: true,
            
        }).then((resp) =>{
            this.latitudes = resp.coords.latitude;
            this.longitudes = resp.coords.longitude;
            // this.loadMap(this);
        })
        console.log('ionViewDidLoad Runner Service');
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        
        this.allService.getcategories().subscribe(res =>{
            console.log(res);
            this.subMenuRunner = res[3].sub_categories;
            loading.dismiss(() =>{
                console.log('Dismissed loading');
            });
        });
    }
        // loadMap() {
    //   let latLng = new google.maps.LatLng(3.127887, 101.594489);
    //   let mapOptions = {
    //     center: latLng,
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   }
    //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // }
    
    // loadMap(env){
    //     console.log(env);
    //     this.mapElement = document.getElementById('map');
        
    //     let mapOptions: GoogleMapOptions = {
    //         camera: {
    //             target: {
    //                 lat: env.latitudes,
    //                 lng: env.longitudes
    //             },
    //             zoom  : 17,
    //             tilt  : 30
    //         }
    //     };
        
    //     this.mapx = this.googleMaps.create(this.mapElement, mapOptions);
        
    //     // Wait the MAP_READY before using any methods.
    //     this.mapx.one(GoogleMapsEvent.MAP_READY).then(() =>{
    //         console.log('Map is ready!');
            
    //         let lat;
    //         let long;
            
    //         let coordinates: LatLng = new LatLng(this.latitudes, this.longitudes);
            
    //         let position = {
    //             target : coordinates,
    //             zoom   : 17,
    //             tilt   : 60,
    //             bearing: 140
    //         };
    //         this.mapx.animateCamera(position);
            
    //         let markerOptions: MarkerOptions = {
    //             position: coordinates, //icon: "assets/images/icons8-Marker-64.png",
    //             title   : 'Our first POI'
    //         };
            
    //         const marker = this.mapx.addMarker(markerOptions).then((marker: Marker) =>{
    //             marker.showInfoWindow();
    //             marker.setVisible(true);
    //         });
            
            
    //         var arr;
    //         this.event.subscribe('holu', () =>{
                
    //             let latlang = [];
    //             if (this.latitude) {
    //                 latlang.push({
    //                     'lat'  : this.latitude,
    //                     'lng'  : this.longitude,
    //                     'title': 'from'
    //                 });
    //             }
                
    //             if (this.latitude1) {
    //                 latlang.push({
    //                     'lat'   : this.latitude1,
    //                     'lng'   : this.longitude1,
    //                     'tittle': 'to'
    //                 });
    //             }
    //             //console.log(latlang);
    //             this.mapx.addPolyline({
    //                 'points': latlang,
    //                 'color' : '#AA00FF'
    //             }).then((polyline) =>{
    //                 //console.log(latlang);
                    
    //                 latlang.forEach((restaurant) =>{
                        
                        
    //                     let coordinates: LatLng = new LatLng(restaurant.lat, restaurant.lng);
                        
    //                     this.mapx.setCameraTarget(restaurant);
                        
                        
    //                     let position = {
    //                         target : coordinates,
    //                         zoom   : 13,
    //                         tilt   : 60,
    //                         bearing: 140
    //                     };
    //                     this.mapx.animateCamera(position);
    //                     //polyline.setPoints(restaurant);
                        
    //                     let markerOptions: MarkerOptions = {
    //                         position: coordinates, //icon: restaurant.iconData,
    //                         title   : restaurant.title
    //                     };
                        
    //                     const marker = this.mapx.addMarker(markerOptions).then((marker: Marker) =>{
    //                         // let customMarker = restaurant.iconData;
    //                         // var icon = {
    //                         //   url: customMarker,
    //                         //   size: {
    //                         //     'width': 40,
    //                         //     'height': 40
    //                         //   }
    //                         // }
    //                         //markerx.setIcon(icon);
    //                         marker.showInfoWindow();
    //                         marker.setVisible(true);
    //                     });
    //                 });
    //             })
    //         })
    //     });
    // }
    
    updateSearch(){
        console.log('hi');
        this.tapshow = true;
        //this.tapshow1 = false;
        console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        let self = this;
        let config = {
            types                : ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
            input                : this.autocomplete.query
            // componentRestrictions: {country: 'MY'}
        }
        this.acService.getPlacePredictions(config, function (predictions, status){
            console.log('modal > getPlacePredictions > status > ', status);
            self.autocompleteItems = [];
            if (predictions) {
                predictions.forEach(function (prediction){
                    self.autocompleteItems.push(prediction);
                });
            }
            
        });
    }
    
    updateSearch1(){
        console.log('hi1');
        this.tapshow1 = true;
        //this.tapshow = false;
        console.log('modal > updateSearch');
        if (this.autocomplete1.query == '') {
            this.autocompleteItems1 = [];
            return;
        }
        let self = this;
        let config = {
            types                : ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
            input                : this.autocomplete1.query
            // componentRestrictions: {country: 'MY'}
        }
        this.acService.getPlacePredictions(config, function (predictions, status){
            console.log('modal > getPlacePredictions > status > ', status);
            self.autocompleteItems1 = [];
            if (predictions) {
                predictions.forEach(function (prediction){
                    self.autocompleteItems1.push(prediction);
                });
            }
            
        });
    }
    lat1;
    lon1;
    lat2;
    lon2;


    // my code for current map
    demolong;
    demolat;
    getCurrentLocation(){
        var posOptions = {
          timeout: 10000, enableHighAccuracy: false
      };
        console.log('API called');
        this.geolocation.getCurrentPosition(posOptions).then((resp) => {
          console.log('API responce came');
          console.log(resp);
          
        //   this.getCurrentAddress(resp.coords.latitude, resp.coords.longitude);
          this.demolat = resp.coords.latitude;
          this.demolong= resp.coords.longitude;

          this.initMap();
        }).catch((error) => {
          console.log('Error getting location', error);
        });
      }
 



    getlocation(addr, num){
        if (num == 'frst') {
            this.tapshow = false;
            this.autocomplete.query = addr;
            this.start = addr;
            // var request = {
            //     'address': addr
            // };
            this.nativeGeocoder.forwardGeocode(this.start)
            .then((coordinates: NativeGeocoderForwardResult) => {
                this.lat1 = coordinates.latitude;
                this.lon1 = coordinates.longitude;
                console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)
            })
            .catch((error: any) => console.log(error));


        } else {
            this.tapshow1 = false;
            this.autocomplete1.query = addr;
            this.end =addr;

            // var request = {
            //     'address': addr
            // };
            this.toshow=true;
            this.nativeGeocoder.forwardGeocode(this.end)
            .then((coordinates: NativeGeocoderForwardResult) => {
                this.lat2 = coordinates.latitude;
                this.lon2 = coordinates.longitude;
                console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)

                this.calculateAndDisplayRoute();
                this.km =  this.getDistanceFromLatLonInKm(this.lat1,this.lon1,this.lat2,this.lon2);
                console.log(this.km);
            })
            .catch((error: any) => {
                console.log(error);
                this.nativeGeocoder.forwardGeocode(this.end)
                .then((coordinates: NativeGeocoderForwardResult) => {
                    this.lat2 = coordinates.latitude;
                    this.lon2 = coordinates.longitude;
                    console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)
    
                    this.calculateAndDisplayRoute();
                    this.km =  this.getDistanceFromLatLonInKm(this.lat1,this.lon1,this.lat2,this.lon2);
                    console.log(this.km);
                })
                .catch((error: any) => {
                    console.log(error);
                });
            });

        }
        
       
        // this.geocode.geocode(request).then((res) =>{
        //     if (res) {
                
        //         var lt = res[0].position.lat;
        //         var ln = res[0].position.lng;
        //         if (num == 'frst') {
        //             this.fes = res;
        //             this.latitude = lt;
        //             this.longitude = ln;
        //             this.event.publish('holu');
        //         } else {
        //             this.fes2 = res;
        //             this.latitude1 = lt;
        //             this.longitude1 = ln;
                    
        //             this.event.publish('holu');
        //         }
                
                
        //     }
            
        // });
    }
    
    // addMarker() {
    //   let marker = new google.maps.Marker({
    //     map: this.map,
    //     animation: google.maps.Animation.DROP,
    //     position: this.map.getCenter()
    //   });
    //   let content = "<h4>Information!</h4>";
    //   this.addInfoWindow(marker, content);
    // }
    
    // addInfoWindow(marker, content) {
    //   let infoWindow = new google.maps.InfoWindow({
    //     content: content
    //   });
    //   google.maps.event.addListener(marker, 'click', () => {
    //     infoWindow.open(this.map, marker);
    //   });
    // }
    
    goBack(){
        this.navCtrl.pop();
    }
    data12;
    selects1 ='';
    showMoreRunner123(value){
        console.log(value);
        this.selects1 = value;
        
        this.cartItems =[];
        this.cartItems.push(value);
        console.log(this.cartItems);
        this.cartItems[0].product_price = parseInt(this.cartItems[0].product_price) + parseInt(this.data12.product_price);

    }
    placeOrder(){
        this.showSend = false;
        this.hideNextBtn = true;
        
        this.miter = this.km;
        if(this.miter > 5)
        {
            this.second = this.miter - 5;
            this.mul = (parseFloat(this.second) * 6.5 +(5*20)); 
            console.log(this.mul);
        }
        else
        {
            this.mul = this.miter * 5;
            console.log(this.mul);
        }
        this.cartItems =[];
        
        this.data12 = {
            qty : 1 ,
            product_price:'' 
        }
        this.data12.product_price   = this.mul;
        this.data12.product_name    = localStorage.getItem('runner_type');
        console.log(this.cartItems);
    }
    
    updateSend(){
        this.showSend = true;
        this.enableNextBtn = true;
        this.hideNextBtn = false;
    }
    
    goToHistory(){
        console.log('histroy click');
        this.navCtrl.push('Myproject');
    }
    workershowhide:boolean;
    showMoreRunner(selectedVal){
        
        //let classList = event.target.classList;
        this.enableNextBtn = true;
        this.showHideRunnerChild = true;
        this.subSubChildRunner = selectedVal.sub_categories;
        this.selects = selectedVal;
        console.log(this.selects);
        this.selects1 ='';
        console.log(this.subSubChildRunner);
        
        // if (classList.contains("btnAdd")) {
        //   console.log("Foudddd");
        //   event.preventDefault();
        //   this.render.setElementClass(event.target, "btnAdd", false);
        
        // }
        // else {
        //   event.preventDefault();
        //   this.render.setElementClass(event.target, "btnAdd", true);
        // }
        localStorage.setItem('runner_type',this.selects.category_name);
        this.workershowhide = true;
        if(this.selects.category_name == 'Moto'){
            this.workershowhide = false;
        }
        
        if (this.subSubChildRunner == null) {    
            this.getProductObj.id = selectedVal.id;
            this.allService.get_products(this.getProductObj).subscribe(res =>{
                console.log("here is my all product list", res);
                this.subSubChildRunner = res;
                if(res !=''){
                    this.twohideshow = true;
                }else{
                    this.twohideshow = false;
                }
                console.log(this.twohideshow);
                
            })
        }
        
        console.log('showMoreChildBeauty printing--->>', this.subSubChildRunner);
    }
    twohideshow:boolean;
    add(selectedVal){
        console.log("selectd value is--", selectedVal)
        let index = this.cartItems.indexOf(selectedVal);
        console.log('Addtion ---- found', index);
        if (index == -1) {
            selectedVal.qty++
            selectedVal.product_name = localStorage.getItem('runner_type');
            selectedVal.product_price = 10;
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
    
    adds(selectedVal){
        // selectedVal.product_name = localStorage.getItem('runner_type');
        console.log("selectd value is--", selectedVal);

        this.no++;
        // let index = this.cartItems.indexOf(selectedVal);
        // console.log('Addtion ---- found', index);
        // if (index == -1) {
        //     // selectedVal.qty++
        //     // selectedVal.product_name = localStorage.getItem('runner_type');
        //     // selectedVal.product_price = 10;
        //     // selectedVal.kmprice = this.mul;
        //     // console.log(selectedVal);
        //     this.data12.wroker = selectedVal.qty++;
        //     // this.cartItems.push(selectedVal);
        // } else {
        //     selectedVal.qty++;
        //     // this.data12.wroker = selectedVal.qty++;
        // }
        
        // this.price = this.price + Number(selectedVal.product_price);
        // console.log("here goes cart Items after add--->>", this.cartItems);
    }
    disablepm:boolean;
    checkbox1(){
        console.log(this.checkbox);
        if(this.checkbox){
            this.disablepm = true;
        }else{
            this.disablepm = false;
        }
        console.log(this.disablepm);
        
    }
    
    subs(selectedVal){
        //console.log(selectedVal.qty);
        console.log("selectd value is--", selectedVal)
        if(this.no > 1){
            this.no--;
        }
        // if (selectedVal.qty != 0) {
        //     selectedVal.qty--;
        //     this.price = this.price - Number(selectedVal.product_price);
            
        //     // let index = this.cartItems.indexOf(selectedVal);
        //     // console.log("this is index of the value in my array--->>", index);
        //     // this.cartItems.splice(index, 1);
        //     selectedVal.kmprice = this.mul;
        //     console.log("here goes cart Items after sub", this.cartItems);

        //     // this.data12.wroker = selectedVal.qty++;
        // } else {
        //     selectedVal.qty = 0;
        //       let index = this.cartItems.indexOf(selectedVal);
        //     console.log("this is index of the value in my array--->>", index);
        //     this.cartItems.splice(index, 1);
        //     // this.data12.wroker = selectedVal.qty++;
        // }
        // selectedVal.product_name = localStorage.getItem('runner_type');
    }
    
    // addThisItem(event: any, selectedVal) {
    
    //       let classList = event.target.classList;
    //       this.enableNextBtn=true;
    
    //       if (classList.contains("btnAdd")) {
    //         console.log("Foudddd");
    //         event.preventDefault();
    //         this.render.setElementClass(event.target, "btnAdd", false);
    //         // this.cartItems.splice(index, 1);
    
    //         let index = this.cartItems.indexOf(selectedVal);
    //         console.log("this is index of the value in my CartItems--->>", index);
    //         this.cartItems.splice(index, 1);
    
    //         this.price = this.price - Number(selectedVal.product_price);
    //         selectedVal.qty--;
    //       }
    //       else {
    //         event.preventDefault();
    //         this.render.setElementClass(event.target, "btnAdd", true);
    
    //         console.log("addthis item too cart", selectedVal);
    //         this.cartItems.push(selectedVal);
    //         this.price = this.price + Number(selectedVal.product_price);
    //         console.log("here goes cart Items", this.cartItems);
    //         selectedVal.qty++;
    //       }
    
    //     }
    locations;
    initMap() {
        this.map = new google.maps.Map(this.mapElement1.nativeElement, {
          zoom: 7,
          center: {lat: this.demolat, lng: this.demolong}
        });
       
        this.directionsDisplay.setMap(this.map);      
      }

      getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        // console.log(d);
        return d;
      }
      
      deg2rad(deg) {
        return deg * (Math.PI/180)
      }

      calculateAndDisplayRoute() {
          
        this.directionsService.route({
          origin: this.start,
          destination: this.end,
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

        var data = {
            method : 'sp_latlong', 
            lattitude:this.lat1,
            longitude:this.lon1
        }

        this.allService.login(data).subscribe((res)=>{
            console.log(res);
            this.locations = res.latlong;
            console.log(this.locations);
            
        })
        setTimeout(()=>{

        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        // var locations = [
        //     ['Bondi Beach', -33.890542, 151.274856, 4],
        //     ['Coogee Beach', -33.923036, 151.259052, 5],
        //     ['Cronulla Beach', -34.028249, 151.157507, 3],
        //     ['Manly Beach', 21.7645, 72.1519, 2]

        //     // ['Maroubra Beach', -33.950198, 151.259302, 1]
        //   ];

        // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        // var image = 'http://www.huallow.com/helpy/greeting-man.png';
        var image = 'http://www.huallow.com/helpy/man.png';
          for (i = 0; i < this.locations.length; i++) {  
            marker = new google.maps.Marker({                
              position: {lat: parseFloat(this.locations[i]['lattitude']), lng: parseFloat(this.locations[i]['longitude'])},  /* new google.maps.LatLng(locations[i][1], locations[i][2]),*/
              map: this.map,
              icon: image
            });
         
            // set on click name  
            let name  = this.locations[i]['username'];
            google.maps.event.addListener(marker, 'click', function(marker, i) {
                        infowindow.setContent(name);
                        infowindow.open(this.map, marker);
                }
            );            
          }
        },1000);
      }


    //   
    // addInfoWindow(marker, content) {
        //   let infoWindow = new google.maps.InfoWindow({
        //     content: content
        //   });
        //   google.maps.event.addListener(marker, 'click', () => {
        //     infoWindow.open(this.map, marker);
        //   });
        // }
      desciption='';
    datamain = [];
    summary(){
        // this.datamain = this.selects1;
        console.log(this.selects1);
        // this.data12.desciption = this.desciption;
        // this.cartItems=[];

        
        // this.cartItems[0].product_name = localStorage.getItem('runner_type');
        console.log(this.cartItems);
        
            // this.data12.worker = this.no;
            console.log(this.checkbox);
            
       
        // this.cartItems.push(this.data12);
        if(this.twohideshow){
            this.cartItems[0].qty = 1;
            this.cartItems[0].desciption = this.desciption;
            this.cartItems[0].runner_from = this.start;
            this.cartItems[0].runner_to = this.end;
            // this.data12.product_price
            
            if(!this.checkbox){
                // this.data12.worker = 0;    
                this.cartItems[0].worker = this.no;
            }
            // this.cartItems[0].product_price = 20 //this.km;

            if(this.selects1 ==''){
                let alert = this.alertCtrl.create({
                    title   : 'Alert!',
                    subTitle: 'Please choose service Above',
                    buttons : ['OK']
                });
                alert.present();
            }else{
                this.navCtrl.push('Summary', {cartItems: this.cartItems});
            }
           
        }else{
            this.navCtrl.push('Summary', {cartItems: this.cartItems});
        }
    }
}
