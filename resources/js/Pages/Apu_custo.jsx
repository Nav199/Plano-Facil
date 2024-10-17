import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
 
const Apu_custo = () => {
  const [items, setItems] = useState([{ descricao: '', vendas: 0, custo: 0 }]);
  const [crescimento, setCrescimento] = useState(0);
  const chartRef = useRef(null); // Referência para o gráfico

  useEffect(() => {
    renderChart(); 
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destruir o gráfico ao desmontar o componente ou atualizar
      }
    };
  }, [items, crescimento]); // Atualizar o gráfico quando os dados ou o crescimento mudarem

  const handleAddItem = () => {
    setItems([...items, { descricao: '', vendas: 0, custo: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = parseFloat(value);
    setItems(newItems);
  };

  const totalCMV = items.reduce((acc, item) => acc + (item.vendas * item.custo || 0), 0);

  const handleCrescimentoChange = (e) => {
    setCrescimento(parseFloat(e.target.value));
  };

  const calcularCrescimento = (valor, meses) => {
    return Array.from({ length: meses }, (_, i) => valor * Math.pow(1 + crescimento / 100, i));
  };

  const formatarNumeroBr = (numero) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numero);
  };

  const mesesCrescimento = calcularCrescimento(totalCMV, 12 * 5); // Calcula para 5 anos (60 meses)

  // Função para renderizar o gráfico
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
  
    const data = mesesCrescimento.slice(0, 12).concat(
      [mesesCrescimento.slice(0, 12).reduce((acc, val) => acc + val, 0)],  // Ano 1
      [mesesCrescimento.slice(0, 24).reduce((acc, val) => acc + val, 0)],  // Ano 2
      [mesesCrescimento.slice(0, 36).reduce((acc, val) => acc + val, 0)],  // Ano 3
      [mesesCrescimento.slice(0, 48).reduce((acc, val) => acc + val, 0)],  // Ano 4
      [mesesCrescimento.slice(0, 60).reduce((acc, val) => acc + val, 0)]   // Ano 5
    );
  
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,  // Adiciona os rótulos personalizados
        datasets: [
          {
            label: 'CMV (R$)',
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
                return `R$ ${context.raw.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
              }
            }
          }
        }
      },
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <h2 className="text-2xl font-bold mt-8 mb-6">Apuração do Custo de MD ou MV</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <table className="table-auto w-full mb-6 border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2">
                <button
                  onClick={handleAddItem}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                >
                  Adicionar
                </button>
              </th>
              <th className="text-left p-2">Produto/Serviço</th>
              <th className="text-left p-2">Estimativa Vendas</th>
              <th className="text-left p-2">Custo Unitário</th>
              <th className="text-left p-2">CMD / CMV</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2"></td>
                <td className="p-2">
                  <input
                    type="text"
                    name="descricao"
                    placeholder="Descrição"
                    value={item.descricao}
                    onChange={(e) => handleChange(index, 'descricao', e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="vendas"
                    placeholder="Vendas"
                    value={item.vendas}
                    onChange={(e) => handleChange(index, 'vendas', e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="custo"
                    placeholder="Custo Unitário"
                    value={item.custo}
                    onChange={(e) => handleChange(index, 'custo', e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                  />
                </td>
                <td className="p-2">
                  {formatarNumeroBr(item.vendas * item.custo)}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">Total CMD / CMV: {formatarNumeroBr(totalCMV)}</h3>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-lg">Projeção de Crescimento</h3>
          <div className="flex items-center mt-2">
            <label htmlFor="crescimento" className="mr-4">% fixo de crescimento:</label>
            <input
              type="number"
              id="crescimento"
              value={crescimento}
              onChange={handleCrescimentoChange}
              className="border border-gray-300 p-2 w-20 rounded"
            /> %
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-lg">Projeção por Período</h3>
          <table className="table-auto w-full mb-6 border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2">Período</th>
                <th className="text-left p-2">CMV</th>
              </tr>
            </thead>
            <tbody>
              {mesesCrescimento.slice(0, 12).map((valor, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">Mês {index + 1}</td>
                  <td className="p-2">{formatarNumeroBr(valor)}</td>
                </tr>
              ))}
              <tr className="font-bold border-t">
                <td className="p-2">Ano 1</td>
                <td className="p-2">{formatarNumeroBr(mesesCrescimento.slice(0, 12).reduce((acc, val) => acc + val, 0))}</td>
              </tr>
              <tr className="font-bold border-t">
                <td className="p-2">Ano 5</td>
                <td className="p-2">{formatarNumeroBr(mesesCrescimento.slice(0, 60).reduce((acc, val) => acc + val, 0))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Gráfico de colunas */}
        <div className="mt-6">
          <canvas id="crescimentoChart" width="400" height="200"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Apu_custo;
