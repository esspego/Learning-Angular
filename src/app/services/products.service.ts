import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProductModel } from '../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'https://angular-learning-8d8ed.firebaseio.com';
  constructor(private  http: HttpClient ) { }

  createProduct(product: ProductModel){

    return this.http.post(`${this.url}/products.json`, product).pipe(
      map( (resp: any) => {
        product.id = resp.name;
        return product;
      })
    );
  }
  editProduct(product: ProductModel){
    const productTemp = {
      ...product
    };
    delete productTemp.id;
    return this.http.put(`${this.url}/products/${product.id}.json`, product);
  }
  getProducts(){
    return this.http.get(`${this.url}/products.json`).pipe(
      map( resp => this.arrayProducts(resp)/* this.arrayProducts así también valdría */)
    )
  }
  private arrayProducts( productsObj: object){
    const products: ProductModel[] = [];
    console.log(productsObj);

    Object.keys( productsObj).forEach( key => {
      const product: ProductModel = productsObj[key];
      product.id = key;
      products.push(product);
    });

    if( productsObj === null ){
      return [];
    }

    return products;
  }
  getProduct(id:string){
    return this.http.get(`${this.url}/products/${id}.json`);
  }
  deleteProduct(id:string){
    return this.http.delete(`${this.url}/products/${id}.json`);
  }
}
