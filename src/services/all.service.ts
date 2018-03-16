import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';

var config = {
    //serveConnectionString: 'http://doionic.com:3000/api/'
    serveConnectionString: 'http://www.huallow.com/helpy/Restapi'
}

@Injectable()
export class AllService {
    address: any;
    items: any;
    
    constructor(private http: Http){
        console.log('All Service initiated');
    }
    
    
    //PHP APIs getter setter local value
    setaddress(dt: any){
        this.address = dt;
    }
    
    getaddress(){
        return this.address;
    }
    
    setitems(dt: any){
        this.items = dt;
        console.log(this.items)
    }
    
    filterItems(searchTerm){
        console.log(searchTerm);
        return this.items.filter((item) =>{
            return item.category_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
        
    }
    
    filterItemsproduct(searchTerm){
        console.log(searchTerm);
        return this.items.filter((item) =>{
            return item.product_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
        
    }

    getcategories(){
        console.log("Calling getcategories API");
        var headers = new Headers();
        var data = null;
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '?method=getcategories', data).map(res => res.json());
    }
    
    getbanners(){
        console.log("Calling getbanners API");
        var headers = new Headers();
        var data = null;
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '?method=get_media', data).map(res => res.json());
    }
    
    getrootcategories(){
        console.log("Calling getrootcategories API");
        var headers = new Headers();
        var data = null;
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '?method=getrootcategories', data).map(res => res.json());
    }
    
    signup(data){
        var headers = new Headers();
        // var data = null;
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    login(data){
        var headers = new Headers();
        // var data = null;
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    fb_login(data){
        var headers = new Headers();
        // var data = null;
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    call_noti(data){
        var headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization','Basic ZTEyMGEzYjEtODBhYi00YTI3LTgzN2QtYTU5NzU0ODQxMWEz');
        return this.http.post('https://onesignal.com/api/v1/notifications', data).map(res => res.json());
    }
    validateuser(data){
        var headers = new Headers();
        // var data = null;
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    active_account(data){
        var headers = new Headers();
        // var data = null;
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    generateotpno(data){
        var headers = new Headers();
        // var data = null;
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    forgotpassword(data){
        var headers = new Headers();
        // var data = null;
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    updateprofile(data){
        var headers = new Headers();
        // var data = null;
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    sendchat(data){
        var headers = new Headers();
        // var data = null;
        console.log('sendchat: ', data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    get_products(data){
        var headers = new Headers();
        // var data = null;
        headers.append('Content-type', 'application/json');
        console.log('get_products: ', data, headers, config.serveConnectionString + '/', data)
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    get_chats(data){
        var headers = new Headers();
        // var data = null;
        headers.append('Content-type', 'application/json');
        console.log('get_chats: ', data, headers, config.serveConnectionString + '/', data)
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
     getCurrentAddress(lat, long) {
        return new Promise(resolve => {
          this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true&key=AIzaSyCd2J0WEwjNV1oyQI2fiHQSKxTOK0Vx9Qo').subscribe(data => {
    
            resolve(data);
          }, err => {
            console.log(err);
          });
        });
      }
      searchItemMall(data){
        var headers = new Headers();
        // headers.append('Content-type', 'application/json');
        
        return this.http.post(config.serveConnectionString + '/', data)
        .map(
        result =>
        {
            return result.json()
            .filter(item => item.category_name.toLowerCase().startsWith(data.search.toLowerCase()) )
        });    
    }
      savefeedback(data){

        var headers = new Headers();
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
        
    }
     get_city(data){
        console.log("Calling getcategories API");
        var headers = new Headers();
        // var data = null;
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    get_radius(data){   
        console.log("Calling getcategories API");
        var headers = new Headers();
        // var data = null;
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    regenerateotp(data){
        var headers = new Headers();
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    
    get_default_address(data){
        var headers = new Headers();
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    update_default_address(data){
        var headers = new Headers();
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    
    set_default_address(data){
        var headers = new Headers();
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    remove_address(data){
        var headers = new Headers();
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    update_address(data){
        var headers = new Headers();
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    get_address(data){
        var headers = new Headers();
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    save_orders(data){
        var headers = new Headers();
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    get_orders(data){
        var headers = new Headers();
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }
    
    cencel_orders(data){
        var headers = new Headers();
        console.log(data);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + '/', data).map(res => res.json());
    }

    
    // http://www.huallow.com/helpy/Restapi?method=login&password=&matchdata=
    // http://www.huallow.com/helpy/Restapi?method=signup&mobile&email&fullname&password
    // http://www.huallow.com/helpy/Restapi?method=getrootcategories    
    // http://www.huallow.com/helpy/Restapi?method=active_account&mobile&email&fullname&password&usertype
    
    //Node APIs----
    
    getAllServices(){
        var headers = new Headers();
        var data = null;
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + 'services/getAllServices', data).map(res => res.json());
    }
    
    updateAddress(updatedInfo){
        var headers = new Headers();
        console.log("Recived value at service is", updatedInfo);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + 'services/updateAddress', updatedInfo).map(res => res.json());
        //Dont Stringfy that variable, You will not reieve that varibale..
    }
    
    updateProfile(updatedProfile){
        var headers = new Headers();
        console.log("Recived Value at service is", updatedProfile);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + 'services/updateProfile', updatedProfile, {headers: headers}).map(res => res.json());
        //Dont Stringfy that variable, You will not reieve that varibale..
    }
    
    getUsersInfo(userId){
        var headers = new Headers();
        console.log("here goes userID --->", userId);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + 'services/getUsersInfo', userId, {headers: headers}).map(res => res.json());
    }
    
    
    saveOrders(orders){
        var headers = new Headers();
        console.log("Recived value at service is", orders);
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + 'services/saveOrders', orders, {headers: headers}).map(res => res.json());
    }
    
}
