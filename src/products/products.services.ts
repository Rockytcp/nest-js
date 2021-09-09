import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './model/product.entity';
import { ProductInterface } from './model/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  insertProduct(title: string, description: string, price: string) {
    const prodId = uuid().toString();
    const newProduct = {
      id: prodId,
      title: title,
      description: description,
      price: price,
    };
    return this.productRepository.save(newProduct);
  }

  async getProducts(): Promise<ProductInterface[]> {
    const products = await this.productRepository.find();
    if (products.length === 0) {
      throw new NotFoundException('Products nor found.');
    }
    return products;
  }

  async getProductById(productId: string) {
    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    return product;
  }

  // updateProduct(
  //   productId: string,
  //   productTitle: string,
  //   productDescription: string,
  //   productPrice: number,
  // ) {
  //   const [product, index] = this.findProduct(productId);
  //   const updateProduct = { ...product };
  //   if (productTitle) {
  //     updateProduct.title = productTitle;
  //   }
  //   if (productDescription) {
  //     updateProduct.description = productDescription;
  //   }
  //   if (productPrice) {
  //     updateProduct.price = productPrice;
  //   }
  //   return (this.products[index] = updateProduct);
  // }

  // deleteProduct(productId: string) {
  //   const [product, index] = this.findProduct(productId);
  //   this.products.splice(index, 1);
  //   return product.id;
  // }

  // private findProduct(productId: string): [Product, number] {
  //   const productIndex = this.products.findIndex(
  //     (prod) => prod.id === productId,
  //   );
  //   const product = this.products[productIndex];
  //   if (!product) {
  //     throw new NotFoundException('Product not found.');
  //   }
  //   return [product, productIndex];
  // }
}
