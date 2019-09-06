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
}
