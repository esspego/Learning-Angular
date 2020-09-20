import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  product = new ProductModel();
  constructor(private productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
      this.productService.getProduct(id).subscribe((resp: ProductModel) =>{
        this.product = resp;
        this.product.id = id;
      });
    }
  }
  saveProduct(form: NgForm){
    if (form.invalid){
      console.log('Formulario no válido')
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let request: Observable<any>;
    if (this.product.id ){
      request = this.productService.editProduct(this.product)
    }else{
      request = this.productService.createProduct(this.product);
    }
    request.subscribe(res => {
      Swal.fire({
        title: this.product.name,
        text: 'Se actualizó correctamente',
      });
    });
  }

}
