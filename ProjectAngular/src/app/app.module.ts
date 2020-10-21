import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/LayoutComponents/header/header.component';
import { FooterComponent } from './Components/LayoutComponents/footer/footer.component';
import { ContentComponent } from './Components/LayoutComponents/content/content.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AllProductComponent } from './Components/Products/all-product/all-product.component';
import { ProductDetailsComponent } from './Components/Products/product-details/product-details.component';
import { ProductAdminComponent } from './Components/Products/product-admin/product-admin.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NewProductComponent } from './Components/Products/new-product/new-product.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { UpdateProductComponent } from './Components/Products/update-product/update-product.component';
import { HighLightDirective } from './Directives/high-light.directive';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoadingSpinnersComponent } from './Components/loading-spinners/loading-spinners.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    AllProductComponent,
    ProductDetailsComponent,
    ProductAdminComponent,
    NotFoundComponent,
    NewProductComponent,
    UpdateProductComponent,
    HighLightDirective,
    LoginComponent,
    RegisterComponent,
    LoadingSpinnersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' ,  
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
