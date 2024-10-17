import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useForm, usePage } from '@inertiajs/react';

Chart.register(...registerables);

const CustosFixos = ({ planoId }) => {
  const chartRef = useRef(null);
  const { Salario, Depreciacao } = usePage().props; 

  const { data, setData, post, processing, errors } = useForm({
    custos: [
      { descricao: 'Aluguel', valor: '' },
      { descricao: 'Condomínio', valor: '' },
      { descricao: 'IPTU', valor: '' },
      { descricao: 'Energia elétrica', valor: '' },
      { descricao: 'Telefone', valor: '' },
      { descricao: 'Internet', valor: '' },
      { descricao: 'Honorários do contador', valor: '' },
      { descricao: 'Pró-labore', valor: '' },
      { descricao: 'Manutenção dos equipamentos', valor: '' },
      { descricao: 'Salários + encargos', valor: Salario || '' },
      { descricao: 'Material de limpeza', valor: '' },
      { descricao: 'Material de escritório', valor: '' },
      { descricao: 'Taxas diversas', valor: '' },
      { descricao: 'Serviços de terceiros', valor: '' },
      { descricao: 'Depreciação', valor: Depreciacao || '' },
      { descricao: 'Contribuições', valor: '' },
      { descricao: 'Seguro Predial', valor: '' }
    ],
    crescimento: '', // porcentagem de crescimento
  });

  // Função para atualizar os valores dos custos
  const handleChange = (index, value) => {
    const updatedCustos = [...data.custos];
    updatedCustos[index].valor = value === "" ? "" : parseFloat(value) || 0;
    setData('custos', updatedCustos);
  };

  const handleCrescimentoChange = (e) => {
    setData('crescimento', parseFloat(e.target.value) || 0);
  };

  const totalCustos = data.custos.reduce((acc, custo) => acc + (parseFloat(custo.valor) || 0), 0);

  const calcularCrescimento = (valor, meses) => {
    return Array.from({ length: meses }, (_, i) => valor * Math.pow(1 + data.crescimento / 100, i));
  };

  const mesesCrescimento = calcularCrescimento(totalCustos, 12 * 5);

  const formatarNumeroBr = (numero) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numero);
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('crescimentoChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6',
          'Mês 7', 'Mês 8', 'Mês 9', 'Mês 10', 'Mês 11', 'Mês 12',
          'Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'
        ],
        datasets: [
          {
            label: 'Custos Fixos (R$)',
            data: mesesCrescimento.slice(0, 12).concat(
              [mesesCrescimento.slice(0, 12).reduce((acc, val) => acc + val, 0)],  // Ano 1
              [mesesCrescimento.slice(0, 24).reduce((acc, val) => acc + val, 0)],  // Ano 2
              [mesesCrescimento.slice(0, 36).reduce((acc, val) => acc + val, 0)],  // Ano 3
              [mesesCrescimento.slice(0, 48).reduce((acc, val) => acc + val, 0)],  // Ano 4
              [mesesCrescimento.slice(0, 60).reduce((acc, val) => acc + val, 0)]   // Ano 5
            ),
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
              }
            }
          }
        }
      },
    });
  }, [data.crescimento, totalCustos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('custo-fixo', { id: planoId }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <h2 className="text-2xl font-bold mt-8 mb-6">Custos Fixos</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <table className="table-auto w-full mb-6 border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2">Descrição</th>
              <th className="text-left p-2">Custo (R$)</th>
            </tr>
          </thead>
          <tbody>
            {data.custos.map((custo, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{custo.descricao}</td>
                <td className="p-2">
                  <input
                    type="number"
                    value={custo.valor === 0 ? '' : custo.valor}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                    placeholder="R$ 0,00"
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold border-t">
              <td className="p-2">TOTAL</td>
              <td className="p-2">{formatarNumeroBr(totalCustos)}</td>
            </tr>
          </tfoot>
        </table>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700">
            Projeção de Crescimento (% ao mês)
          </label>
          <input
            type="number"
            step="0.01"
            value={data.crescimento}
            onChange={handleCrescimentoChange}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder="0"
          />
        </div>

        <div className="mb-6">
          <canvas id="crescimentoChart"></canvas>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          disabled={processing}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default CustosFixos;
