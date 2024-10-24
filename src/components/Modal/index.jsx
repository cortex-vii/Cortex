import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";




const Modal = ({ isOpen, onClose, data }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const generatePDF = () => {
    setLoading(true); // Inicia o carregamento

    const input = document.getElementById("pdf-content");

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4"); // Define orientação, unidade e tamanho
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, -heightLeft, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("curriculo.pdf");
        setLoading(false); // Encerra o carregamento
      })
      .catch(() => {
        setLoading(false); // Encerra o carregamento em caso de erro
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box relative w-full max-w-6xl p-6">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <FaTimes />
          </button>
          <h1 className="text-lg font-bold mb-4">
            Parabéns, seu Currículo foi Gerado! Desejamos sorte nessa etapa 🔥👐
          </h1>
          <hr className="mb-8" />
          <div className="flex space-x-6 mb-6 p-24" id="pdf-content">
            {/* Conteudo do pdf */}
            
          </div>
          <div className="modal-action">
            <button onClick={onClose} className="btn">
              Fechar
            </button>
            <button onClick={generatePDF} className="btn bg-primary text-white">
              {loading ? <SpinnerLoading /> : "Baixar PDF"}
            </button>
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default Modal;
