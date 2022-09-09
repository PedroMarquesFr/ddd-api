import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./product.update.dto";

export default class UpdateProductUsaCase {
  private productRepository: ProductRepository;
  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.find(input.id);
    product.changeName(input.name );
    product.changePrice(input.price);
    await this.productRepository.update(product);
    return { id: input.id, name: product.name, price: product.price };
  }
}
