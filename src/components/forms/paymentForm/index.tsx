import React from "react";
import { Button } from "@/components/ui/button"; // Importe o botão
import { Input } from "@/components/ui/input";

interface PaymentFormProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  onPayment: () => Promise<void>;
  loading: boolean;
  iframeVisible: boolean;
  paymentUrl: string | null; // Adiciona paymentUrl como prop
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  quantity,
  setQuantity,
  onPayment,
  loading,
  iframeVisible,
  paymentUrl,
}) => {
  return (
    <div className="bg-white" style={{ padding: "10px" }}>
      <label htmlFor="credit-quantity">Quantidade de Créditos:</label>
      <div className="flex gap-4 mb-4">
        <Input
          id="credit-quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
        />
        <Button onClick={onPayment} disabled={loading}>
          {loading ? "Processando..." : "Gerar Pagamento"}
        </Button>
      </div>
      {iframeVisible && paymentUrl && (
        <iframe
          src={paymentUrl}
          width="100%"
          height="600"
          style={{ border: "none" }}
          title="Payment"
        />
      )}
    </div>
  );
};

export default PaymentForm;
