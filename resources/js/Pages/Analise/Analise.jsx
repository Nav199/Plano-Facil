import React from 'react';
import { usePage, useForm } from "@inertiajs/react";

const Analise = ({ planoId }) => {
  const { swotData, error } = usePage().props;

  // Configuração do formulário
  const { data, setData, post, processing, errors, reset } = useForm({
    swotData: swotData || {
      forcas: [],
      fraquezas: [],
      oportunidades: [],
      ameacas: [],
      acoes: [],
    },
  });

  const handleEnviar = (e) => {
    e.preventDefault(); // Evita comportamento padrão do botão
     post(route('analise', { id: planoId }), { onSuccess: () => reset() }); 
  };

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
        <p>Dados da análise SWOT não estão disponíveis para o plano.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Análise SWOT </h1>

      <form onSubmit={handleEnviar}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* FATORES INTERNOS */}
          <div className="col-span-2 bg-green-200 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 text-center">Fatores Internos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PONTOS FORTES */}
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-700">Pontos Fortes</h3>
                <ul className="text-gray-700">
                  {data.swotData.forcas.map((forca, index) => (
                    <li key={index}>{index + 1}. {forca}</li>
                  ))}
                </ul>
              </div>

              {/* PONTOS FRACOS */}
              <div className="bg-red-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-red-700">Pontos Fracos</h3>
                <ul className="text-gray-700">
                  {data.swotData.fraquezas.map((fraqueza, index) => (
                    <li key={index}>{index + 1}. {fraqueza}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* FATORES EXTERNOS */}
          <div className="col-span-2 bg-yellow-200 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-yellow-800 text-center">Fatores Externos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* OPORTUNIDADES */}
              <div className="bg-yellow-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-700">Oportunidades</h3>
                <ul className="text-gray-700">
                  {data.swotData.oportunidades.map((oportunidade, index) => (
                    <li key={index}>{index + 1}. {oportunidade}</li>
                  ))}
                </ul>
              </div>

              {/* AMEAÇAS */}
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700">Ameaças</h3>
                <ul className="text-gray-700">
                  {data.swotData.ameacas.map((ameaca, index) => (
                    <li key={index}>{index + 1}. {ameaca}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* AÇÕES ESTRATÉGICAS */}
        <div className="mt-8 bg-purple-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-purple-800">Ações Estratégicas</h2>
          <ul className="text-gray-700">
            {data.swotData.acoes.map((acao, index) => (
              <li key={index}>{index + 1}. {acao}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className={`px-4 py-2 bg-sky-500/75 text-white rounded-md ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={processing}
          >
            {processing ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Analise;
