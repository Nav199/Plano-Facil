import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useForm } from '@inertiajs/react';

Chart.register(...registerables);

const Fatura = ({ planoId, produtos }) => {
  const { data, setData, post, processing, errors } = useForm({
    items: produtos.map((produto) => ({
      descricao: produto.produto,
      quantidade: 0,
      valor: 0
    })),
    crescimento: 0
  });

  const chartRef = useRef(null);

  useEffect(() => {
    renderChart();
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data.items, data.crescimento]);

  const handleChange = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    setData('items', newItems);
  };

  const handleCrescimentoChange = (value) => {
    setData('crescimento', value);
  };

  const calculateTotal = (item) => {
    const quantidade = parseInt(item.quantidade, 10) || 0;
    const valor = parseFloat(item.valor) || 0;
    return quantidade * valor;
  };

  const total = data.items.reduce((acc, item) => acc + calculateTotal(item), 0);

  const formatarNumeroBr = (numero) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numero);
  };

  const renderChart = () => {
    const ctx = document.getElementById('crescimentoChart').getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = [
      'Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6',
      'Mês 7', 'Mês 8', 'Mês 9', 'Mês 10', 'Mês 11', 'Mês 12',
      'Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'
    ];

    // Projeção para os 12 meses
    const crescimentoMensal = [...Array(12).keys()].map((i) => total * Math.pow(1 + data.crescimento / 100, i));

    // Projeção para os 5 anos, acumulando o crescimento mensal
    const crescimentoAnual = [...Array(5).keys()].map((i) => {
      let crescimentoCumulativo = 0;
      for (let j = 0; j <= i * 12; j++) {
        crescimentoCumulativo += total * Math.pow(1 + data.crescimento / 100, j);
      }
      return crescimentoCumulativo;
    });

    // Unir os dados de meses e anos para o gráfico
    const crescimentoData = [...crescimentoMensal, ...crescimentoAnual];

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Faturamento (R$)',
            data: crescimentoData,
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
                return `R$ ${context.raw.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
              },
            },
          },
        },
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('faturamento',{id: planoId}));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <h2 className="text-2xl font-bold mt-8 mb-6">Faturamento</h2>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-lg ">
          <table className="w-full">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.descricao}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantidade}
                      onChange={(e) => handleChange(index, 'quantidade', e.target.value)}
                      className="w-full p-2 pl-10 text-sm text-gray-700"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.valor}
                      onChange={(e) => handleChange(index, 'valor', e.target.value)}
                      className="w-full p-2 pl-10 text-sm text-gray-700"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <label>
              Crescimento (%):
              <input
                type="number"
                value={data.crescimento}
                onChange={(e) => handleCrescimentoChange(e.target.value)}
                className="w-full p-2 pl-10 text-sm text-gray-700"
              />
            </label>
          </div>

          <canvas id="crescimentoChart" width="400" height="200"></canvas>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Fatura;