import { Injectable } from '@angular/core';
import { Blog } from './blog';
import { MOCK_BLOGS } from './mock-blog';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }

  getBlogs(): Observable<Blog[]> {
    return of(MOCK_BLOGS);
  }

  getBlog(id: number):  Observable<Blog> { 
    return of(MOCK_BLOGS.find(blog => blog.id === id));
  }
}
