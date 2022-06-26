import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDataComponent } from './edit-data/edit-data.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'view', component:ViewComponent},
  {path:'edit', component:EditDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }