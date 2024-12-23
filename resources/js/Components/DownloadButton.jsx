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
            // Captura a área do elemento HTML como imagem
            const canvas = await html2canvas(element, { scale: 1, useCORS: true });
            const imgData = canvas.toDataURL('image/png');

            // Criação do PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Adiciona a imagem ao PDF
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // Salva o PDF com o nome fornecido
            pdf.save(filename || `Plano de Negócio - ${planoNome || 'Desconhecido'}.pdf`);
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
        }
    };

    return (
        <div className="text-center my-4">
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
