import { ImageCard } from "../imageCard";
import LoadingIndicator from "../loadingIndicator";
import { dataImagesCarouselProps, IimageData } from "@/interfaces/type";
import { useGallery } from "./useGallery";
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
import { useState } from "react";

// Ajuste o tipo das props recebidas no componente
export default function ImagesGallery({ dataImages }: { dataImages: dataImagesCarouselProps }) {
  const {
    displayedImages,
    nextPageUrl,
    loading,
    error,
    selectedImages,
    isDeleting,
    loadMoreImages,
    handleDeleteImages,
    toggleSelectImage,
    handleDeleteSingleImage,
  } = useGallery(dataImages);

  // Estado para controlar o AlertDialog
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const confirmDeleteImages = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteImages(); // Chama a função que executa a exclusão
    setIsAlertOpen(false); // Fecha o diálogo após a confirmação
  };

  return (
    <div className="w-full p-4 m-0">
      {isDeleting && <LoadingIndicator isLoading={isDeleting} />}
      <h2 className="text-3xl font-bold mb-4">Suas Imagens</h2>
      <div className="flex justify-between mb-4">
        <button
          onClick={confirmDeleteImages}
          className={`bg-red-500 text-white py-2 px-4 rounded ${
            selectedImages.length === 0 ? "hidden" : ""
          }`}
          disabled={selectedImages.length === 0 || isDeleting}
        >
          Excluir Imagens Selecionadas
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 relative ">
        {displayedImages.map((image: IimageData) => (
          <div key={image.pk_image} className="relative">
            <ImageCard
              pk_image={image.pk_image}
              imageUrl={image.image_url}
              onDelete={handleDeleteSingleImage} // Passa a função que remove do estado
              onToggleSelect={toggleSelectImage}
            />
          </div>
        ))}
      </div>

      {nextPageUrl && (
        <button
          onClick={loadMoreImages}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Ver Mais"}
        </button>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* AlertDialog para confirmação de exclusão de imagens selecionadas */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza de que deseja excluir as imagens selecionadas? Esta
              ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white"
              onClick={handleConfirmDelete} // Mudei aqui
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
