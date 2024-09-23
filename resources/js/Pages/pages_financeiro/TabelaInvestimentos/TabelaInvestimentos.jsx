import React from 'react';

const TabelaInvestimentos = ({ categoria, dados, adicionarItem, removerItem, handleInputChange }) => {

  const calcularSubtotal = () => {
    return dados.reduce((acc, item) => acc + Number(item.total || 0), 0);
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow mb-4">
      <h2 className="text-2xl font-bold mb-4">{categoria}</h2>
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
          {dados.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="descricao"
                  value={item.descricao}
                  onChange={(e) => handleInputChange(index, e)}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantidade"
                  value={item.quantidade}
                  onChange={(e) => handleInputChange(index, e)}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="valorUnitario"
                  value={item.valorUnitario}
                  onChange={(e) => handleInputChange(index, e)}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </td>
              <td>{item.total.toFixed(2)}</td>
              <td>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => removerItem(index)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right font-bold mb-4">SUBTOTAL {categoria}: {calcularSubtotal().toFixed(2)}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={adicionarItem}
      >
        Adicionar {categoria}
      </button>
    </div>
  );
};

export default TabelaInvestimentos;
