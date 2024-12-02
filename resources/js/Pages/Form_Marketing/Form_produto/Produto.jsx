import React from 'react';

const Produto = ({ index, product, handleProductChange, removeProduct }) => {

  const formatPrice = (value) => {
    const options = { style: 'currency', currency: 'BRL' };
    const numberFormat = new Intl.NumberFormat('pt-BR', options);
    return numberFormat.format(value);
  };

  // Função para tratar a entrada de preço
  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/[^\d,]/g, '');  // Remove tudo, exceto números e vírgula
    if (value.indexOf(',') === -1) {
      value = value + ',00';  // Se não tiver vírgula, adiciona ",00"
    }
    value = value.replace(',', '.'); // Troca vírgula por ponto para o formato float
    const price = parseFloat(value);
    handleProductChange(index, 'price', price || 0); // Garante que não seja NaN
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Nome do Produto"
        name="Nome_produto"
        value={product.name}
        onChange={(e) => handleProductChange(index, 'name', e.target.value)}
        className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="text"  // Alterado para "text" para evitar problemas de formatação de número
        placeholder="Preço"
        name="preco_produto"
        value={formatPrice(product.price)}
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
