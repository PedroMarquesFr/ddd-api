import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./product.find.usecase";

const product = new Product("123", "carro", 10);
const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

const input = {
  id: "123",
};

describe("Unit test find product use case", () => {
  test("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);
    const output = await usecase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: output.name,
      price: output.price,
    });
  });
  test("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(productRepository);
    expect(() => usecase.execute(input)).rejects.toThrow("Product not found");
  });
});
