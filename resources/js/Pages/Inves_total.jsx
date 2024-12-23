import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useForm, usePage } from '@inertiajs/react';
import { Pie } from 'react-chartjs-2';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

ChartJS.register(ArcElement, Tooltip, Legend);

const Inves_total = ({ planoId, auth }) => {
  const { investimento } = usePage().props;

  const dataInvestimentos = [
    { descricao: 'Investimentos Fixos', valor: investimento.soma_total },
    { descricao: 'Capital de Giro', valor: investimento.capital_giro },
    { descricao: 'Investimentos Pré-Operacionais', valor: investimento.investimento_pre },
  ];

  const totalValor = dataInvestimentos.reduce((acc, item) => acc + item.valor, 0);

  // Adiciona a porcentagem a cada item
  const dataInvestimentosComPorcentagem = dataInvestimentos.map((item) => ({
    ...item,
    porcentagem: ((item.valor / totalValor) * 100).toFixed(2),
  }));

  const chartData = {
    labels: dataInvestimentosComPorcentagem.map((item) => item.descricao),
    datasets: [
      {
        label: 'Distribuição dos Investimentos (%)',
        data: dataInvestimentosComPorcentagem.map((item) => item.porcentagem),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  
  const { post, processing } = useForm({
    investimentos: dataInvestimentosComPorcentagem,
    total: totalValor,
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 
    post(route('investimento-total', { id: planoId }), {
      onSuccess: () => reset(),
    });
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
          Investimento Total
        </h2>
      }
    >
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
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
                {dataInvestimentosComPorcentagem.map((item, index) => (
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
              <h3 className="font-bold text-xl">
                Total: R$ {totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h3>
            </div>

            {/* Gráfico de pizza centralizado */}
            <h3 className="text-center text-xl font-bold mb-4 w-full">Distribuição dos Investimentos (%)</h3>
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-6 flex justify-center items-center mx-auto">
              <Pie data={chartData} />
            </div>

            {/* Botão de Enviar */}
            <div className="mt-6 flex justify-center">
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
      </div>
    </Authenticated>
  );
};

export default Inves_total;
