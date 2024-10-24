"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Importe o botão
import PaymentModal from "@/components/paymentModal";
import usePayments from "./usePayments";


const ButtonReload = () => {
  const { createPayment, loading, paymentUrl } = usePayments(); // Adicione paymentUrl
  const [showPaymentDiv, setShowPaymentDiv] = useState(false); // Estado para controlar a exibição da div

  const handleOpenDiv = () => {
    setShowPaymentDiv(true); // Abre a div com o input para a quantidade de créditos
  };

  return (
    <>
      {" "}
      <Button onClick={handleOpenDiv}>Comprar Créditos</Button>
      {showPaymentDiv && (
        <PaymentModal
          onClose={() => setShowPaymentDiv(false)}
          createPayment={createPayment}
          loading={loading}
          paymentUrl={paymentUrl}
        />
      )}
    </>
  );
};

export default ButtonReload;
