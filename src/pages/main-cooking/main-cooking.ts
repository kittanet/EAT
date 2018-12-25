import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import * as $ from "jquery";
import { elementAttribute } from '@angular/core/src/render3/instructions';



@IonicPage()
@Component({
  selector: 'page-main-cooking',
  templateUrl: 'main-cooking.html',
})

export class MainCookingPage {
  img1: any;
  res: any;
  size: number = 0;
  calories: number = 0;

  total_fat: number = 0;
  saturated_fat: number = 0;
  trans_fat: number = 0;
  cholesterol: number = 0;
  sodium: number = 0;
  total_carbohydarte: number = 0;
  dietary_fiber: number = 0;
  sugar: number = 0;
  protein: number = 0;

  vitamin_D: number = 0;
  calcium: number = 0;
  iron: number = 0;
  potassium: number = 0;

  selectOptions: any;
  new: any;
  Ingredients: any;
  map: {
    [key: string]: any;
  } = {};

  Like: boolean = false;
  favorite:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    public modalCtrl: ModalController) {
    this.res = this.navParams.get("res")
    this.img1 = this.res.img;
    this.Like = this.checkLike();

    // lock array
    this.Ingredients = JSON.parse(JSON.stringify(this.res.Ingredients));

    for (let i = 0; i < this.Ingredients.length; i++) {
      this.Ingredients[i].index = this.Ingredients[i].index.slice(0, 1)
    }

    this.res.Ingredients.forEach(element => {
      if (element.index.length != 1) {
        this.map[element.key] = element.index[0].subindex.Item;
      }
    });

    this.selectOptions = {
      title: 'Ingredients',
      mode: 'md'
    };
    this.setTable(this.Ingredients);
  }

  presentModal() {
    if(localStorage.getItem("Member") != null){
      var has = this.checkLike();
      if(has){
        this.favorite = this.favorite.filter(element => {
          return element.id != this.res.id
        });
      } else {
        // this.favorite.push({
        //   "title":this.res.title,
        //   "id":this.res.id
        // })

        this.favorite.push(this.res)
      }
      this.favorite = this.favorite.sort();
      localStorage.setItem("Favorite",JSON.stringify(this.favorite))
      this.Like = !this.Like;
    } else {
      const modal = this.modalCtrl.create('RegisterPage');
      modal.present();
    }
  }

  checkLike(){
    this.favorite = JSON.parse(localStorage.getItem("Favorite"));
    var has:boolean = false;
      this.favorite.forEach(element => {
        if(element.id == this.res.id){
          has = true;
        }
      });
    return has;
  }

  setTable(item: any) {
    this.calories = 0;
    this.total_fat = 0;
    this.saturated_fat = 0;
    this.trans_fat = 0;
    this.cholesterol = 0;
    this.sodium = 0;
    this.total_carbohydarte = 0;
    this.dietary_fiber = 0;
    this.sugar = 0;
    this.protein = 0;
    this.size = 0;
    this.vitamin_D = 0;
    this.calcium = 0;
    this.iron = 0;
    this.potassium = 0;
    item.forEach(element => {
      this.calories += parseInt(element.index[0].subindex.nutation.Calories)
      this.total_fat += parseInt(element.index[0].subindex.nutation.Total_Fat)
      this.saturated_fat += parseInt(element.index[0].subindex.nutation.Saturated_Fat);
      this.trans_fat += parseInt(element.index[0].subindex.nutation.Trans_Fat);
      this.cholesterol += parseInt(element.index[0].subindex.nutation.Cholesterol);
      this.sodium += parseInt(element.index[0].subindex.nutation.Sodium);
      this.total_carbohydarte += parseInt(element.index[0].subindex.nutation.Total_Carbohydrate);
      this.dietary_fiber += parseInt(element.index[0].subindex.nutation.Dietary_Fiber);
      this.sugar += parseInt(element.index[0].subindex.nutation.Total_Sugars);
      this.protein += parseInt(element.index[0].subindex.nutation.Protein);
      this.vitamin_D += parseInt(element.index[0].subindex.nutation.Vitamin_D);
      this.calcium += parseInt(element.index[0].subindex.nutation.Calcium);
      this.iron += parseInt(element.index[0].subindex.nutation.Iron);
      this.potassium += parseInt(element.index[0].subindex.nutation.Potassium);
    });
    this.size = this.calories + this.total_fat + this.saturated_fat + this.trans_fat + this.cholesterol + this.sodium + this.total_carbohydarte + this.dietary_fiber + this.sugar + this.protein;
  }

  convert(res: any) {
    let temp = 0;
    temp = parseInt(res);
    if (res.includes("kg")) {
      return temp * 1000;
    } else if (res.includes("mg")) {
      return temp / 1000;
    } else {
      return temp;
    }
  }

  goCookingPage() {
    this.navCtrl.setRoot("CookingPage",{
      res:this.res
    });
    // localStorage.setItem("Step", JSON.stringify(this.res.Step));
  }

  goBack() {
    this.navCtrl.setRoot("SlideMenuPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainCookingPage');
  }

  backPage() {
    this.navCtrl.setRoot("SlideMenuPage");
  }

  /* menu */
  goSlideMenuPage() {
    this.navCtrl.setRoot("SlideMenuPage");
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

  openMyModal() {
    console.log('ionViewDidLoad openMyModal');
    $(document).ready(function () {

      $("#myModal").fadeIn("slow");

      $("#myCollection").hide();
      $("#i-left").hide();
      $("#i-right").hide();
    });
  }


  ngAfterViewInit() {
    console.log('ionViewDidLoad xxxx');

    $(document).ready(function () {

      /* Modal hide when click outside menu  */
      $(".modal").click(function () {
        $("#myModal").fadeOut("slow");
      });

    });
  }

  change() {
    // console.log(this.Ingredients)
    // console.log(submenu + ": " + this.map[submenu])
    for (let entry of this.res.Ingredients) {
      if (this.map[entry.key]) {
        // console.log(this.map[entry.key]);
        // console.log(entry.key)
        for (let i = 0; i < this.Ingredients.length; i++) {
          if (this.Ingredients[i].key == entry.key) {
            // console.log(this.Ingredients[i].index)
            for (let j = 0; j < entry.index.length; j++) {
              if (entry.index[j].subindex.Item == this.map[entry.key]) {
                // console.log(entry.index[j].subindex)
                this.Ingredients[i].index[0].subindex = entry.index[j].subindex;
              }
            }
          }
        }
      }
    }
    this.setTable(this.Ingredients);
  }

  /* menu */
}