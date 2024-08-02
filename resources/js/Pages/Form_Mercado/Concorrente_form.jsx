import React from 'react';

const Concorrente_Form = ({ onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Estudo dos Concorrentes</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="qualidade" className="block text-sm font-medium text-gray-700">Qualidade</label>
          <input
            type="text"
            id="qualidade"
            name="qualidade_concorrente"
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome_concorrente"
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço</label>
          <input
            type="number"
            id="preco"
            name="preco_concorrente"
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pagamento" className="block text-sm font-medium text-gray-700">Condições de Pagamento</label>
          <input
            type="text"
            id="pagamento"
            name="pagamento_concorrente"
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">Localização</label>
          <input
            type="text"
            id="localizacao"
            name="localizacao_concorrente"
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="garantias" className="block text-sm font-medium text-gray-700">Garantias</label>
          <input
            type="text"
            id="garantias"
            name="garantias_concorrente"
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="servico" className="block text-sm font-medium text-gray-700">Serviço</label>
          <input
            type="text"
            id="servico"
            name="servico_concorrente"
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Concorrente_Form;
