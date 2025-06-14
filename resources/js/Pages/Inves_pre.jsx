import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Button from '@/Components/Button'; 
import Authenticated from "@/Layouts/AuthenticatedLayout";
const Inves_pre = ({ planoId,auth }) => {
  const [items, setItems] = useState([{ descricao: '', valor: '' }]);
  
  const { post, data, setData, reset,processing } = useForm({
    items: [{ descricao: '', valor: '' }],
    total: 0,
  });

  const handleAddItem = () => {
    const newItems = [...items, { descricao: '', valor: '' }];
    setItems(newItems);
    setData('items', newItems);  // Atualize o data.items do Inertia
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    setData('items', newItems);  // Atualize o data.items do Inertia
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    if (field === 'valor') {
      const numericValue = parseFloat(value.replace(/\D/g, '')) / 100;
      newItems[index][field] = isNaN(numericValue) ? '' : numericValue;
    } else {
      newItems[index][field] = value;
    }
    setItems(newItems);
    setData('items', newItems);  // Atualize o data.items do Inertia
    setData('total', calculateTotal(newItems));
  };

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + (item.valor || 0), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('investimentoP', { id: planoId }), {
      onSuccess: () => reset(),
    });
  };

  return (
       <Authenticated
                  user={auth.user}
                  header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
                      Investimento Pré-Operacional
                    </h2>
                  }
                >
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <table className="table-auto w-full mb-6 border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                >
                  Adicionar
                </button>
              </th>
              <th className="text-left p-2">Descrição</th>
              <th className="text-left p-2">Valor</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2"></td>
                <td className="p-2">
                  <input
                    type="text"
                    name="descricao"
                    placeholder="Descrição"
                    value={item.descricao}
                    onChange={(e) => handleChange(index, 'descricao', e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    name="valor"
                    placeholder="Valor"
                    value={item.valor ? formatCurrency(item.valor) : ''}
                    onChange={(e) => handleChange(index, 'valor', e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                  />
                </td>
                <td className="p-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                  > 
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <h3 className="font-bold text-xl">Total: {formatCurrency(calculateTotal(items))}</h3>
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

export default Inves_pre;