import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useForm, usePage } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Button from "@/Components/Button";

Chart.register(...registerables);

const CustosFixos = ({ planoId, auth }) => {
  const chartRef = useRef(null);
  const { Salario, Depreciacao } = usePage().props;

  const formatarNumeroBr = (numero) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numero);
  };

  const parseNumeroBr = (valor) => {
    return parseFloat(valor.replace(/\./g, '').replace(',', '.').replace('R$', '').trim()) || 0;
  };

  const { data, setData, post, processing, errors } = useForm({
    custos: [
      { descricao: 'Aluguel', valor: 'R$ 0,00' },
      { descricao: 'Condomínio', valor: 'R$ 0,00' },
      { descricao: 'IPTU', valor: 'R$ 0,00' },
      { descricao: 'Energia elétrica', valor: 'R$ 0,00' },
      { descricao: 'Telefone', valor: 'R$ 0,00' },
      { descricao: 'Internet', valor: 'R$ 0,00' },
      { descricao: 'Honorários do contador', valor: 'R$ 0,00' },
      { descricao: 'Pró-labore', valor: 'R$ 0,00' },
      { descricao: 'Manutenção dos equipamentos', valor: 'R$ 0,00' },
      { descricao: 'Salários + encargos', valor: formatarNumeroBr(Salario || 0) },
      { descricao: 'Material de limpeza', valor: 'R$ 0,00' },
      { descricao: 'Material de escritório', valor: 'R$ 0,00' },
      { descricao: 'Taxas diversas', valor: 'R$ 0,00' },
      { descricao: 'Serviços de terceiros', valor: 'R$ 0,00' },
      { descricao: 'Depreciação', valor: formatarNumeroBr(Depreciacao || 0) },
      { descricao: 'Contribuições', valor: 'R$ 0,00' },
      { descricao: 'Seguro Predial', valor: 'R$ 0,00' },
    ],
    crescimento: '', // porcentagem de crescimento
    total: 0, // Inicialize o total aqui
  });

  const handlePriceChange = (e, index) => {
    const inputValue = e.target.value;

    // Remove caracteres não numéricos e formata como valor monetário
    const numericValue = inputValue.replace(/[^\d]/g, ''); // Mantém apenas números
    const parsedValue = parseFloat(numericValue) / 100; // Divide por 100 para considerar centavos

    // Formata no padrão brasileiro
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parsedValue || 0);

    handleChange(index, formattedValue);
  };

  const handleChange = (index, value) => {
    const updatedCustos = [...data.custos];
    updatedCustos[index].valor = value;
    setData('custos', updatedCustos);

    // Atualiza o total ao alterar qualquer custo
    const totalCustos = updatedCustos.reduce((acc, custo) => acc + parseNumeroBr(custo.valor), 0);
    setData('total', totalCustos); // Atualiza o valor total
  };

  const handleCrescimentoChange = (e) => {
    setData('crescimento', parseFloat(e.target.value) || 0);
  };

  const totalCustos = data.custos.reduce((acc, custo) => acc + parseNumeroBr(custo.valor), 0);

  const calcularCrescimento = (valor, meses) => {
    return Array.from({ length: meses }, (_, i) => valor * Math.pow(1 + data.crescimento / 100, i));
  };

  const mesesCrescimento = calcularCrescimento(totalCustos, 12 * 5);

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
          'Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5',
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
              },
            },
          },
        },
      },
    });
  }, [data.crescimento, totalCustos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', data); // Verifique os dados no console antes de enviar
    post(route('custo-fixo', { id: planoId }));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
          Custos Fixos
        </h2>
      }
    >
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
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
                      type="text"
                      value={custo.valor}
                      onChange={(e) => handlePriceChange(e, index)}
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

          <div className="flex justify-center mt-4">
            <Button type="submit" processing={processing}>
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </Authenticated>
  );
};

export default CustosFixos;
