import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './productExpirationDetails';
import { Observable } from 'rxjs';

@Injectable()
export class ExpirationDataServiceProvider {

  private expirationFileLocation: string = 'assets/data/expirationTimes.json';

  constructor(public http: HttpClient) {

  }

  getExpirationData(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.expirationFileLocation);
  }

}
