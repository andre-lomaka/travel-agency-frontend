import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airport } from '../model/airport';
import { City } from '../model/city';
import { Hotel } from '../model/hotel';
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

  getAllHotels(): Observable<Hotel[]> {
    return this.httpClient.get<Hotel[]>(this.apiURL + '/hotels');
  }

  getAllAirports(): Observable<Airport[]> {
    return this.httpClient.get<Airport[]>(this.apiURL + '/airports');
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
