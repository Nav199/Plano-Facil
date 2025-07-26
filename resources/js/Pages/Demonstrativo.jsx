import React from "react";
import { usePage, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Button from "@/Components/Button";

// Funções de formatação
const formatCurrency = (value) => {
  const formatted = Math.abs(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return value < 0 ? `- ${formatted}` : formatted;
};

const formatNumber = (value) => {
  const number = Number(value);
  const formatted = Math.abs(number).toFixed(2).replace('.', ',');
  return number < 0 ? `- ${formatted}` : formatted;
};

const Demonstrativo = ({ planoId, auth }) => {
  const { faturamento, apuracao, custo_fixo, gastos_vendas, investimento } = usePage().props;

  // Valores de entrada
  const totalFaturamento = faturamento?.total ?? 0;
  const faturamentoAnual = faturamento?.faturamento_anual ?? 0;

  const totalApuracao = apuracao?.total ?? 0;
  const apuracaoAnual = apuracao?.apuracao_anual ?? 0;

  const totalCustosFixos = custo_fixo?.total ?? 0;
  const custosFixosAnuais = custo_fixo?.custosFixosAnuais ?? 0;

  const totalGastosVendas = gastos_vendas?.total ?? 0;
  const gastosVendasAnuais = gastos_vendas?.gastosAnuais ?? 0;

  // Cálculo CORRIGIDO da margem e lucro operacional
  const margem = totalFaturamento - (totalApuracao + totalGastosVendas);
  const margem_anual = faturamentoAnual - (apuracaoAnual + gastosVendasAnuais);

  const valor = margem - totalCustosFixos;
  const anual_lucro = margem_anual - custosFixosAnuais;

  const percentual_lucro = totalFaturamento ? ((valor / totalFaturamento) * 100) : 0;
  const Lucra = percentual_lucro;
  const Lucra_anual = faturamentoAnual ? ((anual_lucro / faturamentoAnual) * 100) : 0;
  const Rent = investimento.total ? ((valor / investimento.total) * 100) : 0;
  const Rent_anual = investimento.total ? ((anual_lucro / investimento.total) * 100) : 0;
  const Ponto_equilibrio = totalFaturamento
  ? (totalCustosFixos / (totalFaturamento - totalApuracao - totalGastosVendas)) / totalFaturamento
  : 0;

  const Ponto_anual = faturamentoAnual
    ? (custosFixosAnuais / (faturamentoAnual - apuracaoAnual - gastosVendasAnuais)) / faturamentoAnual
    : 0;

  const roi_anual = anual_lucro !== 0 ? investimento.total / anual_lucro : 0; // em anos
  const roi_mensal = valor !== 0 ? investimento.total / valor : 0; // em meses

  const { data, setData, post, processing } = useForm({
    resumo: [
      { descricao: "Receita Total com Vendas", valor: totalFaturamento, anual: faturamentoAnual, percentual: 100 },
      {
        descricao: "Custos Variáveis Totais",
        valor: totalApuracao + totalGastosVendas,
        anual: apuracaoAnual + gastosVendasAnuais,
        percentual: ((totalApuracao + totalGastosVendas) / totalFaturamento) * 100,
      },
      {
        descricao: "Custos com Materiais Diretos e/ou CMV",
        valor: totalApuracao,
        anual: apuracaoAnual,
        percentual: (totalApuracao / totalFaturamento) * 100,
      },
      {
        descricao: "Gastos com Vendas",
        valor: totalGastosVendas,
        anual: gastosVendasAnuais,
        percentual: (totalGastosVendas / totalFaturamento) * 100,
      },
      {
        descricao: "Margem de Contribuição",
        valor: margem,
        anual: margem_anual,
        percentual: (margem / totalFaturamento) * 100,
      },
      {
        descricao: "Custos Fixos Totais",
        valor: totalCustosFixos,
        anual: custosFixosAnuais,
        percentual: (totalCustosFixos / totalFaturamento) * 100,
      },
      {
        descricao: "Resultado Operacional (Lucro)",
        valor: valor,
        anual: anual_lucro,
        percentual: percentual_lucro,
      },
    ],
    lucro_operacional: valor,
    lucro_anual: anual_lucro,
    porcentagem: percentual_lucro,
    indicadores: {
      lucrabilidade_mensal: Lucra,
      lucrabilidade_anual: Lucra_anual,
      rentabilidade_mensal: Rent,
      rentabilidade_anual: Rent_anual,
      ponto_equilibrio_mensal: Ponto_equilibrio,
      ponto_equilibrio_anual: Ponto_anual,
      roi_mensal: roi_mensal,
      roi_anual: roi_anual,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("demonstrativo", { id: planoId }));
  };

  return (
    <Authenticated user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">Demonstrativo de Resultados</h2>}
    >
      <div className="p-8 bg-gray-100 min-h-screen">
        <form onSubmit={handleSubmit}>
          {/* TABELA DE RESULTADOS */}
          <div className="mb-8">
            <table className="w-full bg-white border border-gray-300 rounded shadow">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border-b">Descrição</th>
                  <th className="p-2 border-b">Valor</th>
                  <th className="p-2 border-b">Valor Anual</th>
                  <th className="p-2 border-b">%</th>
                </tr>
              </thead>
              <tbody>
                {data.resumo.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border-b">{item.descricao}</td>
                    <td className="p-2 border-b">{formatCurrency(item.valor)}</td>
                    <td className="p-2 border-b">{formatCurrency(item.anual)}</td>
                    <td className="p-2 border-b">{formatNumber(item.percentual)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* INDICADORES */}
          <div className="p-8 bg-gray-100">
            <h2 className="text-2xl font-bold text-center mb-6">Indicadores</h2>
            <table className="w-full bg-white border border-gray-300 rounded shadow">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border-b">Descrição</th>
                  <th className="p-2 border-b">Valor Mensal</th>
                  <th className="p-2 border-b">Valor Anual</th>
                  <th className="p-2 border-b">Indicador</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border-b">Lucratividade</td>
                  <td className="p-2 border-b">{formatNumber(Lucra)}%</td>
                  <td className="p-2 border-b">{formatNumber(Lucra_anual)}%</td>
                  <td className="p-2 border-b">Percentual do lucro sobre a receita</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border-b">Ponto de Equilíbrio</td>
                  <td className="p-2 border-b">{formatNumber(Ponto_equilibrio)}</td>
                  <td className="p-2 border-b">{formatNumber(Ponto_anual)}</td>
                  <td className="p-2 border-b">Receita necessária para cobrir custos</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border-b">Rentabilidade</td>
                  <td className="p-2 border-b">{formatNumber(Rent)}%</td>
                  <td className="p-2 border-b">{formatNumber(Rent_anual)}%</td>
                  <td className="p-2 border-b">Percentual do lucro sobre o investimento</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border-b">Prazo de Retorno do Investimento</td>
                  <td className="p-2 border-b">{formatNumber(roi_mensal)} Meses</td>
                  <td className="p-2 border-b">{formatNumber(roi_anual)} Anos</td>
                  <td className="p-2 border-b">Tempo para retorno do investimento</td>
                </tr>
              </tbody>
            </table>
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

export default Demonstrativo;
