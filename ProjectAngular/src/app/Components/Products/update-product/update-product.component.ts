import { Component, OnInit } from '@angular/core';
import { IProductApi } from 'src/app/ViewModels/iproduct-api';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProductService } from 'src/app/Services/api-product.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  PID:number;
  prdApI:IProductApi;
  fileToUpload:File=null;
  constructor(private activeRoute:ActivatedRoute,
    private prdService:ApiProductService,private route:Router,private user:UserService ) { }

  ngOnInit(): void {
    
    this.PID=this.activeRoute.snapshot.params['pid']; 
    
    this.prdService.getProduct(this.PID).subscribe(
       (Response)=>{
        console.log(Response); 
        this.prdApI=Response},
       (err)=>{console.log(err)}

    );
  
  }
  handFileInput(file:FileList)
  {
     this.fileToUpload=file.item(0);



     var reader=new FileReader();
     reader.onload=(event:any)=>{

   

     }
     reader.readAsDataURL(this.fileToUpload);
       
  }

  Save(Name,Image,Description,Quantity,Price)
  {

    this.prdService.putfile(Name.value,this.fileToUpload,Description.value,Quantity.value,Price.value,this.prdApI).subscribe(
      data=>{console.log("done");
      Name.value=null;
      Image.value=null;
      this.route.navigateByUrl('/Products');}


    );
    
   
    
   }

    

}
