import {Component, NgZone, ViewChild} from '@angular/core';
import {Diagnostic} from '@ionic-native/diagnostic';
import {Geolocation} from '@ionic-native/geolocation';
import {Geocoder, GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, Marker, MarkerOptions,} from '@ionic-native/google-maps';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
import {NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import {Events, IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {AllService} from '../../services/all.service';

declare var google: any;
declare var cordova: any;
declare var plugin: any;

/**
 * Generated class for the MaplocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage() @Component({
    selector   : 'page-maplocation',
    templateUrl: 'maplocation.html',
})
export class MaplocationPage {
    map: GoogleMap;
    @ViewChild('map') element;
    latitude: any;
    longitudes: any;
    latitudes: any;
    loct: any;
    longitude: any;
    autocompleteItems: any;
    autocomplete: any;
    tapshow: boolean;
    acService: any;
    locating: boolean = false;
    camop: any;
    
    constructor(public navCtrl: NavController, public diagnostic: Diagnostic, public allService: AllService, public plt: Platform, public geolocation: Geolocation, public eventz: Events, public zone: NgZone, private locationAccuracy: LocationAccuracy, private geocode: Geocoder, private googleMaps: GoogleMaps, private nativeGeocoder: NativeGeocoder, public navParams: NavParams, public viewController: ViewController){
        this.tapshow = false;
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
        
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad MaplocationPage');
        // this.plt.ready().then((readySource) => {
        //   this.locacc();
        // });
    }
    
    goBack(){
        this.navCtrl.pop();
    }
    
    checkLocation(){
        let env = this;
        this.plt.ready().then((readySource) =>{
            
            this.diagnostic.isGpsLocationAvailable().then((isAvailable) =>{
                this.geolocation.getCurrentPosition({
                    
                    enableHighAccuracy: true,
                    
                }).then((resp) =>{
                    this.latitudes = resp.coords.latitude;
                    this.longitudes = resp.coords.longitude;
                    this.latitude = resp.coords.latitude;
                    this.longitude = resp.coords.longitude;
                    this.mapcheck(this);
                })
            }, (err) =>{
                this.locacc();
            }).catch((e) =>{
                console.log(e);
                
            });
            
            
        });
    }
    
    locacc(){
        this.locationAccuracy.canRequest().then((canRequest: boolean) =>{
            
            if (canRequest) {
                // the accuracy option will be ignored by iOS
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then((res) =>{
                    this.geolocation.getCurrentPosition({
                        
                        enableHighAccuracy: true,
                        
                    }).then((resp) =>{
                        this.latitudes = resp.coords.latitude;
                        this.longitudes = resp.coords.longitude;
                        this.latitude = resp.coords.latitude;
                        this.longitude = resp.coords.longitude;
                        this.mapcheck(this);
                    })
                }, (err) =>{
                    this.locacc();
                });
            }
            
        });
    }
    
    updateSearch(){
        this.tapshow = true;
        console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        let self = this;
        let config = {
            types                : ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
            input                : this.autocomplete.query,
            componentRestrictions: {country: 'MY'}
        }
        this.acService.getPlacePredictions(config, function (predictions, status){
            console.log('modal > getPlacePredictions > status > ', status);
            self.autocompleteItems = [];
            predictions.forEach(function (prediction){
                self.autocompleteItems.push(prediction);
            });
        });
    }
    
    getlocation(addr){
        this.tapshow = false;
        this.autocomplete.query = addr;
        var request = {
            'address': addr
        };
        this.locating = true;
        this.geocode.geocode(request).then((res) =>{
            if (res) {
                console.log(res);
                console.log(res[0].position);
                console.log(res[0].adminArea);
                var lt = res[0].position.lat;
                var ln = res[0].position.lng;
                this.latitude = lt;
                this.longitude = ln;
                this.latitudes = lt;
                this.longitudes = ln;
                this.camop = {
                    target : res[0].position,
                    zoom   : 17,
                    tilt   : 60,
                    bearing: 140
                };
                this.map.animateCamera(this.camop).then(() =>{
                    var GOOGLEx = {
                        lat: lt,
                        lng: ln
                    };
                    
                    this.map.setCameraTarget(GOOGLEx);
                    this.nativeGeocoder.reverseGeocode(lt, ln).then((result: NativeGeocoderReverseResult) =>{
                        console.log(result);
                        console.log('The address is ' + (result.locality ? result.locality : '') + 'pin ' + result.postalCode + 'area ' + (result.subLocality ? result.subLocality : '') + (result.administrativeArea ? result.administrativeArea : '') + ' in ' + result.countryCode);
                        this.zone.run(() =>{
                            this.loct = (result.locality ? result.locality : '') + ', ' + result.postalCode + ', ' + (result.subLocality ? result.subLocality : '') + (result.administrativeArea ? result.administrativeArea : '') + ',' + result.countryCode;
                            //this.headershow = true;
                            // this.showsearch();
                            this.allService.setaddress(this.loct);
                            this.locating = false;
                        });
                        
                        this.map.set('addr', this.loct);
                    }).catch((error: any) => console.log(error));
                    
                });
            }
            
        });
    }
    
    close(){
        this.viewController.dismiss();
    }
    
    ngAfterViewInit(){
        // this.locacc();
        
        this.plt.ready().then(() =>{
            this.geolocation.getCurrentPosition({
                
                enableHighAccuracy: true,
                
            }).then((resp) =>{
                this.latitudes = resp.coords.latitude;
                this.longitudes = resp.coords.longitude;
                this.latitude = resp.coords.latitude;
                this.longitude = resp.coords.longitude;
                this.mapcheck(this);
            })
        });
    }
    
    initMap(){
        
        let map: GoogleMap = GoogleMaps.create(this.element.nativeElement);
        
        map.one(GoogleMapsEvent.MAP_READY).then((data: any) =>{
            
            let coordinates: LatLng = new LatLng(33.6396965, -84.4304574);
            
            let position = {
                target: coordinates,
                zoom  : 17
            };
            
            map.animateCamera(position);
            
            let markerOptions: MarkerOptions = {
                position: coordinates,
                icon    : "assets/images/icons8-Marker-64.png",
                title   : 'Our first POI'
            };
            
            const marker = map.addMarker(markerOptions).then((marker: Marker) =>{
                marker.showInfoWindow();
            });
        })
    }
    
    mapcheck(envx){
        console.log('mapcheck');
        
        let env = envx;
        let style = [];
        
        
        this.map = GoogleMaps.create(this.element.nativeElement, {
            
            
            'controls': {
                'compass'         : true,
                'myLocationButton': true,
                'indoorPicker'    : true,
                
            },
            'gestures': {
                'scroll': true,
                'tilt'  : true,
                'rotate': true,
                'zoom'  : true
            },
            'camera'  : {
                'zoom': 17
            }
        });
        
        
        this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) =>{
            
            let lat;
            let long;
            console.log(this.latitude);
            this.map.setClickable(true);
            // this.eventz.subscribe('sidebar:open', () => {
            //   console.log('echo ok sidbar open');
            //   this.map.setClickable(false);
            // });
            
            // this.eventz.subscribe('sidebar:close', () => {
            //   this.map.setClickable(true)
            //   console.log('echo ok sidbar open');
            // });
            let coordinates: LatLng = new LatLng(this.latitudes, this.longitudes);
            
            let position = {
                target: coordinates,
                zoom  : 17
            };
            this.map.moveCamera(position);
            
            let markerOptions: MarkerOptions = {
                position: coordinates,
                title   : 'Your Here'
            };
            
            const marker = this.map.addMarker(markerOptions).then((marker: Marker) =>{
                marker.showInfoWindow();
                marker.setVisible(false);
                this.eventz.subscribe('holu', () =>{
                    //console.log(coordinates);
                    marker.setPosition(coordinates);
                    this.nativeGeocoder.reverseGeocode(lat, long).then((result: NativeGeocoderReverseResult) =>{
                        console.log(result);
                        console.log('The address is ' + (result.locality ? result.locality : '') + 'pin ' + result.postalCode + 'area ' + (result.subLocality ? result.subLocality : '') + (result.administrativeArea ? result.administrativeArea : '') + ' in ' + result.countryCode);
                        this.zone.run(() =>{
                            this.loct = (result.locality ? result.locality : '') + ', ' + result.postalCode + ', ' + (result.subLocality ? result.subLocality : '') + (result.administrativeArea ? result.administrativeArea : '') + ',' + result.countryCode;
                            //this.headershow = true;
                            this.allService.setaddress(this.loct);
                        });
                        
                        this.map.set('addr', this.loct);
                    }).catch((error: any) => console.log(error));
                })
                // marker.setPosition
            });
            this.map.addEventListener(GoogleMapsEvent.CAMERA_MOVE_START).subscribe((data) =>{
                
                console.log(data[0].target);
                
                // this.headershow = true;
                this.zone.run(() =>{
                    console.log('movingstart');
                    // this.headershow = true;
                    this.latitudes = data[0].target.lat;
                    this.longitudes = data[0].target.lng;
                })
                //  console.log(this.headershow);
                coordinates = new LatLng(data[0].target.lat, data[0].target.lng)
                
                this.onDeviceNotSupported();
            }, () =>{
            
            })
            // this.map.addEventListener(GoogleMapsEvent.MAP_CLICK).subscribe((data) => {
            
            //   console.log(data[0].target)
            //   coordinates = new LatLng(data[0].target.lat, data[0].target.lng)
            //   console.log('hghghghghg')
            //   this.newtry();
            // }, () => {
            
            // })
            // this.map.addEventListener(GoogleMapsEvent.CAMERA_MOVE).subscribe((data) => {
            
            //   // this.zone.run(() => {
            //   //   console.log('moving......');
            //   //   this.headershow = false;
            //   // })
            
            //   // console.log(this.headershow);
            //   // console.log(data[0].target)
            //   lat = data[0].target.lat;
            //   long = data[0].target.lng;
            //   coordinates = new LatLng(data[0].target.lat, data[0].target.lng)
            //   //this.onDeviceNotSupported();
            // }, () => {
            
            // })
            
            this.map.addEventListener(GoogleMapsEvent.CAMERA_MOVE_END).subscribe((data) =>{
                this.zone.run(() =>{
                    console.log('end');
                    //   this.headershow = false;
                    this.latitudes = data[0].target.lat;
                    this.longitudes = data[0].target.lng;
                })
                // if (this.searchshow) {
                //  this.searchshow = false;
                //this.map.setClickable(false);
                this.eventz.publish('sidebar:open');
                // }
                console.log(data[0].target)
                coordinates = new LatLng(data[0].target.lat, data[0].target.lng)
                lat = data[0].target.lat;
                long = data[0].target.lng;
                env.onARExperienceLoadedSuccessful();
                
                
            }, () =>{
            
            })
            this.eventz.subscribe('sidebar:open', () =>{
                console.log('echo ok sidbar open');
                //this.map.setClickable(false);
            });
            
            this.eventz.subscribe('sidebar:close', () =>{
                this.map.setClickable(true)
            });
            this.nativeGeocoder.reverseGeocode(this.latitudes, this.longitudes).then((result: NativeGeocoderReverseResult) =>{
                console.log(result);
                console.log('The address is ' + (result.locality ? result.locality : '') + ',' + result.postalCode + ',' + (result.subLocality ? result.subLocality : '') + (result.administrativeArea ? result.administrativeArea : '') + ' in ' + result.countryCode);
                this.zone.run(() =>{
                    this.loct = (result.locality ? result.locality : '') + ', ' + result.postalCode + ', ' + (result.subLocality ? result.subLocality : '') + (result.administrativeArea ? result.administrativeArea : '') + ',' + result.countryCode;
                    //this.headershow = true;
                    this.allService.setaddress(this.loct);
                });
                
                this.map.set('addr', this.loct);
            }).catch((error: any) => console.log(error));
        })
    }
    
    onDeviceNotSupported(){
        
        console.log('device not supported');
        //this.Username = 'hgggggghghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'
        this.eventz.publish('holu');
        // this.events.publish('dragon');
    }
    
    onARExperienceLoadedSuccessful(){
        console.log('good load')
        
        this.eventz.publish('holu');
        // this.events.publish('dragend');
        // this.Username = 'fdjgsdhfgshgfjgsfshd'
    }
    
    goback(){
        this.eventz.publish('getaddress');
        this.navCtrl.pop();
    }
}
