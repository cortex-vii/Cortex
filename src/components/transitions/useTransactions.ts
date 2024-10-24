// app/useTransactions.ts
import axiosInstance from "@/app/services/http/axiosConfig";
import { CreditTransactionData } from "@/interfaces/type";
import axios from "axios";
import { useEffect, useState } from "react";

const useTransactions = () => {
  const [transactions, setTransactions] = useState<CreditTransactionData[]>([]);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [totalIncome, setTotalIncome] = useState(0); // Total de entradas
  const [totalExpense, setTotalExpense] = useState(0); // Total de saídas
  const [nextPage, setNextPage] = useState<string | null>(null); // Estado para gerenciar a próxima página

  // Função para buscar transações
  const fetchTransactions = async (page: number = 1) => {
    try {
      const profileData = JSON.parse(localStorage.getItem("profile") || "{}");
      const pk = profileData?.pk; // Acessa o 'pk' do objeto
      const response = await axiosInstance.get(
        `profiles/${pk}/credit-transactions/?page=${page}`
      ); // Faz a requisição para obter as transações
      setTransactions(prev => (page === 1 ? response.data.results : [...prev, ...response.data.results])); // Armazena a resposta no estado
      setNextPage(response.data.next); // Atualiza a próxima página
      calculateTotals(response.data.results); // Calcula totais ao carregar os dados
    } catch (error) {
      console.error("Erro ao buscar transações de crédito:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  useEffect(() => {
    fetchTransactions(); // Chama a função para buscar os dados da primeira página
  }, []);

  // Filtra as transações com base no termo de busca
  const filteredTransactions = transactions.filter(transaction => {
    const description = transaction.description ? transaction.description.toLowerCase() : '';
    return description.includes(searchTerm.toLowerCase());
  });

  // Função para calcular totais de entradas e saídas
  const calculateTotals = (transactionsToCalculate: CreditTransactionData[]) => {
    let income = 0;
    let expense = 0;

    transactionsToCalculate.forEach(transaction => {
      const amount = parseFloat(transaction.amount);
      if (transaction.transaction_type === "ADD") {
        income += amount;
      } else {
        expense += amount;
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
  };

  // Função para buscar no backend
  const fetchTransactionsFromBackend = async () => {
    try {
      const profileData = JSON.parse(localStorage.getItem("profile") || "{}");
      const pk = profileData?.pk; // Acessa o 'pk' do objeto
      const response = await axiosInstance.get(
        `profiles/${pk}/credit-transactions/?search=${searchTerm}` // Adiciona o termo de busca na query
      );
      setTransactions(response.data.results); // Atualiza as transações com a resposta do backend
      setNextPage(response.data.next); // Atualiza a próxima página
      calculateTotals(response.data.results); // Calcula os totais ao receber a resposta do backend
    } catch (error) {
      console.error("Erro ao buscar transações de crédito no backend:", error);
    }
  };

  // Função para buscar mais transações
  const fetchMoreTransactions = async () => {
    if (nextPage) {
      const page = new URL(nextPage).searchParams.get('page'); // Obtém o número da próxima página a partir da URL
      if (page) {
        await fetchTransactions(Number(page)); // Busca a próxima página usando a função existente
      }
    }
  };

  // Chama calculateTotals sempre que as transações filtradas mudarem
  useEffect(() => {
    calculateTotals(filteredTransactions);
  }, [transactions, searchTerm]); // Dependências atualizadas

  return { 
    transactions: filteredTransactions, 
    loading, 
    setSearchTerm, 
    fetchTransactionsFromBackend,
    fetchMoreTransactions, // Retorna a função para buscar mais transações
    totalIncome, 
    totalExpense,
    hasMore: !!nextPage // Indica se há mais páginas para buscar
  };
};

export default useTransactions;
