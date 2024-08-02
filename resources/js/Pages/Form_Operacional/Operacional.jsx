import React, { useState } from 'react';
import NecessidadePessoalTable from './Form_Necessidade/Necessidade';

const Operacional = () => {
  const [capacidadeProdutiva, setCapacidadeProdutiva] = useState('');
  const [volumeProducao, setVolumeProducao] = useState('');
  const [processosOperacionais, setProcessosOperacionais] = useState('');
  const [pessoal, setPessoal] = useState([{ cargo: '', qualificacao: '' }]);

  const handlePessoalChange = (index, key, value) => {
    const updatedPessoal = [...pessoal];
    updatedPessoal[index][key] = value;
    setPessoal(updatedPessoal);
  };

  const addRow = () => {
    setPessoal([...pessoal, { cargo: '', qualificacao: '' }]);
  };

  const removeRow = (index) => {
    const updatedPessoal = pessoal.filter((_, i) => i !== index);
    setPessoal(updatedPessoal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log({ capacidadeProdutiva, volumeProducao, processosOperacionais, pessoal });
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
            value={capacidadeProdutiva}
            onChange={(e) => setCapacidadeProdutiva(e.target.value)}
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
            value={volumeProducao}
            onChange={(e) => setVolumeProducao(e.target.value)}
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
            value={processosOperacionais}
            onChange={(e) => setProcessosOperacionais(e.target.value)}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <NecessidadePessoalTable
          pessoal={pessoal}
          handlePessoalChange={handlePessoalChange}
          addRow={addRow}
          removeRow={removeRow}
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Operacional;
