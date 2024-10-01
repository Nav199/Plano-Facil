import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const Estoque = ({ planoId }) => {
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

  // Função para remover um item
  const handleRemoveItem = (index) => {
    setData('items', data.items.filter((_, i) => i !== index));
  };

  // Função para atualizar os valores de cada campo no item
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...data.items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    updatedItems[index].total = updatedItems[index].quantidade * updatedItems[index].valorUnitario;
    setData('items', updatedItems);
  };

  // Calcula o subtotal dos itens
  const calcularSubtotal = () => {
    return data.items.reduce((acc, item) => acc + Number(item.total || 0), 0);
  };

  // Calcula o total geral quando os itens mudam
  useEffect(() => {
    const totalGeral = calcularSubtotal();
    setData('totalGeral', totalGeral);
  }, [data.items]);

  // Função para submeter o formulário e enviar os dados ao backend
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('estoque-store', { id: planoId }));
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-3xl font-bold mb-4">Estoque</h1>

      <table className="table-auto w-full mb-4">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Total</th>
            <th>Ações</th>
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
                  onChange={(e) => handleInputChange(index, e)}
                  className="border px-2 py-1"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantidade"
                  value={item.quantidade}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border px-2 py-1"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="valorUnitario"
                  value={item.valorUnitario}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border px-2 py-1"
                />
              </td>
              <td>
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

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={processing}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Estoque;
