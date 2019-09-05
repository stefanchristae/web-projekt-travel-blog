import { Component, OnInit } from '@angular/core';
import { MOCK_BLOGS } from '../mock-blog';
import { Blog } from '../blog';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs = MOCK_BLOGS;
  selectedBlog: Blog;

  constructor() { }

  ngOnInit() {
    // Blogs auflisten
  }

  onSelect(blog: Blog): void {
    this.selectedBlog = blog;
    console.log(this.selectedBlog);
  }
}
