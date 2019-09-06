import { Injectable } from '@angular/core';
import { Blog } from './blog';
import { MOCK_BLOGS } from './mock-blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }

  getBlogs(): Blog[] {
    return MOCK_BLOGS;
  }

  getBlog(id: number): Blog { 
    console.log(MOCK_BLOGS.find(blog => blog.id === id));
    return MOCK_BLOGS.find(blog => blog.id === id);
  }
}
