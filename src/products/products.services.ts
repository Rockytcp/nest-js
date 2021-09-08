import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = uuid().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return newProduct;
  }

  getProducts() {
    if (this.products.length === 0) {
      throw new NotFoundException('Products nor found.');
    }
    return [...this.products];
  }

  getProductById(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(
    productId: string,
    productTitle: string,
    productDescription: string,
    productPrice: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };
    if (productTitle) {
      updateProduct.title = productTitle;
    }
    if (productDescription) {
      updateProduct.description = productDescription;
    }
    if (productPrice) {
      updateProduct.price = productPrice;
    }
    return (this.products[index] = updateProduct);
  }

  deleteProduct(productId: string) {
    const [product, index] = this.findProduct(productId);
    this.products.splice(index, 1);
    return product.id;
  }

  private findProduct(productId: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (prod) => prod.id === productId,
    );
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    return [product, productIndex];
  }
}
