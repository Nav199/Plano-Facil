import React, { useState, useEffect, useRef } from 'react';
import { usePage, useForm } from '@inertiajs/react';


const Comer = ({ planoId }) => {
  const { totalFaturamento, aliquota } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    gastosVendas: [
      { descricao: "SIMPLES (Imposto Federal)", percentual: aliquota, faturamentoEstimado: totalFaturamento, custoTotal: totalFaturamento * aliquota/100 },
      { descricao: "Comissões (Gastos com Vendas)", percentual: 0, faturamentoEstimado: totalFaturamento, custoTotal: 0 },
      { descricao: "Propaganda (Gastos com Vendas)", percentual: 2, faturamentoEstimado: totalFaturamento, custoTotal: totalFaturamento * 0.02 },
      { descricao: "Taxas de Cartões (Gastos com Vendas)", percentual: 0, faturamentoEstimado: totalFaturamento, custoTotal: 0 },
    ],
  });

  const [impostosPorPeriodo, setImpostosPorPeriodo] = useState([]);
  const [gastosComVendasPorPeriodo, setGastosComVendasPorPeriodo] = useState([]);
  const [totaisPorPeriodo, setTotaisPorPeriodo] = useState([]);


  useEffect(() => {
    gerarDadosPorPeriodo();
   
  }, [data.gastosVendas]);

  const formatarNumeroBr = (numero) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numero);
  };

  const calcularProjecao = (valorInicial, percentualCrescimento, periodos) => {
    let valores = [valorInicial];
    for (let i = 1; i < periodos; i++) {
      valores.push(valores[i - 1] * (1 + percentualCrescimento / 100));
    }
    return valores;
  };

  const gerarDadosPorPeriodo = () => {
    const meses = 12;
    const anos = 5;

    const gastosVendasAtualizados = data.gastosVendas.map(item => ({
      ...item,
      custoTotal: item.faturamentoEstimado * (item.percentual / 100),
    }));

    const imposto = gastosVendasAtualizados.find(item => item.descricao.includes("Imposto"));
    const outrosGastos = gastosVendasAtualizados.filter(item => !item.descricao.includes("Imposto"));

    const impostosMensais = calcularProjecao(imposto?.custoTotal || 0, 0, meses);
    const gastosComVendasMensais = calcularProjecao(
      outrosGastos.reduce((acc, item) => acc + item.custoTotal, 0),
      0,
      meses
    );

    const impostosAnuais = calcularProjecao(impostosMensais[11], 0, anos);
    const gastosComVendasAnuais = calcularProjecao(gastosComVendasMensais[11], 0, anos);

    setImpostosPorPeriodo(impostosMensais.concat(impostosAnuais));
    setGastosComVendasPorPeriodo(gastosComVendasMensais.concat(gastosComVendasAnuais));
    setTotaisPorPeriodo(
      impostosMensais.concat(impostosAnuais).map((imposto, i) => imposto + gastosComVendasMensais.concat(gastosComVendasAnuais)[i])
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('comercializacao', { id: planoId }), {
      onSuccess: () => reset(),
    });
  };

  const totalImpostos = impostosPorPeriodo.reduce((acc, curr) => acc + curr, 0);
  const totalGastosVendas = gastosComVendasPorPeriodo.reduce((acc, curr) => acc + curr, 0);
  const totalGeral = totaisPorPeriodo.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Descrição</th>
                <th className="border px-4 py-2">%</th>
                <th className="border px-4 py-2">Faturamento Estimado</th>
                <th className="border px-4 py-2">Custo Total</th>
              </tr>
            </thead>
            <tbody>
              {data.gastosVendas.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.descricao}</td>
                  <td className="border px-4 py-2">{item.percentual}%</td>
                  <td className="border px-4 py-2">{formatarNumeroBr(item.faturamentoEstimado)}</td>
                  <td className="border px-4 py-2">{formatarNumeroBr(item.custoTotal)}</td>
                </tr>
              ))}
              <tr>
                <td className="border px-4 py-2" colSpan="3">Total Impostos</td>
                <td className="border px-4 py-2">{formatarNumeroBr(totalImpostos)}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2" colSpan="3">Total Gastos com Vendas</td>
                <td className="border px-4 py-2">{formatarNumeroBr(totalGastosVendas)}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2" colSpan="3">Total Geral</td>
                <td className="border px-4 py-2">{formatarNumeroBr(totalGeral)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          disabled={processing}
        >
          {processing ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default Comer;
