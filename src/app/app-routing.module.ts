import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/blogs', pathMatch: 'full'
  },
  {
    path:"blogs", component: BlogsComponent
  }
  ,
  {
    path:"detail/:id", component: BlogDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
