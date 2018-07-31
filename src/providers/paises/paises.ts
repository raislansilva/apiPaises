import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the PaisesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaisesProvider {

  private apiREST = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: HttpClient) {

  }

  listaPaises() {
    return this.http.get(this.apiREST)
      .map((data) => {
        return data.valueOf();
      });
  }


}
