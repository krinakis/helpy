'use strict';
//var Encrypt = require('jsencrypt.min')
import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';

var config = {
    serveConnectionString: 'http://www.huallow.com/helpy/Restapi'
    //serveConnectionString: 'http://doionic.com:3000/api/'
}

//declare var JSEncrypt: any;
@Injectable()
export class LoginService {
    token: any;
    user: any;
    name: string;
    
    constructor(private http: Http){
    
    }
    
    
    checkUserExist(user){
        // console.log("checkUserExist Service Called");
        // console.log("Data recied at service",user);
        var headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + 'GeneralCheck/isMobileEmailExist', user, {headers: headers}).map(res => res.json());
    }
    
    
    signupRequest(user){
        console.log("Data recied at service", user);
        var headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(config.serveConnectionString + 'auth/register', user, {headers: headers}).map(res => res.json());
    }
    
    //     sendSMD(info) {
    //         console.log("Data recied at service for SENINF SMS",info);
    //        return this.http.get('http://193.105.74.159/api/v3/sendsms/plain?user=kapsystem&password=j5SkaRdY&sender=KAPNFO&SMSText=OyeChutiyee&type=longsms&GSM=919889783309');
    //    }
    
    
    validateRegister(user){
        console.log(user);
        if (user.name == undefined || user.username == undefined || user.email == undefined || user.name == '' || user.username == '' || user.email == '') {
            return false;
        } else {
            return true;
        }
    }
    
    validateEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    storeUserData(user, token){
        console.log(JSON.stringify(user));
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('User', JSON.stringify(user));
        
        this.token = token;
        this.user = user;
    }
    
    //Post request
    getProfile(){
        var headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.token);
        headers.append('Content-type', 'application/json');
        return this.http.get(config.serveConnectionString + 'api/auth/profile', {headers: headers}).map(res => res.json());
    }
    
    loadToken(){
        this.token = sessionStorage.getItem('token');
    }
    
    logout(){
        this.token = null;
        this.user = null;
        localStorage.clear();
        sessionStorage.clear();
        
    }
    
    
}