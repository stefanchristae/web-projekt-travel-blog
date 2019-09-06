import { Injectable } from '@angular/core';
import { Blog } from './blog';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogsUrl = '/blogs';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsUrl).pipe(
      tap(_ => this.log('fetched blogs')),
      catchError(this.handleError<Blog[]>('getBlogs', [])));
  }

  getBlog(id: number): Observable<Blog> {
    const url = `${this.blogsUrl}/${id}`;
    return this.http.get<Blog>(url).pipe(
      tap(_ => this.log(`fetched blog id=${id}`)),
      catchError(this.handleError<Blog>(`getBlog id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new blog to the server */
  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.blogsUrl, blog, this.httpOptions).pipe(
      tap((newBlog: Blog) => this.log(`added blog w/ id=${newBlog.id}`)),
      catchError(this.handleError<Blog>('addBlog'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(blog: Blog | number): Observable<Blog> {
    const id = typeof blog === 'number' ? blog : blog.id;
    const url = `${this.blogsUrl}/${id}`;

    return this.http.delete<Blog>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted blog id=${id}`)),
      catchError(this.handleError<Blog>('deleteBlog'))
    );
  }

  /** PUT: update the blog on the server */
  updateBlog(blog: Blog): Observable<any> {
    return this.http.put(this.blogsUrl, blog, this.httpOptions).pipe(
      tap(_ => this.log(`updated blog id=${blog.id}`)),
      catchError(this.handleError<any>('updateBlog'))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getBlogNo404<Data>(id: number): Observable<Blog> {
    const url = `${this.blogsUrl}/?id=${id}`;
    return this.http.get<Blog[]>(url)
      .pipe(
        map(blogs => blogs[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} blo id=${id}`);
        }),
        catchError(this.handleError<Blog>(`getBlog id=${id}`))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`BlogService: ${message}`);
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
