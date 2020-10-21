import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { User } from '../ViewModels/user';
import { environment } from 'src/environments/environment';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService   {
  isLogin:boolean = false;
 
  constructor(private Http:HttpClient ) { }





  add(user:User)
  {
    var reqHeader =new HttpHeaders({'No-Auth' : 'true'});
    return this.Http.post(`${environment.API_URL}/api/Account`,user);
  }

  UserAuthentication(username,password)
  {


     var data ="UserName="+username+"&Password="+password+"&grant_type=password";
     var reqHeader= new HttpHeaders({'Content-Type':'application/x-www-urlencoded','No-Auth' : 'true'});
    console.log(username,password)
      
     return this.Http.post(`${environment.API_URL}/login`,data,{headers:reqHeader});
  }
}
