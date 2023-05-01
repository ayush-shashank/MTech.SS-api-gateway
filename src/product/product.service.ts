import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  create(createProductDto: CreateProductDto) {
    return this.client.send('createProduct', createProductDto);
    // return 'This action adds a new product';
  }

  findAll() {
    return this.client.send('findAllProduct', {});
    // return `This action returns all product`;
  }

  findByName(name: string) {
    return this.client.send('findByNameProduct', name);
  }

  findById(id: number) {
    return this.client.send('findOneProduct', id);
    // return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.client.send('updateProduct', { id, updateProductDto });
    // return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return this.client.send('removeProduct', { id });
    // return `This action removes a #${id} product`;
  }
}
