import React from 'react';
import { useForm } from '@inertiajs/react';
import Produto from './Form_Marketing/Form_produto/Produto';

const Marketing = () => {
  const { data, setData, post, processing, errors } = useForm({
    produtos: [{ name: '', price: '' }],
    estrategia_promo: '',
    estrategia_comer: '',
    localizacao: ''
  });

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...data.produtos];
    updatedProducts[index][key] = value;
    setData('produtos', updatedProducts);
  };

  const addProduct = () => {
    setData('produtos', [...data.produtos, { name: '', price: '' }]);
  };

  const removeProduct = (index) => {
    const updatedProducts = data.produtos.filter((_, i) => i !== index);
    setData('produtos', updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('plano_marketing'));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Formulário de Marketing</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Produtos</h2>
          {data.produtos.map((product, index) => (
            <Produto
              key={index}
              index={index}
              product={product}
              handleProductChange={handleProductChange}
              removeProduct={removeProduct}
            />
          ))}
          <button
            type="button"
            onClick={addProduct}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Adicionar Produto
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="promoStrategies" className="block text-sm font-medium text-gray-700">
            Estratégias Promocionais
          </label>
          <textarea
            id="promoStrategies"
            name='estrategia_promo'
            value={data.estrategia_promo}
            onChange={(e) => setData('estrategia_promo', e.target.value)}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="salesStrategies" className="block text-sm font-medium text-gray-700">
            Estratégias de Comercialização
          </label>
          <textarea
            id="salesStrategies"
            name='estrategia_comer'
            value={data.estrategia_comer}
            onChange={(e) => setData('estrategia_comer', e.target.value)}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Localização
          </label>
          <input
            type="text"
            id="location"
            name='localizacao'
            value={data.localizacao}
            onChange={(e) => setData('localizacao', e.target.value)}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
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

export default Marketing;
