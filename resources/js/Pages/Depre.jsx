import React, { useState, useEffect } from 'react';

const Depre = ({ planoId, total }) => {
  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const [ativos, setAtivos] = useState([
    { nome: 'IMÓVEIS', valor: total.imoveis || 0, vidaUtil: 25, depAnual: 0, depMensal: 0 },
    { nome: 'MÁQUINAS', valor: total.maquinas || 0, vidaUtil: 10, depAnual: 0, depMensal: 0 },
    { nome: 'EQUIPAMENTOS', valor: total.equipamentos || 0, vidaUtil: 10, depAnual: 0, depMensal: 0 },
    { nome: 'MÓVEIS E UTENSÍLIOS', valor: total.moveis_utensilios || 0, vidaUtil: 10, depAnual: 0, depMensal: 0 },
    { nome: 'VEÍCULOS', valor: total.veiculos || 0, vidaUtil: 5, depAnual: 0, depMensal: 0 },
    { nome: 'COMPUTADORES', valor: total.computadores || 0, vidaUtil: 5, depAnual: 0, depMensal: 0 },
  ]);

  useEffect(() => {
    const calcularDepreciacao = () => {
      const novosAtivos = ativos.map(ativo => ({
        ...ativo,
        depAnual: ativo.valor / ativo.vidaUtil,
        depMensal: (ativo.valor / ativo.vidaUtil) / 12,
      }));
      setAtivos(novosAtivos);
    };

    calcularDepreciacao();
  }, [ativos]);

  const handleValorChange = (index, valor) => {
    const novosAtivos = [...ativos];
    const novoValor = parseFloat(valor) || 0;
    novosAtivos[index].valor = novoValor;
    setAtivos(novosAtivos);
  };

  const totalDepAnual = ativos.reduce((acc, ativo) => acc + ativo.depAnual, 0);
  const totalDepMensal = ativos.reduce((acc, ativo) => acc + ativo.depMensal, 0);

  return (
    <div className="container mx-auto p-4">
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
          {ativos.map((ativo, index) => (
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
    </div>
  );
};

export default Depre;
