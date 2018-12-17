import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PaisesProvider } from '../../providers/paises/paises';
import { HttpClient } from '@angular/common/http';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Vibration } from '@ionic-native/vibration';

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
    private paisesProvider: PaisesProvider,
    private push: Push,
    private vibration: Vibration
  ) {
        this.push.hasPermission().then((res: any) => {
          if (res.isEnabled) {
          alert('Tem Permissão');
              const options: PushOptions = {
                  android: {
                    vibrate:true,
                    topics:['my-app']
                  },
                  ios: {
                      alert: 'true',
                      badge: true,
                      sound: 'false'
                  },
                  windows: {},
                  browser: {
                      pushServiceURL: 'http://push.api.phonegap.com/v1/push'
                  }
              };

          const pushObject: PushObject = this.push.init(options);
          
          pushObject.on('notification').subscribe((notification: any) => {
             alert(notification.message)
          });

          pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
          
          pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

          } else {
          alert('Não tem Permissão');
        }
      });

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
