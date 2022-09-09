import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./product.create.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

const input = {
  name: "name",
  price: 10,
};

describe("Unit test create product use case", () => {
  let productRepository: ProductRepository;
  let createProductUseCase: CreateProductUseCase;

  beforeEach(() => {
    productRepository = MockRepository();
    createProductUseCase = new CreateProductUseCase(productRepository);
  });

  test("should create a product", async () => {
    const output = await createProductUseCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      ...input,
    });
  });

  test("should throw an erros when name is missing", async () => {
    await expect(
      createProductUseCase.execute({ ...input, name: "" })
    ).rejects.toThrow("Name is required");
  });
  test("should throw an erros when price is negative", async () => {
    await expect(
      createProductUseCase.execute({ ...input, price: -1 })
    ).rejects.toThrow("Price must be greater than zero");
  });
});
