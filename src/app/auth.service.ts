import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://localhost:4200/api/register';  // URL to web api
  private loginUrl = 'http://localhost:4200/api/login';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  submitRegister(user:User){
    return this.http.post<User>(this.registerUrl, user, this.httpOptions).pipe(
      tap(user => this.log(`add new register: ${user}`)
      ),
      catchError(this.handleError('submitregister'))
    );
  }

  login(user:User): Observable<any>{
    return this.http.post<User>(this.loginUrl, user, this.httpOptions).pipe(
      tap(user => this.log(`login: ${user}`)
      ),
      catchError(this.handleError('login'))
    );
  }

  // getUserName(id: String): Observable<String>{
  //   const url = `${this.userUrl}/${id}`;
  //   console.log(url);
  //   return this.http.get<String>(url).pipe(
  //     tap(_ => this.log(`username: ${id}`)
  //     ),
  //     catchError(this.handleError<String>('username'))
  //   );
  // }

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
