import { Component, OnInit } from '@angular/core';
import { ApiProductService } from 'src/app/Services/api-product.service';
import { IProductApi } from 'src/app/ViewModels/iproduct-api';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  PrdList:IProductApi[];

  constructor(private PrdService:ApiProductService) { }

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

}
