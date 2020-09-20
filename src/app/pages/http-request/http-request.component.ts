import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductModel } from '../../models/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-http-request',
  templateUrl: './http-request.component.html',
  styleUrls: ['./http-request.component.css']
})
export class HttpRequestComponent implements OnInit {
  products: ProductModel[] = [];
  loading = false;

  constructor(private productsService: ProductsService ) { }

  ngOnInit(): void {
    this.loading= true;
    this.productsService.getProducts().subscribe(resp => {
      this.products = resp;
      this.loading = false;
    });
  }
  deleteProduct( product: ProductModel, i: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro de que desea borrar ${product.name}`,
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if (resp.value){
        this.products.splice( i, 1 );
        this.productsService.deleteProduct(product.id).subscribe();
      }
    });

  }

}
