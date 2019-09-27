import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  blogs: Blog[];
  username: String;

  constructor(    
    private route: ActivatedRoute,
    private blogService: BlogService,
    ) { }

  ngOnInit() {
    this.getUserBlogs();
  }

  getUserBlogs(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    console.log("GetuserBlogs: " +  this.username);
    if( this.username !== "")
    {
      this.blogService.getUserBlogs(this.username).subscribe(blogs => this.blogs = blogs);
    }
  }
}