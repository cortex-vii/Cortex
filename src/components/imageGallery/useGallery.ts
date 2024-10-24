import { useState } from "react";
import axiosInstance from "@/app/services/http/axiosConfig";
import { cleanHttptUrl } from "@/app/services/http/endpoints";
import { dataImagesCarouselProps, IimageData } from "@/interfaces/type";
import axiosInstanceAi from "@/app/services/http/axiosConfigAI";

export function useGallery(dataImages: dataImagesCarouselProps) {
  const [displayedImages, setDisplayedImages] = useState<IimageData[]>(dataImages.results?.generated_images || []);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(dataImages.next);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadMoreImages = async () => {
    if (!nextPageUrl) return;

    setLoading(true);
    setError(null);

    const nextPage = cleanHttptUrl(nextPageUrl);
    try {
      const response = await axiosInstance.get(`ai/creatus_cortex/list-images-creatus/${nextPage}`);
      const newImages = response.data;

      setDisplayedImages((prev) => [...prev, ...newImages.results.generated_images]);
      setNextPageUrl(newImages.next);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao carregar mais imagens.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImages = async () => {
    if (selectedImages.length === 0) return;

    setIsDeleting(true);
    try {
      await axiosInstanceAi.delete('ai/creatus_cortex/delete-image/', {
        data: { image_ids: selectedImages },
      });
      setDisplayedImages((prevImages) => prevImages.filter(image => !selectedImages.includes(image.pk_image)));
      setSelectedImages([]);
    } catch (err: any) {
      console.error("Erro ao excluir as imagens:", err.message || "Ocorreu um erro ao deletar as imagens.");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSelectImage = (pk: string) => {
    setSelectedImages(prev => 
      prev.includes(pk) ? prev.filter(id => id !== pk) : [...prev, pk]
    );
  };

  const handleDeleteSingleImage = (pk: string) => {
    setDisplayedImages((prevImages) => prevImages.filter(image => image.pk_image !== pk));
  };

  return {
    displayedImages,
    nextPageUrl,
    loading,
    error,
    selectedImages,
    isDeleting,
    loadMoreImages,
    handleDeleteImages,
    toggleSelectImage,
    handleDeleteSingleImage
  };
}
