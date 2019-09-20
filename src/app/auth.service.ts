import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  submitRegister(body:any){
    console.log(this.http.post('http://localhost:4200/register', body,{
      observe:'body'
    }));
    return this.http.post('http://localhost:4200/register', body,{
      observe:'body'
    });
  }

  login(body:any){
    return this.http.post('http://localhost:4200/login', body,{
      observe:'body'
    });
  }

  getUserName() {
    return this.http.get('http://localhost:4200/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

}
