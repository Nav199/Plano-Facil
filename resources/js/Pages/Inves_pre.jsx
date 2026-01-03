import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Button from '@/Components/Button';
import Authenticated from "@/Layouts/AuthenticatedLayout";

const Inves_pre = ({ planoId, auth }) => {
  const { data, setData, post, processing, reset } = useForm({
    items: [{ descricao: '', valor: '' }],
    total: 0,
  });

  const handleAddItem = () => {
    setData('items', [...data.items, { descricao: '', valor: '' }]);
  };

  const handleRemoveItem = (index) => {
    setData(
      'items',
      data.items.filter((_, i) => i !== index)
    );
  };

  const handleInputChange = (index, field, value) => {
    const items = [...data.items];

    if (field === 'valor') {
      value = value.replace(/[^\d,]/g, '').replace(',', '.');
    }

    items[index][field] = value;
    setData('items', items);
  };

  const calcularTotal = () => {
    return data.items.reduce(
      (acc, item) => acc + (parseFloat(item.valor) || 0),
      0
    );
  };

  useEffect(() => {
    setData('total', calcularTotal());
  }, [data.items]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedItems = data.items.map(item => ({
      ...item,
      valor: parseFloat(item.valor) || 0,
    }));

    setData('items', formattedItems);

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
      <div className="container mx-auto p-4 mt-4">
        <form onSubmit={handleSubmit}>
          <table className="table-auto w-full mb-4 border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Descrição</th>
                <th className="border px-4 py-2">Valor</th>
                <th className="border px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      value={item.descricao}
                      onChange={(e) =>
                        handleInputChange(index, 'descricao', e.target.value)
                      }
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      value={
                        item.valor
                          ? Number(item.valor).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })
                          : ''
                      }
                      onChange={(e) =>
                        handleInputChange(index, 'valor', e.target.value)
                      }
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border px-2 py-1 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="button"
            onClick={handleAddItem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Adicionar Item
          </button>

          <div className="text-right font-bold text-xl mt-4">
            Total:{' '}
            {data.total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>

          <div className="flex justify-center mt-6">
            <Button type="submit" processing={processing}>
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </Authenticated>
  );
};

export default Inves_pre;
