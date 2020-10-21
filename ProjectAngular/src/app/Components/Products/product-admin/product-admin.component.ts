import { Component, OnInit } from '@angular/core';
import { ApiProductService } from 'src/app/Services/api-product.service';
import { IProductApi } from 'src/app/ViewModels/iproduct-api';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
  popoverTitle :string; 
 popoverMessage :string
 confirmClicked :boolean;
 cancelClicked :boolean;
 pID:number;

  PrdList:IProductApi[];
  constructor(private PrdService:ApiProductService) {
    this.popoverTitle = 'Confirm';
    this.popoverMessage = 'Are you sure to delete ';
    this.confirmClicked = false;
     this.cancelClicked = false;
   }

  ngOnInit(): void {

    this.PrdService.getAllProduct().subscribe(

      (response)=>{
        this.PrdList=response;
      },
      (err)=>{
        console.log(err);
      }
  
  
      );

  }
  
     deleteProd(pID){
    this.PrdService.deleteProduct(pID).subscribe(
      (response) => {
      this.ngOnInit();
        console.log("deleted")
      });
    
  }

}
