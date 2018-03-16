import {Component, ViewChild} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Content, IonicPage,AlertController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AllService} from "../../services/all.service";
import {Observable} from 'rxjs/Rx';

@IonicPage() @Component({
    selector   : 'page-chat',
    templateUrl: 'chat.html',
})
export class Chat {
    @ViewChild(Content) content: Content;
    chatText: string = '';
    base64Image: any;
    toUserId: any;
    userId: any;
    image: any;
    toUser: string = '';
    allowChatSend: boolean = true;
    chats: any = {
        data : [
            {
                toUser  : '',
                fromUser: ''
            },
        ],
        other: [
            {
                username : '',
                userimage: ''
            },
        ]
    };
    length;
    lengthpre;
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private camera: Camera, public toastCtrl: ToastController, public allService: AllService,public alertCtrl:AlertController){
        this.toUserId = localStorage.getItem("toUserId");
        this.userId = localStorage.getItem("id");
        this.image = localStorage.getItem("userimage");
        console.log(this.image);
        
        this.length = this.lengthpre;
    }
    timerId;
    ionViewWillEnter(){
        this.scrolltobottom();
        // Observable.interval(2000).subscribe(x => {
        //     this.get_chats();
        //   });

          this.timerId = setInterval(() => {
            this.get_chats();
            }, 2000);

      }

    ionViewDidLoad(){
        console.log('ionViewDidLoad Chat');
        this.get_chats();
    }
    goBack(){
        this.navCtrl.pop();
    }
    scrolltobottom(){
        setTimeout(() => {
            this.content.scrollToBottom();    
        }, 1000);
        setTimeout(() => {
            this.content.scrollToBottom();    
        }, 2000);
        setTimeout(() => {
            this.content.scrollToBottom();    
        }, 3000);
    }
    get_chats(){
        let getObj = {
            method  : 'get_chats',
            fromUser: localStorage.getItem("id"),
            toUser  : this.toUserId ? this.toUserId : 1
        }
        this.allService.get_chats(getObj).subscribe(res =>{
            console.log("here is my all chats: ", res);
            this.lengthpre = res;
            if(this.lengthpre  != this.length){
                this.length = this.lengthpre;
            this.chats = res;
            this.toUser = res.other[0].username;
            }
        })
    }
    viewprofile(){
        let modal = this.modalCtrl.create('Viewprofile');
        modal.present();
    }
    
    sendChat(){
        if (this.allowChatSend) {
            if (this.chatText.length > 0 && this.chatText.trim() != "") {
                this.allowChatSend = false;
                let data = {
                    fromUser  : localStorage.getItem("id"),
                    toUser    : this.toUserId,
                    message   : this.chatText,
                    image     : null,
                    video     : null,
                    product_id: null,
                    method    : 'send_chat'
                }
                this.allService.sendchat(data).subscribe(res =>{
                    console.log(res);
                    if (res.status == 200) {
                        this.chats.data.push(res['getChat']);
                        this.chatText = '';
                        this.content.scrollToBottom(200);
                        this.allowChatSend = true;
                        
                    } else {
                        this.allowChatSend = true;
                        console.log("Error");
                        const toast = this.toastCtrl.create({
                            message : 'Error sending message.',
                            position: 'buttom',
                            duration: 1000,
                        });
                        toast.present();
                    }
                })
            } else {
                const toast = this.toastCtrl.create({
                    message : 'Error sending message.',
                    position: 'buttom',
                    duration: 1000,
                });
                toast.present();
            }
        }
        this.scrolltobottom();
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
            console.log("Your Image with Base 64 Is ----->>>", this.base64Image);
            // this.photos.reverse();
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
            console.log("Your Image is -->>", this.base64Image);
        }, (err) =>{
            console.log(err);
        });
    }
    takePicture1(){
        let alert = this.alertCtrl.create({
            title: 'Confirm purchase',
            message: 'Do you want to buy this book?',
            buttons: [
              {
                text: 'Camera',
                role: 'camera',
                handler: () => {
                  console.log('Cancel clicked');
                  this.takePicture();
                }
              },
              {
                text: 'Gallery',
                handler: () => {
                  console.log('Buy clicked');
                  this.choose_album();
                }
              }
            ]
          });
          alert.present();
    }
    choose_album(){
        let options = {
            quality: 75,
            destinationType: this.camera.DestinationType.DATA_URL,
            allowEdit: true,
            encodingType: this.camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
        }
        this.camera.getPicture(options).then((imageData) =>{
            this.base64Image = "data:image/jpeg;base64," + imageData;
            console.log("Your Image with Base 64 Is ----->>>", this.base64Image);
            this.sendchatmedia(this.base64Image);
        }, (err) =>{
            console.log(err);
        });
    }
    takePicture(){
        const options: CameraOptions = {
            quality        : 50, // picture quality
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType   : this.camera.EncodingType.JPEG,
            mediaType      : this.camera.MediaType.PICTURE
        }
        this.camera.getPicture(options).then((imageData) =>{
            this.base64Image = "data:image/jpeg;base64," + imageData;
            console.log("Your Image with Base 64 Is ----->>>", this.base64Image);
            this.sendchatmedia(this.base64Image);
        }, (err) =>{
            console.log(err);
        });
    }
    sendchatmedia(image){
    
        let data = {
            fromUser  : localStorage.getItem("id"),
            toUser    : this.toUserId,
            message   : '',
            image     : image,
            video     : null,
            product_id: null,
            method    : 'send_chat'
        }
      //   console.log(this.base64Image);
        this.allService.sendchat(data).subscribe(res =>{
            console.log(res);
            if (res.status == 200) {
                this.chats.data.push(res['getChat']);
                this.chatText = '';
                this.content.scrollToBottom(200);
                this.allowChatSend = true;
                
            } else {
                this.allowChatSend = true;
                console.log("Error");
    
                let alert = this.alertCtrl.create({
                  title   : 'Error sending message.',
                  subTitle: res.error,
                  buttons : ['Try Again']
              });
              alert.present();
            }
        })
    }
    ionViewDidLeave() {
        //Stop refresh
        clearTimeout(this.timerId);
        }
}
