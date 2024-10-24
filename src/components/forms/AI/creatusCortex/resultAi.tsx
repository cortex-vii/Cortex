import * as React from "react";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button"; // Importando o componente Button
import { Card, CardContent } from "@/components/ui/card"; // Importando Card
import ImagePreviewDialog from "@/components/dialogAI/ImageModal";


interface ResultProps {
  resultAI: string[]; // Lista de strings
}

const ResultAI_Image: React.FC<ResultProps> = ({ resultAI }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpenDialog = (url: string) => {
    setSelectedImage(url);
    setOpenDialog(true);
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "image.png"; // Usa o nome da imagem ou um padrão
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Result</h2>
      {resultAI.length > 0 ? ( // Verifica se há URLs
        <div className="flex flex-col items-center justify-center">
          <Carousel className="w-full max-w-xs md:max-w-lg">
            <CarouselContent>
              {resultAI.map((url, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-white w-full h-full">
                      <CardContent className="flex flex-col items-center justify-center p-6 h-[600px]">
                        <img
                          src={url}
                          alt={`Generated result ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="flex flex-col justify-center space-y-2 mt-2">
                          <p className="text-center text-sm text-gray-500">
                            Imagem {index + 1} de {resultAI.length}
                          </p>
                          <div className="flex justify-center space-x-2">
                            <Button onClick={() => handleOpenDialog(url)}>
                              Visualizar
                            </Button>
                            <Button onClick={() => handleDownload(url)}>
                              Baixar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* Usando o novo componente para visualizar a imagem */}
          <ImagePreviewDialog
            open={openDialog}
            onOpenChange={setOpenDialog}
            imageUrl={selectedImage}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-[300px] bg-gray-100 rounded-lg">
          <ImageIcon className="h-12 w-12 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default ResultAI_Image;
