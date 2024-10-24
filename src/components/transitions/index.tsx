"use client";
import React from "react";
import { Input } from "../ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import useTransactions from "./useTransactions";
import { Button } from "../ui/button";
import Link from "next/link";

const TransactionList = () => {
  const { transactions, loading, setSearchTerm } = useTransactions(); // Desestruturando setSearchTerm

  if (loading) {
    return <p>Carregando transações...</p>;
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transações recentes</h2>
        <Input
          type="search"
          placeholder="Buscar Transação"
          className="max-w-xs"
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca diretamente do hook
        />
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
          {transactions.map((transaction) => (
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
              <TableCell className="text-right">{transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Contêiner para o botão */}
      <div className="flex justify-end mt-4">
        <Link href="/app/transaction">
          {" "}
          {/* Altere o caminho de acordo com a sua estrutura de rotas */}
          <Button variant="link">Ver mais.</Button>
        </Link>
      </div>
    </div>
  );
};

export default TransactionList;
