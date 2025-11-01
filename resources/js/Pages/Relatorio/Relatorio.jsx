import React from "react";
import { usePage } from "@inertiajs/react";

export default function Relatorio({ auth }) {
  const { plano } = usePage().props;

  const handleDownload = () => {
    window.open(route("relatorio.pdf", plano.id), "_blank");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Plano de Negócio – {plano.nome}
      </h1>

      {/* Botão de download */}
      <div className="text-center mb-4">
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-5 py-2 rounded shadow hover:bg-green-700 transition"
        >
          📄 Baixar Plano (PDF)
        </button>
      </div>

      {/* Aqui continuam suas seções do relatório */}
    </div>
  );
}
