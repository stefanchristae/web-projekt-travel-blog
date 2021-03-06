import { Injectable } from '@angular/core';
import { Blog } from './blog';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogsUrl = 'http://localhost:4200/api/blogs';  // URL to web api
  private adminUrl = 'http://localhost:4200/api/admin';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    console.log('Client - GET Blogs');
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

  getUserBlogs(username: String): Observable<Blog[]> {
    const url = `${this.adminUrl}/${username}`;
    return this.http.get<Blog[]>(url).pipe(
      tap(_ => this.log(`fetched user username=${username}`)),
      catchError(this.handleError<Blog[]>(`getUserBlogs username=${username}`))
    );
  }

  addBlog(blog: Blog, username: String): Observable<Blog> {
    blog.username = username;
    console.log(this.blogsUrl);
    console.log(blog);
    return this.http.post<Blog>(this.blogsUrl, blog, this.httpOptions).pipe(
      tap((newBlog: Blog) => this.log(`added blog w/ id=${newBlog._id}`)),
      catchError(this.handleError<Blog>('addBlog'))
    );
  }

  deleteBlog(blog: Blog | number): Observable<Blog> {
    const id = typeof blog === 'number' ? blog : blog._id;
    const url = `${this.blogsUrl}/${id}`;

    return this.http.delete<Blog>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted blog id=${id}`)),
      catchError(this.handleError<Blog>('deleteBlog'))
    );
  }

  updateBlog(blog: Blog): Observable<any> {
    return this.http.put(this.blogsUrl, blog, this.httpOptions).pipe(
      tap(_ => this.log(`updated blog id=${blog._id}`)),
      catchError(this.handleError<any>('updateBlog'))
    );
  }

  getBlogNo404<Data>(id: number): Observable<Blog> {
    const url = `${this.blogsUrl}/?id=${id}`;
    return this.http.get<Blog[]>(url)
      .pipe(
        map(blogs => blogs[0]), 
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} blo id=${id}`);
        }),
        catchError(this.handleError<Blog>(`getBlog id=${id}`))
      );
  }

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
