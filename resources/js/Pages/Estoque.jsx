import React, { useState } from 'react';

const Estoque = () => {
  const [items, setItems] = useState([{ descricao: '', quantidade: 0, valorUnitario: 0, total: 0 }]);

  const handleAddRow = () => {
    setItems([...items, { descricao: '', quantidade: 0, valorUnitario: 0, total: 0 }]);
  };

  const handleRemoveRow = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === 'quantidade' || field === 'valorUnitario') {
      newItems[index].total = newItems[index].quantidade * newItems[index].valorUnitario;
    }

    setItems(newItems);
  };

  return (
    <div className='p-4'>
      <h2 className='text-center text-xl font-bold mb-4'>Estoque Inicial</h2>
      <table className='min-w-full bg-white'>
        <thead>
          <tr>
            <th className='px-4 py-2 border'>Descrição</th>
            <th className='px-4 py-2 border'>Quantidade</th>
            <th className='px-4 py-2 border'>Valor Unitário</th>
            <th className='px-4 py-2 border'>Total</th>
            <th className='px-4 py-2 border'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className='px-4 py-2 border'>
                <input
                  type='text'
                  value={item.descricao}
                  onChange={(e) => handleInputChange(index, 'descricao', e.target.value)}
                  className='w-full p-2 border'
                  placeholder='Descrição'
                />
              </td>
              <td className='px-4 py-2 border'>
                <input
                  type='number'
                  value={item.quantidade}
                  onChange={(e) => handleInputChange(index, 'quantidade', Number(e.target.value))}
                  className='w-full p-2 border'
                  min='1'
                />
              </td>
              <td className='px-4 py-2 border'>
                <input
                  type='number'
                  value={item.valorUnitario}
                  onChange={(e) => handleInputChange(index, 'valorUnitario', Number(e.target.value))}
                  className='w-full p-2 border'
                  min='0'
                  step='0.01'
                />
              </td>
              <td className='px-4 py-2 border'>
                {item.total.toFixed(2)}
              </td>
              <td className='px-4 py-2 border'>
                <button
                  onClick={() => handleRemoveRow(index)}
                  className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAddRow}
        className='bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600'
      >
        Adicionar
      </button>
    </div>
  );
};

export default Estoque;
