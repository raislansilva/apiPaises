import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PaisesProvider } from '../../providers/paises/paises';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  paises: {};
  constructor(public navCtrl: NavController,
    private paisesProvider: PaisesProvider
  ) {}

  ionViewDidLoad() {
    this.listaPaises();
  }

 listaPaises(){
    this.paisesProvider.listaPaises()
    .subscribe(paises => this.paises = paises);
  }

}
