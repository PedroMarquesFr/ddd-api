interface InputFindCustomerDTO {
  id: string;
}

interface OutputFindCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}

export { InputFindCustomerDTO, OutputFindCustomerDTO };
