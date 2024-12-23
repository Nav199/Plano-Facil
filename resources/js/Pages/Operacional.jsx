import React from 'react';
import { useForm } from '@inertiajs/react';
import Necessidade from './Form_Operacional/Form_Necessidade/Necessidade';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Button from "@/Components/Button";
const Operacional = ({ planoId,auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    capacidadeProdutiva: '',
    volumeProducao: '', 
    processosOperacionais: '',
    pessoal: [{ cargo: '', qualificacao: '' }],
  });

  const handlePessoalChange = (index, key, value) => {
    const updatedPessoal = [...data.pessoal];
    updatedPessoal[index][key] = value;
    setData('pessoal', updatedPessoal);
  };

  const addRow = () => {
    setData('pessoal', [...data.pessoal, { cargo: '', qualificacao: '' }]);
  }; 

  const removeRow = (index) => {
    const updatedPessoal = data.pessoal.filter((_, i) => i !== index);
    setData('pessoal', updatedPessoal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('plano_operacional', { id: planoId })); 
  };

  return (
     <Authenticated
              user={auth.user}
              header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
                  Plano Operacional
                </h2>
              }
            >
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="capacidadeProdutiva" className="block text-sm font-medium text-gray-700">
            Capacidade Produtiva
          </label>
          <input
            type="text"
            id="capacidadeProdutiva"
            name="capacidadeProdutiva"
            value={data.capacidadeProdutiva}
            onChange={(e) => setData('capacidadeProdutiva', e.target.value)}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Qual será a capacidade máxima de produção (ou serviços) e comercialização?
          </p>
        </div>
        <div className="mb-4">
          <label htmlFor="volumeProducao" className="block text-sm font-medium text-gray-700">
            Volume de Produção
          </label>
          <input
            type="text"
            id="volumeProducao"
            name="volumeProducao"
            value={data.volumeProducao}
            onChange={(e) => setData('volumeProducao', e.target.value)}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Qual será o volume de produção (ou serviços) e comercialização iniciais?
          </p>
        </div>
        <div className="mb-4">
          <label htmlFor="processosOperacionais" className="block text-sm font-medium text-gray-700">
            Processos Operacionais
          </label>
          <textarea
            id="processosOperacionais"
            name="processosOperacionais"
            value={data.processosOperacionais}
            onChange={(e) => setData('processosOperacionais', e.target.value)}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <Necessidade
          pessoal={data.pessoal}
          handlePessoalChange={handlePessoalChange}
          addRow={addRow}
          removeRow={removeRow}
        />
      
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

export default Operacional;
