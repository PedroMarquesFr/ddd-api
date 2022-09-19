import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/product.create.usecase";
import ListProductUseCase from "../../../usecase/product/list/product.list.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ProductPresenter from "../presenters/product.presenter";
const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  try {
    const usecase = new CreateProductUseCase(new ProductRepository());
    const { name, price } = req.body;
    const productInputDTO = {
      name,
      price,
    };

    const output = await usecase.execute(productInputDTO);
    return res.status(201).json(output);
  } catch (err) {
    return res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const usecase = new ListProductUseCase(new ProductRepository());
    const inputDTO = {};
    const output = await usecase.execute(inputDTO);
    res.format({
        json: async () => res.send(output),
        xml: async () => res.send(ProductPresenter.listXML(output)),
      });
  } catch (err) {
    return res.status(500).send(err);
  }
});

export { productRoute };
