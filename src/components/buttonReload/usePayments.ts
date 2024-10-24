import axiosInstance from '@/app/services/http/axiosConfig';
import { useState } from 'react';

const usePayments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const createPayment = async (quantity: number) => {
    setLoading(true);
    setError(null);
    setPaymentUrl(null); // Reseta a URL de pagamento

    try {
      const response = await axiosInstance.post('payments/create/', {
        quantity,
      });

      // Armazena a URL de pagamento
      const url = response.data.paymentUrl; // Supondo que a resposta tenha a URL de pagamento
      setPaymentUrl(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createPayment,
    loading,
    error,
    paymentUrl,
  };
};

export default usePayments;
