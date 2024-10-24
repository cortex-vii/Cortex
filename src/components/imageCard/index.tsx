import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Download, Trash2, MoreVertical } from "lucide-react";
import ImagePreviewDialog from "../dialogAI/ImageModal";
import SimpleLoadingIndicator from "../loadingIndicator/simpleIndicator";
import axiosInstance from "@/app/services/http/axiosConfig";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ImageCardProps {
  pk_image: string;
  imageUrl: string;
  onDelete: (pk: string) => void;
  onToggleSelect: (pk: string) => void;
}

export function ImageCard({ pk_image, imageUrl, onDelete, onToggleSelect }: ImageCardProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false); // Estado para controlar o alerta

  const handleOpenDialog = (url: string) => {
    setSelectedImage(url);
    setOpenDialog(true);
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async () => {
    const pk = pk_image;

    try {
      await axiosInstance.delete("ai/creatus_cortex/delete-image/", {
        data: { image_ids: [pk] },
      });
      onDelete(pk); // Chama a função passada por prop para remover a imagem da lista no componente pai
    } catch (err: any) {
      console.error("Erro ao excluir a imagem:", err.message || "Ocorreu um erro ao deletar a imagem.");
    } finally {
      setIsAlertOpen(false); // Fechar o alerta após a exclusão
    }
  };

  return (
    <>
      <Card className="w-full max-w-xs md:max-w-sm overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl ">
        <CardContent className="p-0">
          <div className="relative h-[300px] w-full">
            <SimpleLoadingIndicator isLoading={isLoading} width="w-12" height="h-12" />
            <button className="relative h-full w-full" onClick={() => handleOpenDialog(imageUrl)}>
              <Image
                src={imageUrl}
                alt={`by Córtex AI`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </button>

            {/* Checkbox para seleção */}
            <div className="absolute top-2 left-2">
              <Checkbox id={pk_image} onCheckedChange={() => onToggleSelect(pk_image)} />
            </div>

            {/* Botão de ações posicionado no canto superior direito */}
            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 bg-white rounded-full shadow-md hover:bg-gray-200">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleOpenDialog(imageUrl)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload(imageUrl)}>
                      <Download className="mr-2 h-4 w-4" />
                      Baixar
                    </DropdownMenuItem>

                    {/* Botão que aciona o AlertDialog */}
                    <DropdownMenuItem
                      onClick={(e) => {
                        setIsAlertOpen(true); // Abre o AlertDialog
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal para visualizar a imagem */}
      <ImagePreviewDialog open={openDialog} onOpenChange={setOpenDialog} imageUrl={selectedImage} />

      {/* AlertDialog separado para excluir a imagem */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza de que deseja excluir esta imagem? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white"
              onClick={handleDelete} // Mudei aqui
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
