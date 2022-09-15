import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./product.find.usecase";

describe("Test find product use case", () => {
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

    const repository = new ProductRepository();
    await repository.create(product);

    //Act
    const input = {
      id: "2",
    };
    const useCase = new FindProductUseCase(repository);
    const result = await useCase.execute(input);

    //Assert
    const output = { id: product.id, name: product.name, price: product.price };
    expect(result).toEqual(output);
  });
});
