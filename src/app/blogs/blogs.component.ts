import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[];
  selectedBlog: Blog;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getBlogs();
  }

  onSelect(blog: Blog): void {
    this.selectedBlog = blog;
    console.log(this.selectedBlog);
  }
  
  // retrieve the blogs from the service.
  getBlogs(): void {
    this.blogs = this.blogService.getBlogs();
  }
}
