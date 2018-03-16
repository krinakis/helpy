import {Component} from '@angular/core';
import {Home} from "../../pages/home/home";
import {Message} from "../../pages/message/message";
import {Myproject} from "../../pages/myproject/myproject";
import {Notification} from "../../pages/notification/notification";
import {Profile} from "../../pages/profile/profile";

//@IonicPage()
@Component({
    selector   : 'tabcomponent',
    templateUrl: 'tabcomponent.html'
})
export class Tabcomponent {
    // this tells the tabs component which Pages should be each tab's root Page
    tab1Root: any = Home;
    tab2Root: any = Myproject;
    tab3Root: any = Message;
    tab4Root: any = Notification;
    tab5Root: any = Profile;
    
    constructor(){
    }
}
