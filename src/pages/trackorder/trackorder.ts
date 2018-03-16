import { Component,ElementRef,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
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

import {Geolocation} from '@ionic-native/geolocation';
import {AllService} from '../../services/all.service';
import { elementAt } from 'rxjs/operator/elementAt';
/**
 * Generated class for the TrackorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-trackorder',
  templateUrl: 'trackorder.html',
})
export class TrackorderPage {

  @ViewChild('map') mapElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  map: any;
  order_id;
  sp_id;
  constructor(public navCtrl: NavController, private geolocation: Geolocation, public navParams: NavParams,private nativeGeocoder: NativeGeocoder,public allService: AllService, public loadingCtrl: LoadingController) {
    let data = this.navParams.get('order_id');
    this.order_id =  data.id;
    this.sp_id = data.sp_id;
    this.get_latlong_provider();


    this.start = data.runner_from;
    this.end   = data.runner_to;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackorderPage');
    this.getCurrentLocation();
    
    // this.timerId = setInterval(() => {
    //   this.get_latlong_provider();
    //   }, 5000);
  }
  lat1;
  long1;
  lat2;
  long2;
  start;
  end;
  timerId:any;
 getCurrentLocation(){
        var posOptions = {
          timeout: 10000, enableHighAccuracy: false
      };
        console.log('API called');
        this.geolocation.getCurrentPosition(posOptions).then((resp) => {
  
          this.lat1 = resp.coords.latitude;
          this.long1= resp.coords.longitude;
          this.initMap();
          this.calculateAndDisplayRoute();
              // this.nativeGeocoder.reverseGeocode(this.lat1, this.long1)
              // .then((result: NativeGeocoderReverseResult) => {            
              //   console.log(JSON.stringify(result));
              //   console.log(result);
              //   this.start = result.subLocality +','+result.locality+','+result.postalCode +','+result.thoroughfare;
                
              //   console.log(this.start);
              //   this.initMap();
              //   // this.calculateAndDisplayRoute();
              //   // this.get_latlong_provider();

                this.timerId = setInterval(() => {
                  this.get_latlong_provider();
                  }, 5000);

              // })
              // .catch((error: any) => console.log(error));

                
                // this.allService.getCurrentAddress(this.lat1, this.long1)
                //   .then(data => {
                //     // alert.dismiss();
                //     var addResponse = (JSON.parse(data['_body']).results[0]);
                //     if(addResponse != undefined){
                //       // var addressComponents = JSON.parse(data['_body']).results[0].address_components;
                //       this.start=JSON.parse(data['_body']).results[0].formatted_address;
                //       this.initMap();

                //       // this.timerId = setInterval(() => {
                //       //       this.get_latlong_provider();
                //       //       }, 5000);
                //     }
            
                //   }).catch((error)=>{
                  
                //   });
            
        }).catch((error) => {
          console.log('Error getting location', error);
        });
      }
 show:boolean;
 km :any;

 ionViewDidLeave() {
  //Stop refresh
  clearTimeout(this.timerId);
  }

 goBack(){
   this.navCtrl.pop();
 }
get_latlong_provider(){
  var data ={
    method : 'get_provider_latlong',
    order_id:this.order_id
  }
  const loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  // loading.present();

  this.allService.login(data).subscribe(res =>{
    console.log(res);
    
    if(res.status == 0){
      this.show = false;
      var data = {
        method : 'get_provider_address',
        sp_id  : this.sp_id
      }
      this.allService.login(data).subscribe(res =>{
        console.log(res);
        let addr = res.detail[0];
        let realaddr =addr.business_address+','+addr.business_city+','+addr.business_postcode;
        this.nativeGeocoder.forwardGeocode(realaddr)
        .then((coordinates: NativeGeocoderForwardResult) => {
            this.lat2 = coordinates.latitude;
            this.long2 = coordinates.longitude;
            console.log('The coordinates are latitude='+coordinates);
        })
        .catch((error: any) => console.log(error));
      });

    }else{
      this.show = true;
      let latlong = res.details[0].latlong;
      let data = latlong.split(',');
      
      this.lat2 =  data[0];
      this.long2 = data[1];
      
      // this.km = this.getDistanceFromLatLonInKm(this.lat1,this.long1,this.lat2,this.long2);

      // this.allService.getCurrentAddress(this.lat2, this.long2)
      // .then(data => {
      //   var addResponse = (JSON.parse(data['_body']).results[0]);
      //   if(addResponse != undefined){

      //     this.end=JSON.parse(data['_body']).results[0].formatted_address;
      //     this.calculateAndDisplayRoute();
      //   }
      // }).catch((error)=>{
      //   console.log(error);
      // });
      var i;
      var infowindow = new google.maps.InfoWindow();
      var image = 'http://www.huallow.com/helpy/man.png';
        setTimeout(() => {
          var marker = new google.maps.Marker({                
            position: {lat: parseFloat(this.lat2), lng: parseFloat(this.long2)},  /* new google.maps.LatLng(locations[i][1], locations[i][2]),*/
            map: this.map,
            icon: image
          });
       
          // set on click name  
          // let name  = this.locations[i]['username'];
          google.maps.event.addListener(marker, 'click', function(marker, i) {
                      // infowindow.setContent(name);
                      infowindow.open(this.map, marker);
              }
          );
        }, 1000);
    }
});
}

initMap() {
  this.map = new google.maps.Map(this.mapElement.nativeElement, {
    zoom: 10,
    center: {lat: this.lat1, lng: this.long1}
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
}
}
