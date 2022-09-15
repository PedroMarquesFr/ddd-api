import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUsaCase from "./products.update.usecase";

describe("Test update product use case", () => {
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
    const useCase = new UpdateProductUsaCase(repository);
    const input = { id: "2", name: "glass", price: 2001 };
    const result = await useCase.execute(input);

    //Assert
    const output = { id: "2", name: "glass", price: 2001 };
    expect(result).toEqual(output);
  });
});
