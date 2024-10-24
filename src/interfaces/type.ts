// types.ts
export interface IProfile {
  pk: string;
  user_email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
  picture: string;
  avatar: File | null;
}

export interface Service {
  name: string;
  cost_in_credits: string;
}

export interface LastService {
  id: number;
  service: Service;
  credits_used: string;
  used_at: string;
}

export interface BalanceSheetData {
  amount: {
    balance: string; // Acredito que aqui seja o saldo
    created_at: string; // Data de criação (não utilizado aqui, mas pode ser útil)
    updated_at: string; // Data de atualização (também não utilizado, mas pode ser útil)
  };
  last_service: LastService; // Detalhes do último serviço utilizado
}
// app/interfaces/type.ts
export interface CreditTransactionData {
  transaction_type: "ADD" | "DEDUCT"; // Tipo da transação
  amount: string; // Montante da transação
  created_at: string; // Data e hora da transação
  description: string | null; // Descrição da transação, pode ser nula
}

export interface dataImagesCarouselProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    generated_images: IimageData[]; // array de IimageData
  };
}

export interface IimageData {
  pk_image: string;
  created_at: string;
  image_url: string;
  prompt: string;
}
