import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogService }  from '../blog.service';
import { Blog }  from '../blog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getBlog();
  }
  
  getBlog(): void {
    const id = + this.route.snapshot.paramMap.get('_id');
    this.blogService.getBlog(id).subscribe(blog => this.blog = blog);
  }

  goBack(): void {
    this.location.back();
  }
}
