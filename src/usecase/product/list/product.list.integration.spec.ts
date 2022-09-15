import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./product.list.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    //Arrange
    const product = new Product("2", "glass", 2000);
    const secProduct = new Product("3", "book", 30);

    const repository = new ProductRepository();
    await repository.create(product);
    await repository.create(secProduct);

    //Act
    const input = {};
    const useCase = new ListProductUseCase(repository);
    const result = await useCase.execute(input);

    //Assert
    const output = {
      products: [
        { id: product.id, name: product.name, price: product.price },
        { id: secProduct.id, name: secProduct.name, price: secProduct.price },
      ],
    };
    expect(result).toEqual(output);
  });
});
