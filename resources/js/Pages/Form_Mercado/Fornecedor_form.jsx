import React from 'react';

const Fornecedor_Form = ({ onChange}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Estudo dos Fornecedores</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome_fornecedor"
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao_fornecedor"
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço</label>
          <input
            type="number"
            id="preco"
            name="preco_fornecedor"
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pagamento" className="block text-sm font-medium text-gray-700">Condições de Pagamento</label>
          <input
            type="text"
            id="pagamento"
            name="pagamento_fornecedor"
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">Localização</label>
          <input
            type="text"
            id="localizacao"
            name="localizacao_fornecedor"
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
      </div>

    </div>
  );
};

export default Fornecedor_Form;
