import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Estoque = ({ planoId, auth }) => {
  const { data, setData, post, processing } = useForm({
    items: [{ descricao: '', quantidade: '', valorUnitario: '', total: 0 }],
    totalGeral: 0,
  });

  const handleAddItem = () => {
    setData('items', [
      ...data.items,
      { descricao: '', quantidade: '', valorUnitario: '', total: 0 }
    ]);
  };

  const handleRemoveItem = (index) => {
    setData('items', data.items.filter((_, i) => i !== index));
  };

  const handlePriceChange = (e, index) => {
    let value = e.target.value || '';

    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    const formattedValue =
      numericValue === ''
        ? ''
        : 'R$ ' +
          numericValue
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    handleInputChange(index, 'valorUnitario', formattedValue);
  };

  const handleInputChange = (index, name, value) => {
    const updatedItems = [...data.items];
    updatedItems[index][name] = value;

    const valorNumerico =
      parseFloat(
        (updatedItems[index].valorUnitario || '')
          .replace('R$', '')
          .replace(/\./g, '')
          .replace(',', '.')
      ) || 0;

    updatedItems[index].total =
      Number(updatedItems[index].quantidade || 0) * valorNumerico;

    setData('items', updatedItems);
  };

  useEffect(() => {
    const total = data.items.reduce(
      (acc, item) => acc + Number(item.total || 0),
      0
    );
    setData('totalGeral', total);
  }, [data.items]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedItems = data.items.map(item => ({
      ...item,
      valorUnitario:
        parseFloat(
          item.valorUnitario
            .replace('R$', '')
            .replace(/\./g, '')
            .replace(',', '.')
        ) || 0,
      total:
        item.quantidade *
        (parseFloat(
          item.valorUnitario
            .replace('R$', '')
            .replace(/\./g, '')
            .replace(',', '.')
        ) || 0),
    }));

    setData('items', formattedItems);
    post(route('estoque-store', { id: planoId }));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-bold text-3xl text-gray-800 tracking-tight text-center py-6">
          Estoque do Empreendimento
        </h2>
      }
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* TABELA */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-600">Descrição</th>
                    <th className="px-4 py-3 text-center text-gray-600 w-32">Qtd</th>
                    <th className="px-4 py-3 text-center text-gray-600 w-40">Valor Unitário</th>
                    <th className="px-4 py-3 text-right text-gray-600 w-40">Total</th>
                    <th className="px-4 py-3 text-center text-gray-600 w-32">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.descricao}
                          onChange={(e) =>
                            handleInputChange(index, 'descricao', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                          placeholder="Ex: Produto A"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={item.quantidade}
                          onChange={(e) =>
                            handleInputChange(index, 'quantidade', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-center focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.valorUnitario}
                          onChange={(e) => handlePriceChange(e, index)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-center focus:ring-2 focus:ring-indigo-500"
                          placeholder="R$ 0,00"
                        />
                      </td>
                      <td className="px-4 py-2 text-right font-medium">
                        {item.total.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BOTÃO ADICIONAR */}
            <div>
              <button
                type="button"
                onClick={handleAddItem}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-xl shadow"
              >
                + Adicionar Item
              </button>
            </div>

            {/* TOTAL */}
            <div className="flex justify-end">
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 text-lg font-semibold">
                Total Geral:{' '}
                <span className="text-indigo-600">
                  {data.totalGeral.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
            </div>

            {/* BOTÃO ENVIAR */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={processing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-12 rounded-xl shadow-md transition-all"
              >
                {processing ? 'Salvando...' : 'Salvar Estoque'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </Authenticated>
  );
};

export default Estoque;
