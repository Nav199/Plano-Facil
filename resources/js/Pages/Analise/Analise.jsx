import React from 'react';
import { usePage } from "@inertiajs/react";

const Analise = ({ planoId }) => {
  const { swotData, error } = usePage().props;

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!swotData || !swotData.forcas || !swotData.fraquezas || !swotData.oportunidades || !swotData.ameacas) {
    return (
      <div className="text-center">
        <p>Dados da análise SWOT não estão disponíveis para o plano com ID {planoId}.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Análise SWOT - Plano ID {planoId}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PONTOS FORTES */}
        <div className="bg-green-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800">Pontos Fortes</h2>
          <ul className="text-gray-700">
            {swotData.forcas.map((forca, index) => (
              <li key={index}>{forca}</li>
            ))}
          </ul>
        </div>

        {/* PONTOS FRACOS */}
        <div className="bg-red-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800">Pontos Fracos</h2>
          <ul className="text-gray-700">
            {swotData.fraquezas.map((fraqueza, index) => (
              <li key={index}>{fraqueza}</li>
            ))}
          </ul>
        </div>

        {/* OPORTUNIDADES */}
        <div className="bg-yellow-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-800">Oportunidades</h2>
          <ul className="text-gray-700">
            {swotData.oportunidades.map((oportunidade, index) => (
              <li key={index}>{oportunidade}</li>
            ))}
          </ul>
        </div>

        {/* AMEAÇAS */}
        <div className="bg-blue-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800">Ameaças</h2>
          <ul className="text-gray-700">
            {swotData.ameacas.map((ameaca, index) => (
              <li key={index}>{ameaca}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* AÇÕES ESTRATÉGICAS */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-purple-800">Ações Estratégicas</h2>
        <ul className="text-gray-700">
          {swotData.acoes.map((acao, index) => (
            <li key={index}>{acao}</li>
          ))}
        </ul>
      </div>

      {/* OBSERVAÇÃO FINAL */}
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-700">
          <strong>Observação:</strong> A análise SWOT apresentada é preliminar e baseada em informações limitadas. Para um planejamento estratégico mais eficaz, a Farcry precisa coletar mais dados sobre seus custos, mercado, concorrência e a natureza de seus recursos iniciais ("dva"). A definição clara de metas e objetivos é crucial para a elaboração de um plano de negócios robusto.
        </p>
      </div>
    </div>
  );
};

export default Analise;
