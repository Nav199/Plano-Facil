import React from 'react';

const TabelaInvestimentos = ({
  categoria,
  dados,
  adicionarItem,
  removerItem,
  handleInputChange,
  handlePriceChange
}) => {

  const formatarMoeda = (valor = 0) =>
    `R$ ${Number(valor)
      .toFixed(2)
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

  const subtotal = dados.reduce((acc, item) => acc + Number(item.total || 0), 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">

      {/* Cabeçalho */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">
          {categoria}
        </h3>

        <button
          type="button"
          onClick={adicionarItem}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          + Adicionar
        </button>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Descrição</th>
              <th className="px-4 py-3 text-center w-28">Qtd</th>
              <th className="px-4 py-3 text-right w-40">Valor Unitário</th>
              <th className="px-4 py-3 text-right w-40">Total</th>
              <th className="px-4 py-3 text-center w-24">Ações</th>
            </tr>
          </thead>

          <tbody>
            {dados.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  Nenhum item adicionado
                </td>
              </tr>
            )}

            {dados.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">

                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="descricao"
                    value={item.descricao}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Ex: Prédio comercial"
                    className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>

                <td className="px-4 py-2 text-center">
                  <input
                    type="number"
                    name="quantidade"
                    value={item.quantidade}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-20 text-center border-gray-300 rounded-lg"
                  />
                </td>

                <td className="px-4 py-2 text-right">
                  <input
                    type="text"
                    name="valorUnitario"
                    value={item.valorUnitario}
                    onChange={(e) => handlePriceChange(index, e)}
                    placeholder="R$ 0,00"
                    className="w-full text-right border-gray-300 rounded-lg"
                  />
                </td>

                <td className="px-4 py-2 text-right font-medium text-gray-800">
                  {formatarMoeda(item.total)}
                </td>

                <td className="px-4 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => removerItem(index)}
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

      {/* Subtotal */}
      <div className="flex justify-end px-6 py-4 bg-gray-50 border-t">
        <span className="text-sm text-gray-600 mr-2">
          Subtotal {categoria}:
        </span>
        <span className="text-lg font-semibold text-gray-900">
          {formatarMoeda(subtotal)}
        </span>
      </div>
    </div>
  );
};

export default TabelaInvestimentos;
