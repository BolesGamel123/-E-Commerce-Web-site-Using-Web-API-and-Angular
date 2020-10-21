
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest,HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';


@Injectable({
    providedIn: 'root'
  })
  export class AuthInterceptor implements HttpInterceptor
  {
      constructor(private route:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get('No-Auth') == "true")
        return next.handle(req.clone());

       if (localStorage.getItem('UserToken') != null)
       {
           const clonedreq =req.clone({
               headers:req.headers.set("Authorization","Bearer"+localStorage.getItem('UserToken'))
           });

           return next.handle(clonedreq)
           .do(
               succ=>{},
               err=>{
                   debugger;
                   if(err.status === 401)
                   this.route.navigateByUrl('/Login');
               }
           );

       }else
       {
           this.route.navigateByUrl('/Login');
       }




    }

  }

