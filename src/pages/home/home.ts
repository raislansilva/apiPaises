import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PaisesProvider } from '../../providers/paises/paises';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  paises: {};
  page = 0;
  pageMax = 3;

  constructor(public navCtrl: NavController,
    private httpClient: HttpClient,
    private paisesProvider: PaisesProvider
  ) {
    this.listaPaises();
   }

  ionViewDidLoad() {
    this.listaPaises();
  }

  listaPaises(infiniteScroll?) {
    this.paisesProvider.listaPaises()
      .subscribe(paises => this.paises = paises);

      if (infiniteScroll) {
        infiniteScroll.complete();
      }
  }

  loadMore(infiniteScroll) {
    this.page++;
    this.listaPaises(infiniteScroll);
 
    if (this.page === this.pageMax) {
      infiniteScroll.enable(false);
    }
  }

  

}
