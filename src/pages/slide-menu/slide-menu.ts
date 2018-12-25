import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from "jquery";
import { Slides } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { WizardLayout2Module } from '../../components/wizard/layout-2/wizard-layout-2.module';

@IonicPage()
@Component({
  selector: 'page-slide-menu',
  templateUrl: 'slide-menu.html',
})
export class SlideMenuPage {

  @ViewChild(Slides) slides: Slides;

  index: any;
  img1: any;
  res: any;
  conllections:any;
  title: string;
  detail_menu: any;
  currentIndex:number=0;
  seclect:any;
  detail_menu_length:number=0;
  conllections_length:number=0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    public zone: NgZone,
    private http: HttpClient,
    private geolocation: Geolocation,
    private api: ApiProvider) {
    this.getCollections();
    this.img1 = this.api.url + ":"+ this.api.port + "/eatmatters/img/collections/img001.jpg"
    // localStorage.setItem("page",JSON.stringify(null));
  }

  getCollections() {
    let link = this.api.url + ":"+ this.api.port + "/eatmatters/api/get-collection.php";
    this.http.get(link)
      .subscribe(data => {
        this.res = data;
        // console.log(this.res);
        if (this.res.status.code == "0") {
          this.conllections = this.res.data;
          for(let i=0;i<this.conllections.length;i++) {
            if(this.conllections[i].detail_menu == null) {
              this.conllections[i].detail_menu = [];
            }
          }
          this.detail_menu = this.conllections[0].detail_menu;
          this.img1 = this.api.url + ":" + this.api.port + this.conllections[0].img;
          this.title = this.conllections[0].title;
          this.detail_menu_length = this.detail_menu.length;
          this.conllections_length = this.conllections.length;
          this.clear();
        }

      }, error => {

      });
  }

  clear() {
    this.conllections.forEach(element1 => {
      element1.detail_menu.forEach(element2 => {
        element2.check = false;
      });
    });
    this.seclect = null;
  }

  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    if (this.currentIndex != this.conllections.length) {
      this.index = this.currentIndex + 1;
      this.img1 = this.api.url + ":" + this.api.port + this.conllections[this.currentIndex].img;
      this.title = this.conllections[this.currentIndex].title
      this.detail_menu = this.conllections[this.currentIndex].detail_menu;
      this.detail_menu_length = this.detail_menu.length;
    }
    this.clear();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlideMenuPage');
    this.index = 1;
  }

  goMainCookingPage() {
    if(this.seclect != null) {
      console.log(this.seclect)
      this.navCtrl.setRoot("MainCookingPage",{
        res : {
          "title": "Crispy Skinned Salmon with Homemade Teriyaki Source",
          "id": "1",
          "img": this.api.url + ":" + this.api.port + "/eatmatters/img/item/Salmon/Collection.jpg",
          "Serve": "1",
          "Cooking": "20 mins",
          "Good_for": "Diabetes",
          "How_this_food": "With chrispy salmon skin, you will enjoy every bite. Plus, you can control the sweetnest while full of taste with homemade teriyaki source.",
          "Ingredients": [{
            "key": "001",
            "index": [{
              "subindex": {
                "Item": "Salmon fillets",
                "Unit": "100 g",
                "nutation": {
                  "Calories": "200",
                  "Total_Fat": "10",
                  "Saturated_Fat": "2",
                  "Trans_Fat": "0",
                  "Cholesterol": "2",
                  "Sodium": "0",
                  "Total_Carbohydrate": "0",
                  "Dietary_Fiber": "0",
                  "Total_Sugars": "0",
                  "Protein": "10",
                  "Vitamin_D": "1",
                  "Calcium": "1",
                  "Iron": "1",
                  "Potassium": "1"
                }
              }
            }, {
              "subindex": {
                "Item": "Tuna",
                "Unit": "100 g",
                "nutation": {
                  "Calories": "150",
                  "Total_Fat": "5",
                  "Saturated_Fat": "2",
                  "Trans_Fat": "0",
                  "Cholesterol": "2",
                  "Sodium": "0",
                  "Total_Carbohydrate": "0",
                  "Dietary_Fiber": "0",
                  "Total_Sugars": "0",
                  "Protein": "10",
                  "Vitamin_D": "2",
                  "Calcium": "2",
                  "Iron": "2",
                  "Potassium": "2"
                }
              }
            }, {
              "subindex": {
                "Item": "Sea Bass",
                "Unit": "100 g",
                "nutation": {
                  "Calories": "100",
                  "Total_Fat": "5",
                  "Saturated_Fat": "1",
                  "Trans_Fat": "0",
                  "Cholesterol": "2",
                  "Sodium": "0",
                  "Total_Carbohydrate": "0",
                  "Dietary_Fiber": "0",
                  "Total_Sugars": "0",
                  "Protein": "10",
                  "Vitamin_D": "0",
                  "Calcium": "0",
                  "Iron": "0",
                  "Potassium": "0"
                }
              }
            }]
          }, {
            "key": "002",
            "index": [{
              "subindex": {
                "Item": "Shoyu",
                "Unit": "1 tbsp",
                "nutation": {
                  "Calories": "10",
                  "Total_Fat": "1",
                  "Saturated_Fat": "0",
                  "Trans_Fat": "0",
                  "Cholesterol": "0",
                  "Sodium": "0",
                  "Total_Carbohydrate": "1",
                  "Dietary_Fiber": "0",
                  "Total_Sugars": "1",
                  "Protein": "0",
                  "Vitamin_D": "0",
                  "Calcium": "0",
                  "Iron": "0",
                  "Potassium": "0"
                }
              }
            }]
          }, {
            "key": "003",
            "index": [{
              "subindex": {
                "Item": "Mirin",
                "Unit": "1 tbsp",
                "nutation": {
                  "Calories": "5",
                  "Total_Fat": "0.5",
                  "Saturated_Fat": "0",
                  "Trans_Fat": "0",
                  "Cholesterol": "0",
                  "Sodium": "0",
                  "Total_Carbohydrate": "1",
                  "Dietary_Fiber": "0",
                  "Total_Sugars": "1",
                  "Protein": "0",
                  "Vitamin_D": "0",
                  "Calcium": "0",
                  "Iron": "0",
                  "Potassium": "0"
                }
              }
            }]
          }, {
            "key": "004",
            "index": [{
              "subindex": {
                "Item": "Sake",
                "Unit": "1 tbsp",
                "nutation": {
                  "Calories": "2",
                  "Total_Fat": "0",
                  "Saturated_Fat": "0",
                  "Trans_Fat": "0",
                  "Cholesterol": "0",
                  "Sodium": "0",
                  "Total_Carbohydrate": "1",
                  "Dietary_Fiber": "0",
                  "Total_Sugars": "0",
                  "Protein": "0",
                  "Vitamin_D": "0",
                  "Calcium": "0",
                  "Iron": "0",
                  "Potassium": "0"
                }
              }
            }]
          }, {
            "key": "005",
            "index": [{
              "subindex": {
                "Item": "Stevia",
                "Unit": "1 tbsp",
                "nutation": {
                  "Calories": "1",
                  "Total_Fat": "0",
                  "Saturated_Fat": "0",
                  "Trans_Fat": "0",
                  "Cholesterol": "0",
                  "Sodium": "0",
                  "Total_Carbohydrate": "1",
                  "Dietary_Fiber": "0",
                  "Total_Sugars": "0",
                  "Protein": "0",
                  "Vitamin_D": "0",
                  "Calcium": "0",
                  "Iron": "0",
                  "Potassium": "0"
                }
              }
            }, {
              "subindex": {
                "Item": "Granulated Sugar",
                "Unit": "1 tbsp",
                "nutation": {
                  "Calories": "10",
                  "Total_Fat": "0",
                  "Saturated_Fat": "0",
                  "Trans_Fat": "0",
                  "Cholesterol": "0",
                  "Sodium": "0",
                  "Total_Carbohydrate": "2",
                  "Dietary_Fiber": "0",
                  "Total_Sugars": "1",
                  "Protein": "0",
                  "Vitamin_D": "0",
                  "Calcium": "0",
                  "Iron": "0",
                  "Potassium": "0"
                }
              }
            }, {
              "subindex": {
                "Item": "Brown Sugar",
                "Unit": "1 tbsp",
                "nutation": {
                  "Calories": "10",
                  "Total_Fat": "0",
                  "Saturated_Fat": "0",
                  "Trans_Fat": "0",
                  "Cholesterol": "0",
                  "Sodium": "0",
                  "Total_Carbohydrate": "2",
                  "Dietary_Fiber": "0",
                  "Total_Sugars": "1",
                  "Protein": "0",
                  "Vitamin_D": "0",
                  "Calcium": "0",
                  "Iron": "0",
                  "Potassium": "0"
                }
              }
            }]
          }, {
            "key": "006",
            "index": [{
              "subindex": {
                "Item": "Ginger",
                "Unit": "1 tbsp",
                "nutation": {
                  "Calories": "7",
                  "Total_Fat": "0",
                  "Saturated_Fat": "0",
                  "Trans_Fat": "0",
                  "Cholesterol": "0",
                  "Sodium": "0",
                  "Total_Carbohydrate": "0",
                  "Dietary_Fiber": "0",
                  "Total_Sugars": "0",
                  "Protein": "0",
                  "Vitamin_D": "0",
                  "Calcium": "0",
                  "Iron": "0",
                  "Potassium": "0"
                }
              }
            }]
          }, {
            "key": "007",
            "index": [{
              "subindex": {
                "Item": "Garlic",
                "Unit": "1 tbsp",
                "nutation": {
                  "Calories": "7",
                  "Total_Fat": "0",
                  "Saturated_Fat": "0",
                  "Trans_Fat": "0",
                  "Cholesterol": "0",
                  "Sodium": "0",
                  "Total_Carbohydrate": "0",
                  "Dietary_Fiber": "0",
                  "Total_Sugars": "0",
                  "Protein": "0",
                  "Vitamin_D": "0",
                  "Calcium": "0",
                  "Iron": "0",
                  "Potassium": "0"
                }
              }
            }]
          }, {
            "key": "008",
            "index": [{
              "subindex": {
                "Item": "Sesame Seed",
                "Unit": "1 tbsp",
                "nutation": {
                  "Calories": "7",
                  "Total_Fat": "2",
                  "Saturated_Fat": "0",
                  "Trans_Fat": "0",
                  "Cholesterol": "0",
                  "Sodium": "0",
                  "Total_Carbohydrate": "0",
                  "Dietary_Fiber": "0",
                  "Total_Sugars": "0",
                  "Protein": "0",
                  "Vitamin_D": "0",
                  "Calcium": "0",
                  "Iron": "0",
                  "Potassium": "0"
                }
              }
            }]
          }, {
            "key": "009",
            "index": [{
              "subindex": {
                "Item": "Asparagus",
                "Unit": "1",
                "nutation": {
                  "Calories": "10",
                  "Total_Fat": "0",
                  "Saturated_Fat": "0",
                  "Trans_Fat": "0",
                  "Cholesterol": "0",
                  "Sodium": "0",
                  "Total_Carbohydrate": "0",
                  "Dietary_Fiber": "3",
                  "Total_Sugars": "0",
                  "Protein": "0",
                  "Vitamin_D": "0",
                  "Calcium": "0",
                  "Iron": "0",
                  "Potassium": "0"
                }
              }
            }]
          }, {
            "key": "0010",
            "index": [{
              "subindex": {
                "Item": "Small Potato",
                "Unit": "1",
                "nutation": {
                  "Calories": "30",
                  "Total_Fat": "3",
                  "Saturated_Fat": "0",
                  "Trans_Fat": "0",
                  "Cholesterol": "0",
                  "Sodium": "0",
                  "Total_Carbohydrate": "0",
                  "Dietary_Fiber": "1",
                  "Total_Sugars": "0",
                  "Protein": "0",
                  "Vitamin_D": "0",
                  "Calcium": "0",
                  "Iron": "0",
                  "Potassium": "0"
                }
              }
            }]
          }],
          "Step": [{
            "index": "1",
            "title": "Prep",
            "img": this.api.url + ":" + this.api.port + "/eatmatters/img/item/Salmon/SM_Prep.jpg",
            "detail": "Place salmon skin side up. Pat dry and score on salmon’s skin into stripes which are half an inch in between and a quarter inch deep then salt into skin.",
            "video": null
          }, {
            "index": "2",
            "title": "Sear",
            "img": this.api.url + ":" + this.api.port + "/eatmatters/img/item/Salmon/SM_sear.jpg",
            "detail": "Heat a non-stick frying pan over low-meduim heat. Sear salmon, skin side down, for 2-3 minutes or until the skin is golden brown. Turn it over and continue searing for 1-2 minutes for meduim or until cooked to your liking.",
            "video": {
              "title": "Making Chrispy Salmon Skin",
              "detail": "Put the skin side on the pan until the skin color is dark.",
              "url": "http://miwserver.ddns.net:8555/eatmatters/video/foodporn.mp4"
            }
          }, {
            "index": "3",
            "title": "Prepare Sauce",
            "img": this.api.url + ":" + this.api.port + "/eatmatters/img/item/Salmon/SM_PrepareSource.jpg",
            "detail": "Heat the pan to medium heat. Add shoyu, mirin and sake. Bring to a simmer and add ginger and garlic, agitating pan to avoid burning. Cooking until sauce reduced to thick consistency.  Set the pan aside.",
            "video": null
          }, {
            "index": "4",
            "title": "Bake",
            "img": this.api.url + ":" + this.api.port + "/eatmatters/img/item/Salmon/SM_Bake.jpg",
            "detail": "Heat an oven to 180 degrees. Drizzle the potato with olive oil, season with salt and pepper as needed. Put in the oven  for 20 minutes.",
            "video": null
          }, {
            "index": "5",
            "title": "Grill",
            "img": this.api.url + ":" + this.api.port + "/eatmatters/img/item/Salmon/SM_Grill.jpg",
            "detail": "Heat a new pan over medium heat. Lightly coat the asparagus with oil, season with salt and pepper as needed. Grill over high heat for 2-3 minutes, or to desired tenderness.",
            "video": null
          }, {
            "index": "6",
            "title": "Put It Together",
            "img": this.api.url + ":" + this.api.port + "/eatmatters/img/item/Salmon/SM_Finish.jpg",
            "detail": "Coat cooked salmon with the source. Put all, potato, asparagus and salmon, into a dish.",
            "video": null
          }]
        }
      });
    }
  }

  goMyFavoritePage() {
    this.navCtrl.setRoot("MyFavoritePage");
  }

  goMyHealthyChoicePage() {
    this.navCtrl.setRoot("MyHealthyChoicePage");
  }

  goShoppingListPage() {
    this.navCtrl.setRoot("ShoppingListPage");
  }

  changeImg(img:string,item:any){
    this.img1 = this.api.url + ":" + this.api.port + img;
    this.seclect = item;
    this.conllections[this.currentIndex].detail_menu.forEach(element => {
      if(element.menu_name == item.menu_name) {
        element.check = true;
      } else {
        element.check = false;
      }
    });
  }

  ngAfterViewInit() {
    console.log('ionViewDidLoad xxxx');

    $(document).ready(function () {
      $("#divPoint").fadeIn();
      /* Hide Modal Menu and Show Collections */
      $("#myCollection").hide();
      $("#i-left").hide();
      $("#i-right").hide();
      mainMenu();

      function mainMenu() {
        $("#myModal").fadeOut();
        $("#myCollection").fadeIn("slow");
        $("#i-right").fadeIn("slow");

        $("#div-middle").hide();
        $("#div-bottom").hide();
        $("#y-scroll").hide();
      }

      $(".hamburger-btn .fa-angle-double-up").click(function () {
        $("#myCollection").fadeIn("slow");
        $("#div-middle").show();
        $("#div-bottom").show();
        $("#y-scroll").show();
      });

      $(".hamburger-btn .fa-angle-double-down").click(function () {
        console.log("click down");
        $("#div-middle").hide();
        $("#div-bottom").hide();
        $("#y-scroll").hide();
      });

      /* Collections */
      $("#myModal #click1").click(function () {
        console.log('ionViewDidLoad Collections');
        mainMenu();
      });

      /* Modal hide when click outside menu  */
      $(".modal").click(function () {
        $("#myModal").fadeOut("slow");
      });

    });
  }

  openMyModal() {
    console.log('ionViewDidLoad openMyModal');
    $(document).ready(function () {

      $("#myModal").fadeIn("slow");

      $("#myCollection").hide();
      $("#i-left").hide();
      $("#i-right").hide();
    });
  }

  closeDivPoint() {
    console.log('ionViewDidLoad closeDivPoint');
    $(document).ready(function () {
      $("#divPoint").fadeOut();
    });
  }

}
