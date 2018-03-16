import {Component} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {
    ActionSheetController, IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController
} from 'ionic-angular';
import {AllService} from '../../services/all.service';

@IonicPage() @Component({
    selector   : 'page-editprofile',
    templateUrl: 'editprofile.html',
})
export class Editprofile {
    
    data = {
        mobile   : '',
        email    : '',
        username : '',
        userimage: null,
        gender   : '',
        address  : '',
        city     : '',
        state    : '',
        country  : '',
        id       : localStorage.getItem("id"),
        method   : 'updateprofile'
    }
    
    // data1 = {
    //   password: '',
    //   confirmPwd: '',
    // }
    base64Image: any;
    
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public allService: AllService, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private camera: Camera, public actionSheetCtrl: ActionSheetController){
        
        this.data.address = localStorage.getItem("address");
        this.data.city = localStorage.getItem("city");
        this.data.country = localStorage.getItem("country");
        // this.data.date = localStorage.getItem("date");
        this.data.email = localStorage.getItem("email");
        this.data.gender = localStorage.getItem("gender");
        this.data.id = localStorage.getItem("id");
        this.data.mobile = localStorage.getItem("mobile");
        this.data.state = localStorage.getItem("state");
        this.data.userimage = localStorage.getItem("userimage");
        this.data.username = localStorage.getItem("username");
        // this.data.usertype = localStorage.getItem("usertype");
        //this.data.password = localStorage.getItem("password");
        
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad Editprofile');
    }
    
    changeProfilePic(){
        
        let actionSheet = this.actionSheetCtrl.create({
            title  : 'How do you want to update your profile?',
            buttons: [
                {
                    text   : 'Camera', //icon: '',
                    handler: () =>{
                        console.log('Camera Clicked');
                        this.takePhoto();
                    }
                },
                {
                    text   : 'Albums', //icon: 'albums',
                    handler: () =>{
                        console.log('Album clicked');
                        this.accessGallery();
                    }
                },
                
                {
                    text   : 'Cancel', // icon: 'close',
                    role   : 'cancel',
                    handler: () =>{
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        
        actionSheet.present();
        
    }
    
    
    takePhoto(){
        const options: CameraOptions = {
            quality        : 50, // picture quality
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType   : this.camera.EncodingType.JPEG,
            mediaType      : this.camera.MediaType.PICTURE
        }
        this.camera.getPicture(options).then((imageData) =>{
            this.base64Image = "data:image/jpeg;base64," + imageData;
            
            this.data.userimage = this.base64Image;
            //this.update_profile(this.updateProfileObj);
            console.log("Your Image with Base 64 Is ----->>>", this.base64Image);
            
        }, (err) =>{
            console.log(err);
        });
    }
    
    accessGallery(){
        this.camera.getPicture({
            sourceType     : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: this.camera.DestinationType.DATA_URL
        }).then((imageData) =>{
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            
            this.data.userimage = this.base64Image;
            
            console.log("Your Image is -->>", this.base64Image);
        }, (err) =>{
            console.log(err);
        });
    }
    
    
    goback(){
        this.navCtrl.pop();
    }
    
    dismiss(){
        console.log("new Updated Values are -->> ", this.data);
        
        
        const loading = this.loadingCtrl.create({
            content: 'Updating Profile...'
        });
        
        loading.present();
        
        this.allService.updateprofile(this.data).subscribe(res =>{
            
            console.log(res);
            
            // localStorage.setItem("email", res.email);
            // localStorage.setItem("mobileNumber", res.mobileNumber);
            // localStorage.setItem("name", res.name);
            // localStorage.setItem("gender", res.gender);
            
            if (res.status == 200) {
                
                localStorage.setItem("address", res.profile.address);
                localStorage.setItem("city", res.profile.city);
                localStorage.setItem("country", res.profile.country);
                localStorage.setItem("date", res.profile.date);
                localStorage.setItem("email", res.profile.email);
                localStorage.setItem("gender", res.profile.gender);
                localStorage.setItem("id", res.profile.id);
                localStorage.setItem("mobile", res.profile.mobile);
                localStorage.setItem("password", res.profile.password);
                localStorage.setItem("state", res.profile.state);
                localStorage.setItem("status", res.profile.status);
                localStorage.setItem("userimage", res.profile.userimage);
                localStorage.setItem("username", res.profile.username);
                localStorage.setItem("usertype", res.profile.usertype);
                
                
                loading.dismiss(() =>{
                });
                console.log("Profile Updated");
                
                const toast = this.toastCtrl.create({
                    message : 'Profile Updated successfully',
                    position: 'buttom',
                    duration: 1000,
                });
                toast.present();
                
                this.navCtrl.pop();
                
                toast.onDidDismiss(() =>{
                    console.log('Dismissed toast');
                });
            } else {
                console.log("Error");
            }
            
            
        });
    }
    
    
}
