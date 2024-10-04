import React from 'react'

const Inves_ope = () => {
    const [items, setItems] = useState([{ descricao: '', valor: '' }]);

    const handleAddItem = () => {
      setItems([...items, { descricao: '', valor: '' }]);
    };
  
    const handleRemoveItem = (index) => {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    };
  
    const handleChange = (index, field, value) => {
      const newItems = [...items];
      newItems[index][field] = field === 'valor' ? parseFloat(value) : value;
      setItems(newItems);
    };
  
    const total = items.reduce((acc, item) => acc + (item.valor || 0), 0);
  
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center gap-2">
          Investimento Pré-Operacional
        
        </h2>
  
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <table className="table-auto w-full mb-6 border-collapse">
            
            <thead>
              <tr>
                <th className="text-left p-2">
                  <button
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
                      type="number"
                      name="valor"
                      placeholder="Valor"
                      value={item.valor}
                      onChange={(e) => handleChange(index, 'valor', e.target.value)}
                      className="border border-gray-300 p-2 w-full rounded"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <span className="relative group">
            <span className="cursor-pointer text-blue-500 font-bold">Dúvidas ?</span>
            <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-4 py-2 rounded-md shadow-md z-10">
              Investimentos pré-operacionais são custos incorridos antes do início da operação principal de um negócio. Exemplos incluem despesas com pesquisa e desenvolvimento, marketing inicial e aquisição de equipamentos.
            </span>
          </span>
          <div className="flex justify-between items-center">
            <div></div>
            <h3 className="font-bold text-xl">Total: R$ {total.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    );
}

export default Inves_ope