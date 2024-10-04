import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

const Uni_Cus = ({ planoId }) => {
  const { produtos } = usePage().props; // Recebendo os produtos do marketing via Inertia

  // useForm para manipular o estado dos produtos
  const { data, setData, post, processing } = useForm({
    produtos: produtos.map(produto => ({ 
      id: produto.marketing_id,
      name: produto.produto,
      itens: [{ material: '', quantidade: 0, valorUnitario: 0, total: 0 }],
      totalGeral: 0,
    })),
  });

  // Função para calcular em tempo real e enviar ao backend
  const calcularCustos = () => {
    const itensAtualizados = data.produtos[0].itens.map((item) => ({
      ...item,
      total: item.quantidade * item.valorUnitario,
    }));

    
    const updatedProdutos = [...data.produtos];
    updatedProdutos[0].itens = itensAtualizados;

    // Calcular total geral
    const totalGeral = itensAtualizados.reduce((acc, item) => acc + item.total, 0);
    updatedProdutos[0].totalGeral = totalGeral; // Armazena o total geral

    setData('produtos', updatedProdutos);
  };

  const handleInputChange = (itemIndex, field, value) => {
    const updatedProdutos = [...data.produtos];
    updatedProdutos[0].itens[itemIndex][field] =
      field === 'quantidade' || field === 'valorUnitario' ? parseFloat(value) || 0 : value;

    setData('produtos', updatedProdutos);
    calcularCustos();
  };

  const adicionarItem = () => {
    const updatedProdutos = [...data.produtos];
    updatedProdutos[0].itens.push({ material: '', quantidade: 0, valorUnitario: 0, total: 0 });
    setData('produtos', updatedProdutos);
  };

  const excluirItem = (itemIndex) => {
    const updatedProdutos = [...data.produtos];
    updatedProdutos[0].itens.splice(itemIndex, 1); // Remove o item da tabela
    setData('produtos', updatedProdutos);
    calcularCustos();
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    post(route('custo-store', { id: planoId })); 
};

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Custo Unitário</h1>
      <form onSubmit={handleSubmit}> {/* Envolve tudo em um formulário */}
        {data.produtos.map((produto, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold mb-4">{produto.name}</h2>
            <button onClick={adicionarItem} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md">
              Adicionar Item
            </button>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Material</th>
                  <th className="border border-gray-300 px-4 py-2">Quantidade</th>
                  <th className="border border-gray-300 px-4 py-2">Valor Unitário (R$)</th>
                  <th className="border border-gray-300 px-4 py-2">Total (R$)</th>
                  <th className="border border-gray-300 px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produto.itens.map((item, itemIndex) => (
                  <tr key={itemIndex} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={item.material}
                        onChange={(e) => handleInputChange(itemIndex, 'material', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number" 
                        value={item.quantidade}
                        onChange={(e) => handleInputChange(itemIndex, 'quantidade', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        value={item.valorUnitario}
                        onChange={(e) => handleInputChange(itemIndex, 'valorUnitario', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => excluirItem(itemIndex)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="border border-gray-300 px-4 py-2" colSpan="3">Total Geral</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.totalGeral)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          disabled={processing} // Desabilita o botão enquanto processa
        >
          Enviar
        </button>
      </form> {/* Fecha o formulário */}
    </div>
  );
};

export default Uni_Cus;
