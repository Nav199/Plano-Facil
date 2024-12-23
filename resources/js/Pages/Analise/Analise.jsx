import React from 'react';
import { usePage, useForm } from "@inertiajs/react";
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

const Analise = ({ planoId, auth }) => {
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
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
          Análise SWOT
        </h2>
      }
    >
      <div className="container mx-auto p-8">
        <form onSubmit={handleEnviar}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* FATORES INTERNOS */}
            <div className="col-span-2 bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h2 className="text-xl font-semibold text-gray-800 text-center">Fatores Internos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* PONTOS FORTES */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-green-700">Pontos Fortes</h3>
                  <ul className="text-gray-700">
                    {data.swotData.forcas.map((forca, index) => (
                      <li key={index}>{index + 1}. {forca}</li>
                    ))}
                  </ul>
                </div>

                {/* PONTOS FRACOS */}
                <div className="bg-gray-200 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-red-600">Pontos Fracos</h3>
                  <ul className="text-gray-700">
                    {data.swotData.fraquezas.map((fraqueza, index) => (
                      <li key={index}>{index + 1}. {fraqueza}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* FATORES EXTERNOS */}
            <div className="col-span-2 bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h2 className="text-xl font-semibold text-gray-800 text-center">Fatores Externos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* OPORTUNIDADES */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-blue-600">Oportunidades</h3>
                  <ul className="text-gray-700">
                    {data.swotData.oportunidades.map((oportunidade, index) => (
                      <li key={index}>{index + 1}. {oportunidade}</li>
                    ))}
                  </ul>
                </div>

                {/* AMEAÇAS */}
                <div className="bg-gray-200 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-orange-600">Ameaças</h3>
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
          <div className="mt-8 bg-gray-100 p-4 rounded-lg border border-gray-300">
            <h2 className="text-xl font-semibold text-gray-800">Ações Estratégicas</h2>
            <ul className="text-gray-700">
              {data.swotData.acoes.map((acao, index) => (
                <li key={index}>{index + 1}. {acao}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center mt-4">
            <Button type="submit" processing={processing}>
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </Authenticated>
  );
};

export default Analise;
