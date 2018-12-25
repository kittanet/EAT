import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content, FabButton } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-test-scroll-event',
  templateUrl: 'test-scroll-event.html',
})
export class TestScrollEventPage {


  @ViewChild(Content)
  content: Content;
  @ViewChild(FabButton)
  fabButton: FabButton;

  //divTittle: any;

  className: string = 'div-down';
  
  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestScrollEventPage');
  }

  changeClass() {
    this.className = 'div-up';
  }

  scrollTo() {
    // set the scrollLeft to 0px, and scrollTop to 500px
    // the scroll duration should take 200ms
    this.content.scrollTo(0, 500, 200);
    console.log('ionViewDidLoad -> scroll');
  }

  ngAfterViewInit() {
        this.content.ionScroll.subscribe((d) => {
         this.fabButton.setElementClass("fab-button-out", d.directionY == "down");
         console.log('ionViewDidLoad -> scroll แแแ');
   
         //this.divTittle.setElementClass("div-up", d.directionY == "down");
         //this.className = 'div-up';
       }); 


  }
}
