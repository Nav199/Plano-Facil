import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useForm, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

Chart.register(...registerables);

const ApuCusto = ({ planoId, auth }) => {
  const { faturamento, custoUnitario } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    items: faturamento.map((item) => {
      const custo = custoUnitario.length > 0 ? 
      parseFloat(custoUnitario.find(c => c.produto === item.produto_servico)?.total_geral) || 0 
      : 0;

      return {
        descricao: item.produto_servico,
        vendas: item.estimativa_vendas,
        custo: custo,
      };
    }),
    crescimento: 0,
  });

  const chartRef = useRef(null);

  const totalCMV = data.items.reduce(
    (acc, item) => acc + (item.vendas * item.custo || 0),
    0
  );

  const calcularCrescimento = (valor, meses) => {
    const crescimentoArray = [];
    for (let i = 0; i < meses; i++) {
      crescimentoArray.push(valor * Math.pow(1 + data.crescimento / 100, i));
    }
    return crescimentoArray;
  };
  

  const mesesCrescimento = calcularCrescimento(totalCMV, 12 * 5);

  const formatarNumeroBr = (numero) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numero);
  };

  const renderChart = () => {
    const ctx = document.getElementById('crescimentoChart').getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = [
      'Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6', 'Mês 7', 'Mês 8', 'Mês 9', 'Mês 10', 'Mês 11', 'Mês 12',
      'Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'
    ];

    const dataValues = mesesCrescimento
      .slice(0, 12)
      .concat(
        [mesesCrescimento.slice(0, 12).reduce((acc, val) => acc + val, 0)],
        [mesesCrescimento.slice(0, 24).reduce((acc, val) => acc + val, 0)],
        [mesesCrescimento.slice(0, 36).reduce((acc, val) => acc + val, 0)],
        [mesesCrescimento.slice(0, 48).reduce((acc, val) => acc + val, 0)],
        [mesesCrescimento.slice(0, 60).reduce((acc, val) => acc + val, 0)]
      );

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'CMV (R$)',
            data: dataValues,
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
              label: function (context) {
                return formatarNumeroBr(context.raw);
              },
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    if (data.items.length > 0) {
      renderChart();
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data.items, data.crescimento]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('apuracao', { id: planoId }));
  };
 
  const handleCrescimentoChange = (e) => {
    setData('crescimento', parseFloat(e.target.value) || 0);
  };

  return (
  <Authenticated
          user={auth.user}
          header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
              Apuração de custo
            </h2>
          }
        >
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">Produto/Serviço</th>
              <th className="border px-4 py-2">Estimativa de Vendas</th>
              <th className="border px-4 py-2">Custo Unitário (R$)</th>
              <th className="border px-4 py-2">Total (R$)</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.descricao}</td>
                <td className="border px-4 py-2">{item.vendas}</td>
                <td className="border px-4 py-2">{formatarNumeroBr(item.custo)}</td>
                <td className="border px-4 py-2">{formatarNumeroBr(item.vendas * item.custo)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <h3 className="text-lg font-bold">Total:</h3>
          <p className="text-xl text-gray-800">{formatarNumeroBr(totalCMV)}</p>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Projeção de Crescimento (%):
          </label>
          <input
            type="number"
            value={data.crescimento}
            onChange={handleCrescimentoChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <canvas id="crescimentoChart" className="mt-6 w-full h-64"></canvas>

        <div className="flex justify-center">
            <Button
              type="submit"
              processing={processing}
              className="extra-classes-if-needed"
            >
              Enviar
            </Button>
          </div>
      </form>
    </div>
    </Authenticated>
  );
};

export default ApuCusto;
