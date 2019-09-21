import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/blogs', pathMatch: 'full'
  },
  {
    path: "blogs", component: BlogsComponent
  },
  {
    path: "detail/:id", component: BlogDetailComponent
  },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "login", component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
