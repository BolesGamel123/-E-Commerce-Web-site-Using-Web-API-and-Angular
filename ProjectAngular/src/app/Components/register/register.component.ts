import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/ViewModels/user';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading :boolean = false ;
  user:User;
  constructor(
    private UserSer:UserService,private route:Router
  ) { 

    this.user={
      UserName:'',
      Password:'',
      ConfirmPassword:'',
      Email:''
     }
  }

  ngOnInit(): void {
  }

  
  addUser()
  {
    
    this.isLoading=true;
    this.UserSer.add(this.user).subscribe(
      (Response)=>{
        window.alert('SuccessFull Register');
        this.route.navigateByUrl('/Login')},
        (err)=>{console.log(err);
          this.isLoading=false;
        
        }
     

    );

}
}
