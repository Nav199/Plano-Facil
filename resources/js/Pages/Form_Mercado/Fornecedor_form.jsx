import React, { useState } from 'react';

const Fornecedor_Form = ({ onChange}) => {
   const [preco, setPreco] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handlePriceChange = (e) => {
    let value = e.target.value;
  
    // Remove caracteres não numéricos, mas permite a vírgula como separador decimal
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
  
    // Formata o valor para exibição
    const formattedValue = "R$ " + numericValue
      .replace('.', ',') // Substitui o ponto por vírgula
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adiciona ponto como separador de milhar
  
    setPreco(formattedValue); // Exibe o valor formatado no input
  
    // Envia apenas o valor numérico para o pai
    onChange('preco_fornecedor', parseFloat(numericValue));
  };
  

  return (
    <div className="p-4 bg-gray-100 rounded shadow mb-4 text-center">
      <h2 className="text-lg font-semibold mb-2 text-center">Estudo dos Fornecedores</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700" >Nome</label>
          <input
            type="text"
            id="nome"
            name="nome_fornecedor"
            className="mt-1 p-2 w-3/5 border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao_fornecedor"
            className="mt-1 p-2 w-3/5 border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço</label>
          <input
            type="text"
            id="preco"
            name="preco_fornecedor"
            value={preco}
            className="mt-1 p-2 w-3/5 border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handlePriceChange} 
          />
        </div>
        <div>
          <label htmlFor="pagamento" className="block text-sm font-medium text-gray-700">Condições de Pagamento</label>
          <input
            type="text"
            id="pagamento"
            name="pagamento_fornecedor"
            className="mt-1 p-2 w-3/5 border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="prazo" className="block text-sm font-medium text-gray-700">Prazo de entrega</label>
          <input
            type="text"
            id="prazo"
            name="prazo_entrega"
            className="mt-1 p-2 w-3/5 border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">Localização</label>
          <input
            type="text"
            id="localizacao"
            name="localizacao_fornecedor"
            className="mt-1 p-2 w-3/5 border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
      </div>

    </div>
  );
};

export default Fornecedor_Form;
