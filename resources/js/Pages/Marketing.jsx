import React from 'react';
import { useForm } from '@inertiajs/react';
import Produto from './Form_Marketing/Form_produto/Produto';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

const Marketing = ({ planoId, auth }) => {
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
    post(route('plano_marketing', { id: planoId }));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
          Plano de Marketing
        </h2>
      }
    >
      <div className="container mx-auto p-4">
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

          {/* Grid para Estratégias */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="promoStrategies" className="block text-sm font-medium text-gray-700 text-center">
                Estratégias Promocionais
              </label>
              <textarea
                id="promoStrategies"
                name="estrategia_promo"
                value={data.estrategia_promo}
                onChange={(e) => setData('estrategia_promo', e.target.value)}
                maxLength={1500}
                className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
              <p className="text-sm text-gray-500 mt-2">
                Descreva as estratégias promocionais que serão adotadas para promover os produtos.
              </p>
            </div>
            <div>
              <label htmlFor="salesStrategies" className="block text-sm font-medium text-gray-700">
                Estratégias de Comercialização
              </label>
              <textarea
                id="salesStrategies"
                name="estrategia_comer"
                value={data.estrategia_comer}
                maxLength={1500}
                onChange={(e) => setData('estrategia_comer', e.target.value)}
                className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
              <p className="text-sm text-gray-500 mt-2">
                Descreva as estratégias de comercialização para os produtos.
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Localização
            </label>
            <input
              type="text"
              id="location"
              name="localizacao"
              value={data.localizacao}
              onChange={(e) => setData('localizacao', e.target.value)}
              maxLength={100}
              className="mt-1 p-2 w-1/2 border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-sm text-gray-500 mt-2">
              Informe a localização onde o marketing será aplicado.
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              processing={processing}
              className="extra-classes-if-needed"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </Authenticated>
  );
};

export default Marketing;
