import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/product.create.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
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

export { productRoute };
