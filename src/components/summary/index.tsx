import React from "react";
import { Button } from "../ui/button";
import { BadgeCheck } from "lucide-react";
import { formatToBRL } from "@/utils/convert";

interface SummaryProps {
  title1?: string;
  value1?: number;
  title2?: string;
  serviceName?: string;
  cost?: number;
  usedAt?: string;
}

const Summary: React.FC<SummaryProps> = ({
  title1 = "Título 01",
  value1 = 0,
  title2 = "Título 02",
  serviceName = "Nome do Serviço",
  cost = 0,
  usedAt = new Date().toISOString(),
}) => {
  // Formatar o cost para moeda brasileira
  const formattedCost = formatToBRL(cost);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* First Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{title1}</h2>
        <div className="flex gap-2 items-center">
          <BadgeCheck />
          <p className="text-3xl font-bold">{value1}</p>
        </div>
      </div>

      {/* Second Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title2}</h2>
        </div>
        <p className="text-lg font-semibold">{serviceName}</p>
        <p className="text-gray-500">Custo: {formattedCost} por imagem gerada.</p>
        <p className="text-sm text-gray-500">
          Utilizado em: {new Date(usedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Summary;
