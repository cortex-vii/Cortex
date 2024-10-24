import React, { useState } from "react";
import axiosInstanceAi from "@/app/services/http/axiosConfigAI";
import Loading from "@/components/loadingAi";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import FieldInfoDialog from "@/components/dialogAI/fieldInfoDialog";
import ResultAI_Image from "./resultAi";

interface FormcreatusCortexProps {
  pkService: string;
  cost: number;
  balance: number;
  onResult: (result: string[]) => void;
  onComponent: (resultComponent: JSX.Element) => void;
  updateBalance: (newBalance: number) => void;
}

export const FormcreatusCortex = ({
  pkService,
  onResult,
  onComponent,
  cost,
  balance,
  updateBalance,
}: FormcreatusCortexProps) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [numOutputs, setNumOutputs] = useState(1);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [applyWatermark, setApplyWatermark] = useState(true);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [promptStrength, setPromptStrength] = useState(0.8);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    if (prompt) {
      // Limpa o resultado antes de gerar um novo
      onResult([]); // ou `onResult([""])` se preferir mostrar uma mensagem vazia
      setLoading(true);
      try {
        const profile = localStorage.getItem("profile");
        const pk_hash = profile ? JSON.parse(profile).pk : null;

        const requestBody = {
          prompt,
          pk_hash,
          width,
          height,
          num_outputs: numOutputs,
          guidance_scale: guidanceScale,
          apply_watermark: applyWatermark,
          negativePrompt: negativePrompt,
          promptStrength: promptStrength,
          pk_service: pkService,
        };

        const response = await axiosInstanceAi.post(
          "/ai/creatus_cortex/generate/",
          requestBody
        );

        // Verifica se image_urls existe e é um array não vazio
        if (
          Array.isArray(response.data.image_urls) &&
          response.data.image_urls.length > 0
        ) {
          const imageUrls = response.data.image_urls;

          // Passando a URL para o onResult
          onResult(imageUrls);
          // Passando o componente ResultAI_Image com a URL
          onComponent(<ResultAI_Image resultAI={imageUrls} />);
          const costValue = cost * numOutputs;
          console.log("------------------");
          console.log(costValue);
          console.log(balance);
          const newBalance = balance - costValue;
          console.log(newBalance);
          // Substitua costValue pelo custo real da geração
          updateBalance(newBalance);
        } else {
          onResult([]); // Mensagem de erro se não houver imagens
        }
      } catch (error) {
        onResult([]); // Mensagem de erro genérica
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mt-4 mb-2">
          <label className="text-sm font-medium">Prompt</label>
          <FieldInfoDialog
            fieldName="Prompt"
            fieldDescription="Texto que descreve a imagem a ser gerada. Quanto mais detalhado, melhor será o resultado."
          />
        </div>
        <textarea
          value={prompt}
          onChange={handleInputChange}
          placeholder="Digite seu prompt aqui..."
          className="w-full h-24 resize-none border rounded p-2"
        />
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Width</label>
          <FieldInfoDialog
            fieldName="Width"
            fieldDescription="A largura da imagem gerada em pixels. Valor recomendado: 512, 1024, etc."
          />
        </div>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Height</label>
          <FieldInfoDialog
            fieldName="Height"
            fieldDescription="A altura da imagem gerada em pixels. Valor recomendado: 512, 1024, etc."
          />
        </div>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Number of Outputs</label>
          <FieldInfoDialog
            fieldName="Number of Outputs"
            fieldDescription="Quantidade de imagens a serem geradas. Máximo: 4."
          />
        </div>
        <Slider
          min={1}
          max={4}
          step={1}
          value={[numOutputs]}
          onValueChange={([value]) => setNumOutputs(value)}
        />
        <div className="text-right text-sm">{numOutputs}</div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Guidance Scale</label>
          <FieldInfoDialog
            fieldName="Guidance Scale"
            fieldDescription="Controla a influência do prompt na geração da imagem. Valores maiores resultam em imagens mais alinhadas ao prompt."
          />
        </div>
        <Slider
          min={0}
          max={20}
          step={0.1}
          value={[guidanceScale]}
          onValueChange={([value]) => setGuidanceScale(value)}
        />
        <div className="text-right text-sm">{guidanceScale.toFixed(1)}</div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Negative Prompt</label>
          <FieldInfoDialog
            fieldName="Negative Prompt"
            fieldDescription="Texto que especifica o que deve ser evitado na geração da imagem. Exemplo: 'sem texto, sem deformações'."
          />
        </div>
        <textarea
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          placeholder="Digite o prompt negativo aqui..."
          className="w-full h-24 resize-none border rounded p-2"
        />
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Prompt Strength</label>
          <FieldInfoDialog
            fieldName="Prompt Strength"
            fieldDescription="Define a força do prompt na geração da imagem. Valores mais altos significam que o prompt terá mais influência."
          />
        </div>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[promptStrength]}
          onValueChange={([value]) => setPromptStrength(value)}
        />
        <div className="text-right text-sm">{promptStrength.toFixed(2)}</div>
      </div>
      <div className="mt-6">
        {loading ? (
          <Loading />
        ) : (
          <Button onClick={handleSubmit} disabled={loading}>
            Generate
          </Button>
        )}
      </div>
    </>
  );
};
