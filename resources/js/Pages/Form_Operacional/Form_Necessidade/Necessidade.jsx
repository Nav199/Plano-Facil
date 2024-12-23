import React from 'react';

const Necessidade = ({ pessoal, handlePessoalChange, addRow, removeRow }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Necessidade Pessoal</h2>
      <button
        type="button"
        onClick={addRow}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Adicionar Linha
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Cargo/Função</th>
            <th className="border p-2">Qualificação</th>
            <th className="border p-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {pessoal.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  type="text"
                  name={`pessoal[${index}].cargo`}
                  value={row.cargo}
                  onChange={(e) => handlePessoalChange(index, 'cargo', e.target.value)}
                  className="w-full p-2 border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  name={`pessoal[${index}].qualificacao`}
                  value={row.qualificacao}
                  onChange={(e) => handlePessoalChange(index, 'qualificacao', e.target.value)}
                  className="w-full p-2 border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </td>
              <td className="border p-2 text-center">
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Necessidade;