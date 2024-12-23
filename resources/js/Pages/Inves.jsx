import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import TabelaInvestimentos from './pages_financeiro/TabelaInvestimentos/TabelaInvestimentos';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

const Inves = ({ planoId, auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    imoveis: [],
    maquinas: [],
    equipamentos: [],
    veiculos: [],
    moveisUtensilios: [],
    computadores: [],
    totalGeral: 0
  });

  // Handle adding a new item in a specific category
  const handleAddItem = (categoria) => {
    setData(categoria, [
      ...data[categoria],
      { descricao: '', quantidade: '', valorUnitario: '', total: 0 }
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

  // Atualizar os valores de preço e total na categoria correta
  const handlePriceChange = (categoria, index, e) => {
    let value = e.target.value;

    // Remover caracteres não numéricos, mas permite a vírgula como separador decimal
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');

    // Formatar para o valor monetário 'R$ 90.000,00'
    const formattedValue = "R$ " + numericValue
      .replace('.', ',')  // Substitui o ponto por vírgula para garantir o formato BR
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adiciona ponto como separador de milhar

    const updatedCategory = [...data[categoria]];
    updatedCategory[index] = { ...updatedCategory[index], valorUnitario: formattedValue };
    updatedCategory[index].total = updatedCategory[index].quantidade * parseFloat(numericValue);
    setData(categoria, updatedCategory);  // Atualiza a categoria específica
  };

  // Calcular subtotal de uma categoria específica
  const calcularSubtotal = (categoria) => {
    return data[categoria].reduce((acc, item) => acc + Number(item.total || 0), 0);
  };

  // Calcular o total de todas as categorias
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

  // Auto-recalcular o total quando as categorias mudam
  useEffect(() => {
    const total = calcularTotal();
    setData('totalGeral', total); // Atualiza o totalGeral no estado
  }, [data]);

  // Formatar o valor total
  const formatTotal = (total) => {
    return `R$ ${total.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  // Enviar os dados do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('investimento-fixo', { id: planoId }));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
          Investimentos Fixos
        </h2>
      }
    >
      <form onSubmit={handleSubmit}>
      <div className="container mx-auto p-4 mt-4">
        <TabelaInvestimentos
          categoria="Imóveis"
          dados={data.imoveis}
          adicionarItem={() => handleAddItem('imoveis')}
          removerItem={(index) => handleRemoveItem('imoveis', index)}
          handleInputChange={(index, e) => handleInputChange('imoveis', index, e)}
          handlePriceChange={(index, e) => handlePriceChange('imoveis', index, e)}  // Passando a categoria
        />

        <TabelaInvestimentos
          categoria="Máquinas"
          dados={data.maquinas}
          adicionarItem={() => handleAddItem('maquinas')}
          removerItem={(index) => handleRemoveItem('maquinas', index)}
          handleInputChange={(index, e) => handleInputChange('maquinas', index, e)}
          handlePriceChange={(index, e) => handlePriceChange('maquinas', index, e)}  // Passando a categoria
        />

        <TabelaInvestimentos 
          categoria="Equipamentos"
          dados={data.equipamentos}
          adicionarItem={() => handleAddItem('equipamentos')}
          removerItem={(index) => handleRemoveItem('equipamentos', index)}
          handleInputChange={(index, e) => handleInputChange('equipamentos', index, e)}
          handlePriceChange={(index, e) => handlePriceChange('equipamentos', index, e)}
        />

        <TabelaInvestimentos
          categoria="Veículos"
          dados={data.veiculos}
          adicionarItem={() => handleAddItem('veiculos')}
          removerItem={(index) => handleRemoveItem('veiculos', index)}
          handleInputChange={(index, e) => handleInputChange('veiculos', index, e)}
          handlePriceChange={(index, e) => handlePriceChange('veiculos', index, e)}
        />

        <TabelaInvestimentos
          categoria="Móveis e Utensílios"
          dados={data.moveisUtensilios}
          adicionarItem={() => handleAddItem('moveisUtensilios')}
          removerItem={(index) => handleRemoveItem('moveisUtensilios', index)}
          handleInputChange={(index, e) => handleInputChange('moveisUtensilios', index, e)}
          handlePriceChange={(index, e) => handlePriceChange('moveisUtensilios', index, e)}
        />

        <TabelaInvestimentos
          categoria="Computadores"
          dados={data.computadores}
          adicionarItem={() => handleAddItem('computadores')}
          removerItem={(index) => handleRemoveItem('computadores', index)}
          handleInputChange={(index, e) => handleInputChange('computadores', index, e)}
          handlePriceChange={(index, e) => handlePriceChange('computadores', index, e)}
        />

        <div className="text-right font-bold text-xl mt-4">
          Total de Investimento Fixo: {formatTotal(data.totalGeral)}
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
      </div>
   </form>
    </Authenticated>
  );
};

export default Inves;
