import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  blogs: Blog[];
  username: String;
  blog: Blog;
  addBlogForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    ) {
      this.addBlogForm = new FormGroup({
        title: new FormControl(null, Validators.required),
        destination: new FormControl(null, Validators.required),
        travelStartDate: new FormControl(null, Validators.required),
        travelPeriod: new FormControl(null, Validators.required),
        shorttext: new FormControl(null, Validators.required),
        blogtext: new FormControl(null, Validators.required)
      });
     }

  ngOnInit() {
    this.getUserBlogs();
  }

  getUserBlogs(): void {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    console.log("GetuserBlogs: " +  this.username);
    if( this.username !== "")
    {
      this.blogService.getUserBlogs(this.username).subscribe(blogs => this.blogs = blogs);
    }
  }

  isValid(controlName) {
    return this.addBlogForm.get(controlName).invalid && this.addBlogForm.get(controlName).touched;
  }

  addBlog(): void {
    if( this.addBlogForm.valid) {
      this.blogService.addBlog(this.addBlogForm.value, this.username);
      this.getUserBlogs();
    }
  }

  deleteBlog(blog: Blog): void {
    this.blogs = this.blogs.filter(b => b !== blog);
    this.blogService.deleteBlog(blog).subscribe();
    this.getUserBlogs();
  }
  editBlog(blog: Blog): void {
    // TODO: add function to edit a blog.
  }
}