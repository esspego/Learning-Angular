export class ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;

  constructor(){
    this.available = true;
  }
}
