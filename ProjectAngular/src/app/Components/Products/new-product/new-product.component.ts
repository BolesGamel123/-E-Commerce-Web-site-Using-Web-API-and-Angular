import { Component, OnInit } from '@angular/core';
import { ApiProductService } from 'src/app/Services/api-product.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
imageUrl:string="/assets/img/default.jpg";
fileToUpload:File=null;

  constructor(private imageService:ApiProductService,private route:Router,
    private user:UserService) { }

  ngOnInit(): void {
  }
  
  
  handFileInput(file:FileList)
  {
     this.fileToUpload=file.item(0);



     var reader=new FileReader();
     reader.onload=(event:any)=>{

     this.imageUrl=event.target.result;

     }
     reader.readAsDataURL(this.fileToUpload);
       
  }

  onsubmit(Name,Image,Description,Quantity,Price)
  {

     this.imageService.postfile(Name.value,this.fileToUpload,Description.value,Quantity.value,Price.value).subscribe(
     
     data=>{console.log("done");
     Name.value=null;
     Image.value=null;
     Description.value=null;
     Quantity.value=null;
     Price.value=null;
     this.imageUrl="/assets/img/default.jpg";
     this.route.navigateByUrl('/Products');
    
    }

     );

  }


}
