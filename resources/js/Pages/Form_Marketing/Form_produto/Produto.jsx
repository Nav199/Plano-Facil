import React from 'react';

const Produto = ({ index, product, handleProductChange, removeProduct }) => {
  // Função para formatar o valor como um preço
  const formatPrice = (value) => {
    const options = { style: 'currency', currency: 'BRL' };
    const numberFormat = new Intl.NumberFormat('pt-BR', options);
    return numberFormat.format(value);
  };

  // Função para tratar a entrada de preço
  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Remove tudo que não é dígito
    const formattedValue = formatPrice(value / 100); // Divide por 100 para formatar corretamente
    handleProductChange(index, 'price', formattedValue);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Nome do Produto"
        value={product.name}
        onChange={(e) => handleProductChange(index, 'name', e.target.value)}
        className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="text"
        placeholder="Preço"
        value={product.price}
        onChange={handlePriceChange}
        className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button
        type="button"
        onClick={() => removeProduct(index)}
        className="text-red-500 hover:text-red-700"
      >
        Remover
      </button>
    </div>
  );
};

export default Produto;
