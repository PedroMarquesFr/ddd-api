import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUsaCase from "./products.update.usecase";

const product = ProductFactory.create("a", "name", 20);

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  update: jest.fn(),
  findAll: jest.fn(),
});

const input = { id: "123", name: "newName", price: 2 };

describe("Unit test for update a product", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUsaCase(productRepository);
    const output = await usecase.execute(input);
    expect(output).toEqual(input);
  });
});
