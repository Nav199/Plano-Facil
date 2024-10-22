import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Comer = () => {
  const [crescimento, setCrescimento] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    renderChart();
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [crescimento]);

  const formatarNumeroBr = (numero) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numero);
  };

  // Dados fixos para a tabela
  const gastosVendas = [
    { descricao: "SIMPLES (Imposto Federal)", percentual: 12.00, faturamentoEstimado: 9490.00, custoTotal: 1138.80 },
    { descricao: "Comissões (Gastos com Vendas)", percentual: 0.00, faturamentoEstimado: 9490.00, custoTotal: 0.00 },
    { descricao: "Propaganda (Gastos com Vendas)", percentual: 2.00, faturamentoEstimado: 9490.00, custoTotal: 189.80 },
    { descricao: "Taxas de Cartões (Gastos com Vendas)", percentual: 0.00, faturamentoEstimado: 9490.00, custoTotal: 0.00 },
  ];

  const totalImpostos = gastosVendas[0].custoTotal; // Imposto Federal
  const totalGastosVendas = gastosVendas.slice(1).reduce((acc, item) => acc + item.custoTotal, 0);
  const totalGeral = totalImpostos + totalGastosVendas;

  const renderChart = () => {
    const ctx = document.getElementById('crescimentoChart').getContext('2d');
    
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = ['Total Impostos', 'Total Gastos com Vendas', 'Total Geral'];
    const data = [totalImpostos, totalGastosVendas, totalGeral];

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Valores (R$)',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${formatarNumeroBr(context.raw)}`;
              }
            }
          }
        }
      },
    });
  };

  // Dados da Projeção de Crescimento
  const projecao = [
    { periodo: 'Mês 1', gastosVendas: 189.80, impostos: totalImpostos, total: totalGeral },
    { periodo: 'Mês 2', gastosVendas: 191.70, impostos: 1341.89, total: 1533.58 },
    { periodo: 'Mês 3', gastosVendas: 193.61, impostos: 1355.30, total: 1548.92 },
    { periodo: 'Mês 4', gastosVendas: 195.55, impostos: 1368.86, total: 1564.41 },
    { periodo: 'Mês 5', gastosVendas: 197.51, impostos: 1382.55, total: 1580.05 },
    { periodo: 'Mês 6', gastosVendas: 199.48, impostos: 1396.37, total: 1595.85 },
    { periodo: 'Mês 7', gastosVendas: 201.48, impostos: 1410.34, total: 1611.81 },
    { periodo: 'Mês 8', gastosVendas: 203.49, impostos: 1424.44, total: 1627.93 },
    { periodo: 'Mês 9', gastosVendas: 205.53, impostos: 1438.68, total: 1644.21 },
    { periodo: 'Mês 10', gastosVendas: 207.58, impostos: 1453.07, total: 1660.65 },
    { periodo: 'Mês 11', gastosVendas: 209.66, impostos: 1467.60, total: 1677.26 },
    { periodo: 'Mês 12', gastosVendas: 211.75, impostos: 1482.28, total: 1694.03 },
    { periodo: 'Ano 1', gastosVendas: 2407.14, impostos: 1497.10, total: 3904.24 },
    { periodo: 'Ano 2', gastosVendas: 2431.21, impostos: 1512.07, total: 3943.28 },
    { periodo: 'Ano 3', gastosVendas: 2455.52, impostos: 1527.19, total: 3982.71 },
    { periodo: 'Ano 4', gastosVendas: 2480.08, impostos: 1542.46, total: 4022.54 },
    { periodo: 'Ano 5', gastosVendas: 2504.88, impostos: 1557.89, total: 4062.77 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mt-8 mb-6">Custos de Comercialização</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mb-8">
        <table className="table-auto w-full mb-6 border-collapse text-center">
          <thead>
            <tr>
              <th className="text-left p-2">Descrição</th>
              <th className="text-center p-2">%</th>
              <th className="text-center p-2">Faturamento Estimado</th>
              <th className="text-center p-2">Custo Total</th>
            </tr>
          </thead>
          <tbody>
            {gastosVendas.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{item.descricao}</td>
                <td className="p-2">{item.percentual.toFixed(2)}%</td>
                <td className="p-2">{formatarNumeroBr(item.faturamentoEstimado)}</td>
                <td className="p-2">{formatarNumeroBr(item.custoTotal)}</td>
              </tr>
            ))}
            <tr className="font-bold border-t">
              <td className="p-2">Total Impostos</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2">{formatarNumeroBr(totalImpostos)}</td>
            </tr>
            <tr className="font-bold border-t">
              <td className="p-2">Total Gastos com Vendas</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2">{formatarNumeroBr(totalGastosVendas)}</td>
            </tr>
            <tr className="font-bold border-t">
              <td className="p-2">Total Geral</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2">{formatarNumeroBr(totalGeral)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mb-8">
        <h3 className="text-xl font-bold mb-4">Projeção de Crescimento</h3>
        <p className="mb-2">% fixo de crescimento (estipular somente se não for trabalhar percentual específico de crescimento por mês): 1%</p>
        <table className="table-auto w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="text-left p-2">Período</th>
              <th className="text-center p-2">Gastos com Vendas</th>
              <th className="text-center p-2">Impostos</th>
              <th className="text-center p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {projecao.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{item.periodo}</td>
                <td className="p-2">{formatarNumeroBr(item.gastosVendas)}</td>
                <td className="p-2">{formatarNumeroBr(item.impostos)}</td>
                <td className="p-2">{formatarNumeroBr(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-4xl mb-8">
        <canvas id="crescimentoChart"></canvas>
      </div>
      <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={processing}
          >
            {processing ? 'Enviando...' : 'Enviar'}
          </button>
    </div>
  );
};

export default Comer;
