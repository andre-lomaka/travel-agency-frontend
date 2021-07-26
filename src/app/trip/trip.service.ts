import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../model/city';
import { Trip } from '../model/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiURL = environment.apiHost;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    params: new HttpParams()
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Trip[]> {
    return this.httpClient.get<Trip[]>(this.apiURL + '/trips');
  }

  getAllCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.apiURL + '/cities');
  }

  getByCriteria(params: Params): Observable<Trip[]> {
    if (typeof params.fromCity !== 'undefined') {
      this.httpOptions.params = this.httpOptions.params.append('fromCity', params.fromCity);
    }
    if (typeof params.toCity !== 'undefined') {
      this.httpOptions.params = this.httpOptions.params.append('toCity', params.toCity);
    }
    return this.httpClient.get<Trip[]>(this.apiURL + '/trips', this.httpOptions);
  }

  getById(id: number): Observable<Trip> {
    return this.httpClient.get<Trip>(this.apiURL + '/trips/' + id);
  }
}
