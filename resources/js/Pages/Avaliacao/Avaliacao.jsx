import React from 'react';

function Avaliacao() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Avaliação Geral do Plano</h1>

      {/* Avaliação do Grupo */}
      <div className="border border-gray-300">
        <div className="bg-gray-100 p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-center">
            Avaliação do Grupo acerca da viabilidade econômico-financeira
          </h2>
        </div>
        <div className="p-4">
          <p className="text-gray-700 text-center">
            Avaliação criada pela IA Gemini do Google
          </p>
        </div>
      </div>
    </div>
  );
}

export default Avaliacao;
