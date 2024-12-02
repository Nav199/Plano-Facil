import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const Depre = ({ planoId, total }) => {
  const { data, setData, post, processing, errors } = useForm({
    ativos: [
      { nome: 'IMÓVEIS', valor: total.imoveis || 0, vidaUtil: 25, depAnual: 0, depMensal: 0 },
      { nome: 'MÁQUINAS', valor: total.maquinas || 0, vidaUtil: 10, depAnual: 0, depMensal: 0 },
      { nome: 'EQUIPAMENTOS', valor: total.equipamentos || 0, vidaUtil: 10, depAnual: 0, depMensal: 0 },
      { nome: 'MÓVEIS E UTENSÍLIOS', valor: total.moveis_utensilios || 0, vidaUtil: 10, depAnual: 0, depMensal: 0 },
      { nome: 'VEÍCULOS', valor: total.veiculos || 0, vidaUtil: 5, depAnual: 0, depMensal: 0 },
      { nome: 'COMPUTADORES', valor: total.computadores || 0, vidaUtil: 5, depAnual: 0, depMensal: 0 },
    ],
  });

  // Formata o valor para moeda
  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  // Calcula a depreciação anual e mensal
  const calcularDepreciacao = () => {
    const novosAtivos = data.ativos.map((ativo) => ({
      ...ativo,
      depAnual: ativo.valor / ativo.vidaUtil,
      depMensal: (ativo.valor / ativo.vidaUtil) / 12,
    }));
    setData('ativos', novosAtivos);
  };

  // Efeito para calcular a depreciação sempre que os ativos mudam
  useEffect(() => {
    calcularDepreciacao();
  }, [data.ativos]);

  // Manipula a mudança no valor dos ativos
  const handleValorChange = (index, valor) => {
    const novosAtivos = [...data.ativos];
    const novoValor = parseFloat(valor) || 0; // Converte para número ou usa 0
    novosAtivos[index].valor = novoValor;
    setData('ativos', novosAtivos);
  };

  // Manipula o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('depreciacao', { id: planoId })); 
  };

  // Calcula o total da depreciação anual e mensal
  const totalDepAnual = data.ativos.reduce((acc, ativo) => acc + ativo.depAnual, 0);
  const totalDepMensal = data.ativos.reduce((acc, ativo) => acc + ativo.depMensal, 0);

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Ativos Fixos</th>
              <th className="border border-gray-300 px-4 py-2">Valor do bem</th>
              <th className="border border-gray-300 px-4 py-2">Vida útil em Anos</th>
              <th className="border border-gray-300 px-4 py-2">Depreciação Anual</th>
              <th className="border border-gray-300 px-4 py-2">Depreciação Mensal</th>
            </tr>
          </thead>
          <tbody>
            {data.ativos.map((ativo, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{ativo.nome}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    value={ativo.valor}
                    onChange={(e) => handleValorChange(index, e.target.value)}
                    className="w-full p-1 border border-gray-300"
                    placeholder="R$ -"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{ativo.vidaUtil}</td>
                <td className="border border-gray-300 px-4 py-2">{formatarValor(ativo.depAnual)}</td>
                <td className="border border-gray-300 px-4 py-2">{formatarValor(ativo.depMensal)}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="border border-gray-300 px-4 py-2">Total</td>
              <td className="border border-gray-300 px-4 py-2"></td>
              <td className="border border-gray-300 px-4 py-2"></td>
              <td className="border border-gray-300 px-4 py-2">{formatarValor(totalDepAnual)}</td>
              <td className="border border-gray-300 px-4 py-2">{formatarValor(totalDepMensal)}</td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={processing}
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default Depre;