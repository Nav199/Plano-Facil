import React from 'react';
import { usePage, useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';


function Avaliacao() {
  const { planoId, avaliacao = [], error,auth } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    avaliacao: avaliacao.length > 0 ? avaliacao : [''],
  });

  // Função para lidar com a mudança na avaliação
  const handleChange = (e, index) => {
    const newAvaliacao = [...data.avaliacao];
    newAvaliacao[index] = e.target.value;
    setData('avaliacao', newAvaliacao);
  };

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('avaliacao', { id: planoId }), { onSuccess: () => reset() }); 
  };

  return (
     <Authenticated
          user={auth.user}
          header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
              Avaliação Geral do Plano
            </h2>
          }
        >
    <div className="container mx-auto p-8">

      {/* Exibe mensagem de erro se houver */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-gray-300 rounded-lg shadow-md">
          <div className="bg-gray-100 p-4 border-b border-gray-300">
            <h2 className="text-xl font-bold text-center">Avaliação da IA Gemini</h2>
          </div>
          <div className="p-4 space-y-4">
            {data.avaliacao.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={item}
                  onChange={(e) => handleChange(e, index)}
                  placeholder={`Avaliação ${index + 1}`}
                />
              </div> 
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            {processing ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>

      {/* Caso não haja avaliações */}
      {data.avaliacao.length === 0 && !error && (
        <p className="text-gray-700 text-center">Nenhuma avaliação disponível.</p>
      )}
    </div>
    </Authenticated>
  );
}

export default Avaliacao;
