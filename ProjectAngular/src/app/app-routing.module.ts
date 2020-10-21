import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllProductComponent } from './Components/Products/all-product/all-product.component';
import { ProductDetailsComponent } from './Components/Products/product-details/product-details.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProductAdminComponent } from './Components/Products/product-admin/product-admin.component';
import { NewProductComponent } from './Components/Products/new-product/new-product.component';
import { UpdateProductComponent } from './Components/Products/update-product/update-product.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:'home', component:AllProductComponent},
  {path:'Product/:id',component:ProductDetailsComponent},
  {path:'Products',component:ProductAdminComponent,canActivate:[AuthGuard]},
  {path:'NewProduct',component:NewProductComponent},
  {path:'EditProduct/:pid',component:UpdateProductComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Login',component:LoginComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
