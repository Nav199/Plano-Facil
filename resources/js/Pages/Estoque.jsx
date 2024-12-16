import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

const Estoque = ({ planoId,auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    items: [{ descricao: '', quantidade: '', valorUnitario: '', total: 0 }],
    totalGeral: 0,
  });

  // Função para adicionar um item
  const handleAddItem = () => {
    setData('items', [
      ...data.items,
      { descricao: '', quantidade: '', valorUnitario: '', total: 0 }
    ]);
  };

  const handlePriceChange = (e, index) => {
    let value = e.target.value;
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    const formattedValue = "R$ " + numericValue
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); 

    handleInputChange(index, 'valorUnitario', formattedValue); 
  };

  const handleRemoveItem = (index) => {
    setData('items', data.items.filter((_, i) => i !== index));
  };

  // Função para atualizar os valores de cada campo no item
  const handleInputChange = (index, name, value) => {
    const updatedItems = [...data.items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };

    // Atualiza o total
    updatedItems[index].total = updatedItems[index].quantidade * parseFloat(updatedItems[index].valorUnitario.replace('R$', '').replace('.', '').replace(',', '.')) || 0;

    setData('items', updatedItems);
  };

 
  const calcularSubtotal = () => {
    return data.items.reduce((acc, item) => acc + Number(item.total || 0), 0);
  };


  useEffect(() => {
    const totalGeral = calcularSubtotal();
    setData('totalGeral', totalGeral);
  }, [data.items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('estoque-store', { id: planoId }));
  };

  return ( 
    <Authenticated
          user={auth.user}
          header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
              Estoque do Empreendimento
            </h2>
          }
        >
    <div className="container mx-auto p-4 mt-4">

      <table className="table-auto w-full mb-4 border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Descrição</th>
            <th className="border px-4 py-2">Quantidade</th>
            <th className="border px-4 py-2">Valor Unitário</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="descricao"
                  value={item.descricao}
                  onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                  className="border px-2 py-1 w-full"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantidade"
                  value={item.quantidade}
                  onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                  className="border px-2 py-1 w-full"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="valorUnitario"
                  value={item.valorUnitario}
                  onChange={(e) => handlePriceChange(e, index)}
                  className="border px-2 py-1 w-full"
                />
              </td>
              <td className="text-right">
                {item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
              <td>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleAddItem}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
      >
        Adicionar Item
      </button>

      <div className="text-right font-bold text-xl mt-4">
        Total Geral: {data.totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
    </div>
     </Authenticated>
  );
};

export default Estoque;
