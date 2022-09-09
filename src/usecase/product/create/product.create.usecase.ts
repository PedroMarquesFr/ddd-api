import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./product.create.dto";
import { v4 as uuid } from "uuid";
import ProductFactory from "../../../domain/product/factory/product.factory";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }
  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const { name, price } = input;
    const product = ProductFactory.create("a", name, price);

    await this.productRepository.create(product);

    return { id: product.id, name, price };
  }
}
