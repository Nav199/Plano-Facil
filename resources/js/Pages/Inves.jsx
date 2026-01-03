import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import TabelaInvestimentos from './pages_financeiro/TabelaInvestimentos/TabelaInvestimentos';

const Inves = ({ planoId, auth }) => {
  const { data, setData, post, processing } = useForm({
    imoveis: [],
    maquinas: [],
    equipamentos: [],
    veiculos: [],
    moveisUtensilios: [],
    computadores: [],
    totalGeral: 0
  });

  const handleAddItem = (categoria) => {
    setData(categoria, [
      ...data[categoria],
      { descricao: '', quantidade: '', valorUnitario: '', total: 0 }
    ]);
  };

  const handleRemoveItem = (categoria, index) => {
    setData(categoria, data[categoria].filter((_, i) => i !== index));
  };

  const handleInputChange = (categoria, index, e) => {
    const { name, value } = e.target;
    const updated = [...data[categoria]];

    updated[index] = {
      ...updated[index],
      [name]: value,
      total: updated[index].quantidade * updated[index].valorUnitario
    };

    setData(categoria, updated);
  };

  const handlePriceChange = (categoria, index, e) => {
    let value = e.target.value;
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');

    const formatted = "R$ " + numericValue
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const updated = [...data[categoria]];
    updated[index] = {
      ...updated[index],
      valorUnitario: formatted,
      total: updated[index].quantidade * parseFloat(numericValue || 0)
    };

    setData(categoria, updated);
  };

  const calcularSubtotal = (categoria) =>
    data[categoria].reduce((acc, item) => acc + Number(item.total || 0), 0);

  const calcularTotal = () =>
    calcularSubtotal('imoveis') +
    calcularSubtotal('maquinas') +
    calcularSubtotal('equipamentos') +
    calcularSubtotal('veiculos') +
    calcularSubtotal('moveisUtensilios') +
    calcularSubtotal('computadores');

  useEffect(() => {
    setData('totalGeral', calcularTotal());
  }, [data.imoveis, data.maquinas, data.equipamentos, data.veiculos, data.moveisUtensilios, data.computadores]);

  const formatTotal = (total) =>
    `R$ ${total.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

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
        <div className="max-w-7xl mx-auto px-4 py-6">

          <TabelaInvestimentos
            categoria="Imóveis"
            dados={data.imoveis}
            adicionarItem={() => handleAddItem('imoveis')}
            removerItem={(i) => handleRemoveItem('imoveis', i)}
            handleInputChange={(i, e) => handleInputChange('imoveis', i, e)}
            handlePriceChange={(i, e) => handlePriceChange('imoveis', i, e)}
          />

          <TabelaInvestimentos
            categoria="Máquinas"
            dados={data.maquinas}
            adicionarItem={() => handleAddItem('maquinas')}
            removerItem={(i) => handleRemoveItem('maquinas', i)}
            handleInputChange={(i, e) => handleInputChange('maquinas', i, e)}
            handlePriceChange={(i, e) => handlePriceChange('maquinas', i, e)}
          />

          <TabelaInvestimentos
            categoria="Equipamentos"
            dados={data.equipamentos}
            adicionarItem={() => handleAddItem('equipamentos')}
            removerItem={(i) => handleRemoveItem('equipamentos', i)}
            handleInputChange={(i, e) => handleInputChange('equipamentos', i, e)}
            handlePriceChange={(i, e) => handlePriceChange('equipamentos', i, e)}
          />

          <TabelaInvestimentos
            categoria="Veículos"
            dados={data.veiculos}
            adicionarItem={() => handleAddItem('veiculos')}
            removerItem={(i) => handleRemoveItem('veiculos', i)}
            handleInputChange={(i, e) => handleInputChange('veiculos', i, e)}
            handlePriceChange={(i, e) => handlePriceChange('veiculos', i, e)}
          />

          <TabelaInvestimentos
            categoria="Móveis e Utensílios"
            dados={data.moveisUtensilios}
            adicionarItem={() => handleAddItem('moveisUtensilios')}
            removerItem={(i) => handleRemoveItem('moveisUtensilios', i)}
            handleInputChange={(i, e) => handleInputChange('moveisUtensilios', i, e)}
            handlePriceChange={(i, e) => handlePriceChange('moveisUtensilios', i, e)}
          />

          <TabelaInvestimentos
            categoria="Computadores"
            dados={data.computadores}
            adicionarItem={() => handleAddItem('computadores')}
            removerItem={(i) => handleRemoveItem('computadores', i)}
            handleInputChange={(i, e) => handleInputChange('computadores', i, e)}
            handlePriceChange={(i, e) => handlePriceChange('computadores', i, e)}
          />

          {/* Total Geral */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex justify-between items-center mt-8">
            <span className="text-lg font-medium text-blue-800">
              Total de Investimento Fixo
            </span>
            <span className="text-2xl font-bold text-blue-900">
              {formatTotal(data.totalGeral)}
            </span>
          </div>

          {/* Botão */}
          <div className="flex justify-end mt-6">
            <Button type="submit" processing={processing} className="px-8 py-3 text-lg rounded-xl">
              Salvar Investimentos
            </Button>
          </div>

        </div>
      </form>
    </Authenticated>
  );
};

export default Inves;
