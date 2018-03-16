import {Component,ElementRef,ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { AllService } from "../../services/all.service";

@Component({
    selector   : 'page-message',
    templateUrl: 'message.html',
})
export class Message {
    chatData:any;
    id:any;
    messagenotfound:boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams,public allservice:AllService){
        this.messagenotfound=false;
    }
    
    ionViewDidLoad(){
        console.log('ionViewDidLoad Message');
        this.id = localStorage.getItem('id');
    }


  
    
    ionViewWillEnter(){
        var data = {
            method : 'list_message',
            user_id:this.id
        }
        console.log(data);
        
        this.allservice.login(data).subscribe(res =>{
            console.log(res);
            this.chatData = res.message;
            console.log(this.chatData);
            if(this.chatData.length == 0)
            {
                this.messagenotfound = true;
            }
            
        })
    }
    chat(chat){
        console.log(chat);
        // if (chat.) {
            
        // }

        if(this.id == chat.toUser){
            localStorage.setItem('toUserId',chat.fromUser);
        }else{
            localStorage.setItem('toUserId',chat.toUser);
        }
        this.navCtrl.push('Chat');
    }
    
}
