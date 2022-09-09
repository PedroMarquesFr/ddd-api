import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./product.list.usecase";

const productA = ProductFactory.create("a", "producA", 10);
const productB = ProductFactory.create("b", "producB", 11);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
  };
};

describe("Unit test for listing Product use case", () => {
  it("should list Products", async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);

    const output = await useCase.execute({});
    const { products } = output;

    expect(products.length).toBe(2);
    expect(products[0].id).toBe(productA.id);
    expect(products[0].name).toBe(productA.name);
    expect(products[0].price).toBe(productA.price);
    expect(products[1].id).toBe(productB.id);
    expect(products[1].name).toBe(productB.name);
    expect(products[1].price).toBe(productB.price);
  });
});
