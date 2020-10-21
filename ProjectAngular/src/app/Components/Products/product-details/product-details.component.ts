import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiProductService } from 'src/app/Services/api-product.service';
import { IProductApi } from 'src/app/ViewModels/iproduct-api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  prdApI:IProductApi;
  PID:number;
  constructor(private activeRoute:ActivatedRoute,
    private prdService:ApiProductService,private location:Location) { }
    goBack()
    {
      this.location.back()
    }


  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(
      params =>{this.PID=Number(params.get('id'));
   
      this.prdService.getProduct(this.PID).subscribe(
       (Response)=>{
        console.log(Response); 
        this.prdApI=Response},
       (err)=>{console.log(err)}
   
   );
     
     
     }
   
   
       );


  }

}
