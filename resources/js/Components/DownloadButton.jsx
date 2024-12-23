import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaFileDownload } from "react-icons/fa";

const DownloadButton = ({ elementId = 'relatorio-content', filename = 'document.pdf', planoNome }) => {
    const downloadPDF = async () => {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error('Elemento não encontrado.');
            return;
        }

        try {
            // Adiciona a classe para ocultar o botão
            const buttonElement = document.getElementById('download-button');
            if (buttonElement) buttonElement.classList.add('hidden-when-printing');

            // Renderiza o elemento em um canvas
            const canvas = await html2canvas(element, { scale: 2, useCORS: true });
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const pageHeight = (pdfHeight * imgWidth) / pdfWidth; // Altura da página em termos do canvas
            let yOffset = 0;

            while (yOffset < imgHeight) {
                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = imgWidth;
                pageCanvas.height = Math.min(pageHeight, imgHeight - yOffset);

                const pageCtx = pageCanvas.getContext('2d');
                pageCtx.drawImage(
                    canvas,
                    0,
                    yOffset,
                    imgWidth,
                    pageCanvas.height,
                    0,
                    0,
                    imgWidth,
                    pageCanvas.height
                );

                const pageImgData = pageCanvas.toDataURL('image/png');
                pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

                yOffset += pageHeight;

                if (yOffset < imgHeight) {
                    pdf.addPage();
                }
            }

            pdf.save(filename || `Plano de Negócio - ${planoNome || 'Desconhecido'}.pdf`);
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
        } finally {
            // Remove a classe após a geração do PDF
            if (buttonElement) buttonElement.classList.remove('hidden-when-printing');
        }
    };

    return (
        <div id="download-button" className="text-center my-4">
            <button
                onClick={downloadPDF}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 flex items-center mx-auto"
            >
                <FaFileDownload className="h-5 w-5 mr-2" />
                Baixar em PDF
            </button>
        </div>
    );
};

export default DownloadButton;
