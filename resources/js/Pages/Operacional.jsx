import React from 'react';
import { useForm } from '@inertiajs/react';
import Necessidade from './Form_Operacional/Form_Necessidade/Necessidade';

const Operacional = ({ planoId }) => {
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
    post(route('plano_operacional', { id: planoId })); // Passa o id_plano na URL
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Plano Operacional</h1>
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
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          disabled={processing}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Operacional;
