import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
public apiRootUrl = "http://localhost:4200"
public url = "assets/json/database.json"
// public options = new HttpHeaders({code:this.code});
  constructor(private http: HttpClient) { }
  // postCode(codeParam){
  //   const body = new HttpParams().set('code', codeParam ? codeParam : this.code);
  //   this.http.post<any>(this.url, body).subscribe(r=>console.log(r));
  // }
  // getDB(){
  //   this.http.post<any>(this.url,{observe:'body'}).subscribe(r=>console.log(r))
  // }
  getDB(){
    return this.http.get<any>(this.url);
  }
  postTrackingNumber(number){
    // posts the tracking number and returns what the backend gives, the this.url will be changed.
    const body = new HttpParams().set('number', number);
    return this.http.post<any>(this.url, body)
  }
}
