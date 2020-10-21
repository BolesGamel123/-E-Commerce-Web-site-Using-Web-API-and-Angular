import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/ViewModels/user';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError:boolean = false ;
 
  constructor(private UserSer:UserService,private route:Router) {   
  }

  ngOnInit(): void {
  }
  
  onsubmit(username,password)
  {

      this.UserSer.UserAuthentication(username,password).subscribe(
      (data:any)=>{
        console.log(data);
     localStorage.setItem('UserToken',data.access_token);
     this.route.navigateByUrl('/Products');
     this.UserSer.isLogin = true;

      },
      (err:HttpErrorResponse)=>{
     this.isLoginError=true;
    }

      );
  }

}
