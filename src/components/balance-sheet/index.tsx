'use client';
// app/page.tsx ou app/app/page.tsx
import React from "react";
import { Button } from "../ui/button";
import { BadgeCheck } from "lucide-react";
import useBalance from "./useBalanceSheet";

export default function BalanceSheet() {
  const { creditSummary, loading } = useBalance(); // Usar o hook para obter o credit-summary

  if (loading) {
    return <p>Carregando...</p>; // Exibir indicador de carregamento enquanto os dados são buscados
  }

  if (!creditSummary) {
    return <p>Não foi possível carregar os dados.</p>; // Mensagem de erro caso não haja dados
  }

  const { amount, last_service } = creditSummary; // Desestrutura os dados

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Balance Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Créditos</h2>
        <div className="flex gap-2 items-center">
          <BadgeCheck />
          <p className="text-3xl font-bold">{amount.balance}</p> {/* Mostra o saldo */}
        </div>
      </div>

      {/* Last Service Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cashflow</h2>
          <Button variant="link">Histórico de uso</Button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Último Serviço Utilizado</h2>

        {last_service ? (
          <>
            <p className="text-lg font-semibold">{last_service.service.name}</p>
            <p className="text-gray-500">
              Créditos utilizados: {last_service.credits_used}
            </p>
            <p className="text-sm text-gray-500">
              Utilizado em: {new Date(last_service.used_at).toLocaleString()}
            </p> {/* Formata a data */}
          </>
        ) : (
          <p className="text-gray-500">Nenhum serviço utilizado.</p>
        )}
      </div>
    </div>
  );
}
