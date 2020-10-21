import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProductApi } from '../ViewModels/iproduct-api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  constructor( private HttpClent:HttpClient) { 

  }
  getAllProduct():Observable<IProductApi[]>
   {
        return this.HttpClent.get<IProductApi[]>(`${environment.API_URL}/api/product`);
   }
   getProduct(PID):Observable<IProductApi>
   {
     return this.HttpClent.get<IProductApi>(`${environment.API_URL}/api/product/${PID}`)
   }
   postfile(Name:string,fileToUpload:File,Description:string,Quantity:string,Price:string)
   {
  

     const endpoint=`${environment.API_URL}/api/Upload`;
     const formData:FormData=new FormData();
     formData.append('Image',fileToUpload,fileToUpload.name);
     formData.append('Name',Name);
     formData.append('Description',Description);
     formData.append('Quantity',Quantity);
     formData.append('Price',Price);
     return this.HttpClent.post(endpoint,formData);
   }
   deleteProduct(Pid:number)
   {
     
   
        

     return this.HttpClent.delete(`${environment.API_URL}/api/product/${Pid}`);
   }
   putfile(Name:string,fileToUpload:File,Description:string,Quantity:string,Price:string,Prd:IProductApi)
   {

    



    

    const endpoint=`${environment.API_URL}/api/product/${Prd.ID}`;
    const formData:FormData=new FormData();
    formData.append('Image',fileToUpload,fileToUpload.name);
    formData.append('Name',Name);
    formData.append('Description',Description);
     formData.append('Quantity',Quantity);
     formData.append('Price',Price);

    return this.HttpClent.put(endpoint,formData);


   }
}
