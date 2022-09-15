import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./product.create.usecase";

describe("Test create product use case", () => {
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

  it("should create a product", async () => {
    //Arrange
    const repository = new ProductRepository();
    
    //Act
    const input = {
      name: "2",
      price: 2000,
    };
    const useCase = new CreateProductUseCase(repository);
    const result = await useCase.execute(input);

    //Assert
    const output = { id: expect.any(String), name: input.name, price: input.price };
    expect(result).toEqual(output);
  });
});
