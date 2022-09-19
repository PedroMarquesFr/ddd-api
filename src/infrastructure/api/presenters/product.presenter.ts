import { toXML } from "jstoxml";
import { OutputListProductDto } from "../../../usecase/product/list/product.list.dto";

export default class CustomerPresenter {
  static listXML(data: OutputListProductDto): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        products: {
          product: data.products.map(({ id, name, price }) => ({
            id,
            name,
            price,
          })),
        },
      },
      xmlOption
    );
  }
}
