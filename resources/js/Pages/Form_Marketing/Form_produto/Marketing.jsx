import React, { useState } from 'react';
import Produto from './Produto';

const Marketing = () => {
    const [products, setProducts] = useState([{ name: '', price: '' }]);
    const [promoStrategies, setPromoStrategies] = useState('');
    const [salesStrategies, setSalesStrategies] = useState('');
    const [location, setLocation] = useState('');
  
    const handleProductChange = (index, key, value) => {
      const updatedProducts = [...products];
      updatedProducts[index][key] = value;
      setProducts(updatedProducts);
    };
  
    const addProduct = () => {
      setProducts([...products, { name: '', price: '' }]);
    };
  
    const removeProduct = (index) => {
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ products, promoStrategies, salesStrategies, location });
    };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Formulário de Marketing</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Produtos</h2>
            {products.map((product, index) => (
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
              value={promoStrategies}
              onChange={(e) => setPromoStrategies(e.target.value)}
              className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="salesStrategies" className="block text-sm font-medium text-gray-700">
              Estratégias de Comercialização
            </label>
            <textarea
              id="salesStrategies"
              value={salesStrategies}
              onChange={(e) => setSalesStrategies(e.target.value)}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
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
  
  export default Marketing;