import React from 'react';

const Produto = ({ index, product, handleProductChange, removeProduct }) => {

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    const formattedValue = "R$ " + numericValue
      .replace('.', ',') // Troca o ponto por vírgula
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formatação de milhar com ponto
    return formattedValue;
  }; 

  // Função para tratar a entrada de preço
  const handlePriceChange = (e) => {
    let value = e.target.value;

    // Remove tudo, exceto números e vírgula
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');

    // Formata para o valor monetário 'R$ 90.000,00'
    const formattedValue = "R$ " + numericValue
      .replace('.', ',') // Substitui o ponto por vírgula para garantir o formato BR
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adiciona ponto como separador de milhar

    handleProductChange(index, 'price', numericValue); // Passa o valor numérico para o estado
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
        type="text"  // Alterado para "text" para permitir formatação de números
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
