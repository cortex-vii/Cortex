import { useEffect, useState } from "react";
import axiosInstance from "@/app/services/http/axiosConfig";
import { BalanceSheetData } from "@/interfaces/type";

const useBalance = () => {
  const [creditSummary, setCreditSummary] = useState<BalanceSheetData | null>(null);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    const fetchCreditSummary = async () => {
      try {
        const profileData = JSON.parse(localStorage.getItem("profile") || "{}"); // Recupera o objeto do localStorage
        const pk = profileData?.pk; // Acessa o 'pk' do objeto

        // Faz a requisição para obter o resumo de créditos
        const response = await axiosInstance.get(`profiles/${pk}/credit-summary/`);
        setCreditSummary(response.data); // Armazena a resposta no estado
      } catch (error) {
        console.error("Erro ao buscar resumo de créditos:", error); // Lida com erros
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchCreditSummary(); // Chama a função para buscar os dados
  }, []);

  return { creditSummary, loading }; // Retorna os dados e o estado de carregamento
};

export default useBalance;
