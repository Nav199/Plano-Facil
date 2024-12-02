import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useForm } from '@inertiajs/react';

ChartJS.register(ArcElement, Tooltip, Legend);

const Inves_total = () => {
  // Dados dos investimentos
  const dataInvestimentos = [
    { descricao: 'Investimentos Fixos – Quadro 5.1', valor: 14900, porcentagem: 9 },
    { descricao: 'Capital de Giro – Quadro 5.3', valor: 50538.44, porcentagem: 31 },
    { descricao: 'Investimentos Pré-Operacionais – Quadro 5.4', valor: 100000, porcentagem: 60 }
  ];

  const totalValor = dataInvestimentos.reduce((acc, item) => acc + item.valor, 0);

  // Configuração dos dados para o gráfico de pizza
  const chartData = {
    labels: dataInvestimentos.map((item) => item.descricao),
    datasets: [
      {
        label: 'Distribuição dos Investimentos (%)',
        data: dataInvestimentos.map((item) => item.porcentagem),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Utilizando o useForm do Inertia para o envio
  const { data, setData, post, processing, errors } = useForm({
    investimentos: dataInvestimentos,
  });

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); 
    post('/enviar-investimentos', { // Substitua a URL conforme necessário
      investimentos: data.investimentos,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <Header />
      <h2 className="text-2xl font-bold mt-8 mb-6">Investimentos Totais</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mb-8">
        <form onSubmit={handleSubmit}>
          <table className="table-auto w-full mb-6 border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2">Descrição dos Investimentos</th>
                <th className="text-left p-2">Valor</th>
                <th className="text-left p-2">(%)</th>
              </tr>
            </thead>
            <tbody>
              {dataInvestimentos.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{item.descricao}</td>
                  <td className="p-2">R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-2">{item.porcentagem}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <div></div>
            <h3 className="font-bold text-xl">Total: R$ {totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
          </div>

          {/* Gráfico de pizza */}
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-center text-xl font-bold mb-4">Distribuição dos Investimentos (%)</h3>
            <Pie data={chartData} />
          </div>

          {/* Botão de Enviar */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              disabled={processing} // Desabilita o botão enquanto o envio está em progresso
            >
              {processing ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inves_total;
