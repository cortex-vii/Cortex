"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PromptSection from "@/components/Prompts";
import { FormcreatusCortex } from "../../../../components/forms/AI/creatusCortex/formCreatusCortex";
import Summary from "@/components/summary";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ResultAI_Image from "@/components/forms/AI/creatusCortex/resultAi";
import useCreatusCortex from "./useCreatusCortex";
import ImagesCarousel from "@/components/imageGallery";

export default function CreatusCortex() {
  const {
    creditSummary,
    loading,
    error,
    serviceData,
    dataImages,
    fetchCreditSummary,
    fetchServiceData,
    fetchUserImages,
  } = useCreatusCortex();

  const searchParams = useSearchParams();
  const service = searchParams.get("service");

  // Criar estados
  const [balance, setBalance] = useState(0);
  const [nameService, setNameService] = useState("Modelo");
  const [pkService, setPkService] = useState("none");
  const [cost, setCost] = useState(0);

  useEffect(() => {
    fetchCreditSummary();
    fetchUserImages();
    if (service) {
      fetchServiceData(service);
    }
  }, [service]);

  // Atualizar estados quando creditSummary ou serviceData mudarem
  useEffect(() => {
    if (creditSummary) {
      setBalance(creditSummary.amount.balance);
    } else {
      setBalance(0);
    }
  }, [creditSummary]);

  useEffect(() => {
    if (serviceData) {
      setNameService(serviceData.name);
      setPkService(serviceData.pk_service);
      
      
      // Verifica se cost_in_credits é um valor válido antes de formatar
      const cost_in_credits = serviceData.cost_in_credits || "none";
      if (cost_in_credits !== "none") {
        setCost(cost_in_credits);
      } else {
        setCost(0);
      }
    } else {
      setNameService("Modelo");
      setPkService("none");
      setCost(0);
    }
  }, [serviceData]);

  if (loading) {
    return <p>Carregando créditos...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }
  console.log(cost);
  return (
    <>
      <div className="p-4 mb-4 bg-white rounded-lg">

        <RocketIcon className="h-4 w-4" />
        <AlertTitle>
          <strong>
            Bem-vindo(a) ao Creatus Córtex, sua IA para geração de imagens de
            perfis realistas!
          </strong>
        </AlertTitle>
        <AlertDescription>
          Explore um mundo de criatividade, onde suas ideias ganham vida! De
          retratos impressionantes a cenários fantásticos, nossa IA está aqui
          para transformar sua visão em realidade.
        </AlertDescription>
        <div className="mt-4 flex justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="bg-slate-500 mb-4" asChild>
                <Button
                  variant="outline"
                  className="flex items-center text-white"
                >
                  <InfoIcon className="mr-2 h-4 w-4" /> Sobre o Modelo
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Esta IA emprega algoritmos de ponta para criar imagens de
                  perfis realistas a partir de descrições textuais.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Summary
        title1="Créditos"
        value1={balance}
        title2="Modelo"
        serviceName={nameService}
        cost={cost}
      />
      <PromptSection
        Form={(props) => (
          <FormcreatusCortex
            {...props}
            pkService={pkService}
            cost={cost}
            balance={balance}
            updateBalance={setBalance}
          />
        )}
        ResultComponent={ResultAI_Image}
      />
      <hr />
      <div className="w-full">
        {dataImages && <ImagesCarousel dataImages={dataImages} />}
      </div>
    </>
  );
}
