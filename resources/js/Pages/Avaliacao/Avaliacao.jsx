import React from 'react';
import { usePage, useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';


function Avaliacao() {
  const { planoId, avaliacao = [], error, auth } = usePage().props;

  const avaliacaoUnica = avaliacao.join('\n\n');

  const { data, setData, post, processing, errors, reset } = useForm({
    avaliacaoTexto: avaliacaoUnica,
  });

  const handleChange = (e) => {
    setData('avaliacaoTexto', e.target.value);
  };

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToPost = { avaliacao: [data.avaliacaoTexto] };
    
    post(route('avaliacao', { id: planoId }), { 
        data: dataToPost,
        onSuccess: () => reset() 
    }); 
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
            {/* Bloco Único de Avaliação */}
            <div className="flex items-center space-x-4">
              <textarea
                // Aumentando o tamanho para comportar todo o texto
                className="w-full p-2 border border-gray-300 rounded-md min-h-64"
                value={data.avaliacaoTexto}
                onChange={handleChange}
                placeholder={`Avaliação Geral`}
                rows={15} // Define uma altura considerável
              />
            </div> 
            {/* Fim do Bloco Único */}
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

      {/* Caso não haja avaliações (agora avaliacaoUnica) */}
      {avaliacaoUnica.length === 0 && !error && (
        <p className="text-gray-700 text-center">Nenhuma avaliação disponível.</p>
      )}
    </div>
    </Authenticated>
  );
}

export default Avaliacao;