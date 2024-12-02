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
  
    // Crescimento mensal
    const crescimentoMensal = [...Array(12).keys()].map((i) => total * Math.pow(1 + data.crescimento / 100, i));
  
    const ano1 = crescimentoMensal[11];
  
    
    const crescimentoAnual = [...Array(5).keys()].map((i) => {
      return ano1 * Math.pow(1 + data.crescimento / 100, i); 
    });
  

    const dataSet = crescimentoMensal.concat(crescimentoAnual);
  
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Faturamento (R$)',
            data: dataSet,
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
                return formatarNumeroBr(context.raw);
              }
            }
          }
        }
      },
    });
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();  // Impede o envio do formulário
    post(route('faturamento', { id: planoId }), {
      onSuccess: () => reset(),
    });
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <h2 className="text-2xl font-bold mt-8 mb-6">Faturamento</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <table className="table-auto w-full mb-6 border-collapse text-center">
          <thead>
            <tr>
              <th className="p-2 text-center">Produto/Serviço</th>
              <th className="text-center p-2">Quantidade</th>
              <th className="text-center p-2">Valor</th>
              <th className="text-center p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">
                  <input
                    type="text"
                    placeholder="Descrição"
                    value={item.descricao}
                    onChange={(e) => handleChange(index, 'descricao', e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    placeholder="Quantidade"
                    value={item.quantidade}
                    onChange={(e) => handleChange(index, 'quantidade', e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                    min="0"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    placeholder="R$ Valor"
                    value={item.valor}
                    onChange={(e) => handleChange(index, 'valor', e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                    min="0"
                  />
                </td>
                <td className="p-2">
                  {formatarNumeroBr(calculateTotal(item))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">Total do Faturamento: {formatarNumeroBr(total)}</h3>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-lg">Projeção de Crescimento</h3>
          <div className="flex items-center mt-2">
            <label htmlFor="crescimento" className="mr-4">% fixo de crescimento:</label>
            <input
              type="number"
              id="crescimento"
              value={data.crescimento}
              onChange={(e) => handleCrescimentoChange(parseFloat(e.target.value))}
              className="border border-gray-300 p-2 w-20 rounded"
            /> %
          </div>
        </div>

        <div className="mt-8">
          <canvas id="crescimentoChart" width="400" height="200"></canvas>
        </div>

        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={processing}
          >
            Enviar
          </button>
        </div>
      </div> 
    </div>
  );
};

export default Fatura;
