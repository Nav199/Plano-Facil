import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import TabelaInvestimentos from './TabelaInvestimentos/TabelaInvestimentos'; 

const Inves = ({ planoId }) => {
  const { data, setData, post, processing, errors } = useForm({
    imoveis: [],
    maquinas: [],
    equipamentos: [],
    veiculos: [],
    moveisUtensilios: [],
    computadores: []
  });

  // Handle adding a new item in a specific category
  const handleAddItem = (categoria) => {
    setData(categoria, [
      ...data[categoria], 
      { descricao: '', quantidade: 0, valorUnitario: 0, total: 0 }
    ]);
  };

  // Handle removing an item from a specific category
  const handleRemoveItem = (categoria, index) => {
    setData(categoria, data[categoria].filter((_, i) => i !== index));
  };

  // Handle changing input values in a specific category
  const handleInputChange = (categoria, index, e) => {
    const { name, value } = e.target;
    const updatedCategory = [...data[categoria]];
    updatedCategory[index] = { ...updatedCategory[index], [name]: value };
    updatedCategory[index].total = updatedCategory[index].quantidade * updatedCategory[index].valorUnitario;
    setData(categoria, updatedCategory);
  };

  // Calculate subtotal for a specific category
  const calcularSubtotal = (categoria) => {
    return data[categoria].reduce((acc, item) => acc + Number(item.total || 0), 0);
  };

  // Calculate total for all categories
  const calcularTotal = () => {
    return (
      calcularSubtotal('imoveis') +
      calcularSubtotal('maquinas') +
      calcularSubtotal('equipamentos') +
      calcularSubtotal('veiculos') +
      calcularSubtotal('moveisUtensilios') +
      calcularSubtotal('computadores')
    );
  };

  // Auto-recalculate total when categories change
  useEffect(() => {
    calcularTotal();
  }, [data]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('Investimento-Fixo', { id: planoId }));
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-3xl font-bold mb-4">Investimentos Fixos</h1>
      
      <TabelaInvestimentos
        categoria="Imóveis"
        dados={data.imoveis}
        adicionarItem={() => handleAddItem('imoveis')}
        removerItem={(index) => handleRemoveItem('imoveis', index)}
        handleInputChange={(index, e) => handleInputChange('imoveis', index, e)}
      />

      <TabelaInvestimentos
        categoria="Máquinas"
        dados={data.maquinas}
        adicionarItem={() => handleAddItem('maquinas')}
        removerItem={(index) => handleRemoveItem('maquinas', index)}
        handleInputChange={(index, e) => handleInputChange('maquinas', index, e)}
      />

      <TabelaInvestimentos
        categoria="Equipamentos"
        dados={data.equipamentos}
        adicionarItem={() => handleAddItem('equipamentos')}
        removerItem={(index) => handleRemoveItem('equipamentos', index)}
        handleInputChange={(index, e) => handleInputChange('equipamentos', index, e)}
      />

      <TabelaInvestimentos
        categoria="Veículos"
        dados={data.veiculos}
        adicionarItem={() => handleAddItem('veiculos')}
        removerItem={(index) => handleRemoveItem('veiculos', index)}
        handleInputChange={(index, e) => handleInputChange('veiculos', index, e)}
      />

      <TabelaInvestimentos
        categoria="Móveis e Utensílios"
        dados={data.moveisUtensilios}
        adicionarItem={() => handleAddItem('moveisUtensilios')}
        removerItem={(index) => handleRemoveItem('moveisUtensilios', index)}
        handleInputChange={(index, e) => handleInputChange('moveisUtensilios', index, e)}
      />

      <TabelaInvestimentos
        categoria="Computadores"
        dados={data.computadores}
        adicionarItem={() => handleAddItem('computadores')}
        removerItem={(index) => handleRemoveItem('computadores', index)}
        handleInputChange={(index, e) => handleInputChange('computadores', index, e)}
      />

      <div className="text-right font-bold text-xl mt-4">
        Total de Investimento Fixo: {calcularTotal().toFixed(2)}
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

export default Inves;
