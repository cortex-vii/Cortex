import axiosInstance from "@/app/services/http/axiosConfig";
import { dataImagesCarouselProps, IimageData } from "@/interfaces/type";
import { useState } from "react";

export default function useCreatusCortex() {
  const [creditSummary, setCreditSummary] = useState<any>(null);
  const [serviceData, setServiceData] = useState<any>(null);
  const [creditsUsed, setCreditsUsed] = useState<number>(0);
  const [usedAt, setUsedAt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dataImages, setDataImages] = useState<any>();
  
  const fetchCreditSummary = async () => {
    setLoading(true);
    setError(null);

    try {
      const profileData = JSON.parse(localStorage.getItem("profile") || "{}");
      const pk = profileData?.pk;

      const response = await axiosInstance.get(`profiles/${pk}/credit-amount/`);
      const summaryData = response.data;

      setCreditSummary(summaryData);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao buscar os créditos.");
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceData = async (service: string) => {
    setLoading(true);
    setError(null);

    try {
      const profileData = JSON.parse(localStorage.getItem("profile") || "{}");
      const pk = profileData?.pk;

      const response = await axiosInstance.get(
        `profiles/${pk}/service-usage/?service=${service}`
      );
      const serviceDataResponse = response.data;

      setServiceData(serviceDataResponse);

      // Soma todos os credits_used e pega o último used_at
      if (serviceDataResponse.results.length > 0) {
        const totalCreditsUsed = serviceDataResponse.results.reduce(
          (acc: number, curr: { credits_used: string }) => {
            return acc + parseFloat(curr.credits_used); // Soma os credits_used
          },
          0
        );

        const lastUsedAt = serviceDataResponse.results[0].used_at; // Pega o último used_at (assumindo que a lista está ordenada)
        const servicePk = serviceDataResponse.pk_service; // Pega o pk_service do primeiro resultado

        setCreditsUsed(totalCreditsUsed); // Armazena a soma total
        setUsedAt(lastUsedAt); // Armazena o último used_at
 // Armazena o pk_service
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao buscar os dados do serviço.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`ai/creatus_cortex/list-images-creatus/`); // URL para buscar imagens
      setDataImages(response.data); // Armazena as imagens no estado
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao buscar as imagens do usuário.");
    } finally {
      setLoading(false);
    }
  };

  return {
    creditSummary,
    loading,
    error,
    serviceData,
    dataImages, // Adiciona as imagens ao retorno
    fetchCreditSummary,
    fetchServiceData,
    fetchUserImages, // Adiciona a função de busca de imagens
    creditsUsed,
    usedAt,
  };
}
