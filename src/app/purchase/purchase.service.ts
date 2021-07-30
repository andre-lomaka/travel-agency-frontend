import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Purchase } from '../model/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiURL = environment.apiHost;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Purchase[]> {
    return this.httpClient.get<Purchase[]>(this.apiURL + '/purchases');
  }

  create(purchase: Purchase): Observable<Purchase> {
    return this.httpClient.post<Purchase>(this.apiURL + '/purchases', JSON.stringify(purchase), this.httpOptions);
  //  .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient.delete<Purchase>(this.apiURL + '/purchases/' + id, this.httpOptions);
  }

  //errorHandler(error: any) {
  //  let errorMessage = '';
  //  if (error.error instanceof ErrorEvent) {
  //    errorMessage = error.error.message;
  //  } else {
  //    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //  }
  //  console.log(errorMessage);
  //  return throwError(errorMessage);
  //}
}
