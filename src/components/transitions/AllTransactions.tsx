// app/components/AllTransactions.tsx
"use client";
import React, { useState } from "react";
import { Input } from "../ui/input"; // Certifique-se de que o caminho esteja correto
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table"; // Certifique-se de que o caminho esteja correto
import { Button } from "../ui/button";
import useTransactions from "./useTransactions";

const AllTransactions = () => {
  const {
    transactions,
    loading,
    setSearchTerm,
    fetchTransactionsFromBackend,
    fetchMoreTransactions, // Adiciona a função para buscar mais transações
    totalIncome,
    totalExpense,
    hasMore, // Adiciona o estado que indica se há mais páginas
  } = useTransactions();

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    fetchTransactionsFromBackend(); // Chama a função para buscar no backend
  };

  if (loading) {
    return <p>Carregando transações...</p>;
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Todas as Transações</h2>
        <div className="flex items-center">
          <Input
            type="search"
            placeholder="Buscar Transação"
            className="max-w-xs mr-2"
            value={searchInput} // Controla o valor do input
            onChange={(e) => {
              setSearchInput(e.target.value); // Atualiza o estado local
              setSearchTerm(e.target.value); // Atualiza o termo de busca
            }}
          />
          <Button onClick={handleSearch}>Buscar</Button>{" "}
          {/* Botão para buscar */}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Informações</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Nenhuma transação encontrada.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.created_at}>
                <TableCell>
                  {new Date(transaction.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      transaction.transaction_type === "ADD"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.transaction_type === "ADD"
                      ? "Added"
                      : "Deducted"}
                  </span>
                </TableCell>
                <TableCell>{transaction.description || "N/A"}</TableCell>
                <TableCell className="text-right">
                  {transaction.amount}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end mt-4">
        {hasMore && ( // Verifica se há mais transações para carregar
          <Button
            variant="link"
            onClick={fetchMoreTransactions}
            disabled={loading}
            className="text-blue-600 hover:text-blue-800"
          >
            Ver mais
          </Button>
        )}
      </div>

      {/* Totais em uma área destacada */}
      <div className="bg-gray-100 p-4 rounded-lg mt-6 shadow">
        <h3 className="text-lg font-semibold mb-2">Totais</h3>
        <div className="flex flex-col gap-4 text-sm">
          <div>
            <span className="text-green-600">
              Total de Entradas: <strong>${totalIncome.toFixed(2)}</strong>
            </span>
          </div>
          <div>
            <span className="text-red-600">
              Total de Saídas: <strong>${totalExpense.toFixed(2)}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTransactions;
