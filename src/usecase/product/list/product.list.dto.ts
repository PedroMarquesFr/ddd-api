interface InputListProductDto {}

type Product = {
  id: string;
  name: string;
  price: number;
};

interface OutputListProductDto {
  products: Product[];
}

export { InputListProductDto, OutputListProductDto };
