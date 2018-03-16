import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, Slides} from 'ionic-angular';

@IonicPage() @Component({
    selector   : 'page-intro',
    templateUrl: 'intro.html'
})
export class Intro {
    
    @ViewChild('mySlider') slider: Slides;
    currentIndex: any;
    splash = true;
    
    constructor(public navCtrl: NavController){
        
        this.currentIndex = 0;
    }
    
    onSlideChanged(){
    
    }
    
    ionViewDidLoad(){
        setTimeout(() => this.splash = false, 4000);
    }
    
    slideChanged(){
        let currentIndex = this.slider.getActiveIndex();
        console.log('Current index is', currentIndex);
        if (currentIndex == 2) {
            this.navCtrl.push('Login');
        }
    }
    
    
    goToNextSlide(){
        this.slider.slideNext();
        this.currentIndex = this.slider.getActiveIndex();
        console.log('this.currentIndex', this.currentIndex)
    }
    
    signin(){
        //this.navCtrl.push('Signin');
        this.navCtrl.push('Login');
    }
    
    
}
