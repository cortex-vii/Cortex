import { useState, FC } from "react";

interface FormProps {
  onResult: (result: string[]) => void; // Agora espera um array de strings
  onComponent: (resultComponent: JSX.Element) => void;
}

interface ComponentProps {
  Form?: FC<FormProps>;
  ResultComponent: React.FC<{ resultAI: string[] }>; // Nova prop para o componente de resultado
}

const PromptSection: FC<ComponentProps> = ({ Form, ResultComponent }) => {
  const [resultAI, setResultAI] = useState<string[]>([]); // Agora um array de strings
  const [componentAI, setComponentAI] = useState<JSX.Element | null>(null);

  const handleResult = (result: string[]) => {
    setResultAI(result); // Armazena a lista de URLs
  };

  const handleComponentResult = (resultComponent: JSX.Element) => {
    setComponentAI(resultComponent);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Formulário */}
      <div className="flex-1 " style={{ flex: 1 }}>
        {Form ? (
          <Form onResult={handleResult} onComponent={handleComponentResult} />
        ) : null}
      </div>

      {/* Resultado */}
      <div className="flex-2" style={{ flex: 2 }}>
        {ResultComponent ? (
          <ResultComponent resultAI={resultAI} /> // Passa a lista de URLs
        ) : (
          componentAI
        )}
      </div>
    </div>
  );
};

export default PromptSection;
