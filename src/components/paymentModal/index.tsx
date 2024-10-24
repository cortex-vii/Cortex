import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Importe o botão
import PaymentForm from "../forms/paymentForm"; // Importa o componente PaymentForm
import * as styles from "./styles"; // Importe os estilos

interface PaymentModalProps {
  onClose: () => void;
  createPayment: (quantity: number) => Promise<void>;
  loading: boolean;
  paymentUrl: string | null; // Adiciona paymentUrl como prop
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, createPayment, loading, paymentUrl }) => {
  const [quantity, setQuantity] = useState(1); // Estado para armazenar a quantidade de créditos
  const [iframeVisible, setIframeVisible] = useState(false); // Estado para controlar a exibição do iframe

  const handlePayment = async () => {
    await createPayment(quantity); // Acione a criação do pagamento com a quantidade desejada
    if (paymentUrl) {
      setIframeVisible(true); // Exibe o iframe com o link de pagamento
    }
  };

  useEffect(() => {
    if (paymentUrl) {
      setIframeVisible(true); // Exibe o iframe assim que o paymentUrl estiver disponível
    }
  }, [paymentUrl]);

  return (
    <div style={styles.modalStyle}>
      <div style={styles.innerDivStyle}>
        <div style={styles.headerStyle}>
          <h2>Pagamento</h2>
          <Button onClick={onClose}>Fechar</Button>
        </div>
        <PaymentForm
          quantity={quantity}
          setQuantity={setQuantity}
          onPayment={handlePayment}
          loading={loading}
          iframeVisible={iframeVisible}
          paymentUrl={paymentUrl}
        />
      </div>
    </div>
  );
};

export default PaymentModal;
