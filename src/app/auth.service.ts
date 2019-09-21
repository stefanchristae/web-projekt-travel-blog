import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = '/register';  // URL to web api
  private loginUrl = '/login';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  submitRegister(body:any){
    console.log(body);
    console.log(`POST register on ${this.registerUrl}`);
    return this.http.post<any>(this.registerUrl, body, this.httpOptions).pipe(
      tap(body => this.log(`add new register: ${body}`)
      ),
      catchError(this.handleError('submitregister'))
    );
    // return this.http.post('http://localhost:4200/register', body,{
    //   observe:'body'
    // });

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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`AuthService: ${message}`);
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
