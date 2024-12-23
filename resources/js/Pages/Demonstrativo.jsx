import React from "react";
import { usePage, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Button from "@/Components/Button";

const Demonstrativo = ({ planoId, auth }) => {
  const { faturamento, apuracao, custo_fixo, gastos_vendas,investimento } = usePage().props;

  // Dados iniciais
  const totalFaturamento = faturamento?.total ?? 0;
  const faturamentoAnual = faturamento?.faturamento_anual ?? 0;

  const totalApuracao = apuracao?.total ?? 0;
  const apuracaoAnual = apuracao?.apuracao_anual ?? 0;

  const totalCustosFixos = custo_fixo?.total ?? 0;
  const custosFixosAnuais = custo_fixo?.custosFixosAnuais ?? 0;

  const totalGastosVendas = gastos_vendas?.total ?? 0;
  const gastosVendasAnuais = gastos_vendas?.gastosAnuais ?? 0;

  // Cálculos financeiros
  const valor = totalFaturamento - (totalApuracao + totalGastosVendas + totalCustosFixos);
  const anual_lucro = faturamentoAnual - (apuracaoAnual + gastosVendasAnuais + custosFixosAnuais);
  const percentual_lucro = totalFaturamento
    ? ((valor / totalFaturamento) * 100).toFixed(2)
    : 0;

  const Lucra = ((valor / totalFaturamento) * 100).toFixed(2);
  const Lucra_anual = ((anual_lucro / faturamentoAnual) * 100).toFixed(2);
  const Rent = ((totalFaturamento/investimento.total)*100).toFixed(2);
  const Rent_anual = (faturamentoAnual/investimento.total)*100;
  const Ponto_equilibrio = (totalCustosFixos / (totalFaturamento - totalApuracao)).toFixed(2);
  const Ponto_anual = (custosFixosAnuais / (faturamentoAnual - apuracaoAnual)).toFixed(2);

  const roi = (((totalFaturamento / investimento.total) * 100)).toFixed(2);
  const roi_anual = (((faturamentoAnual / investimento.total) * 100)).toFixed(2);
  const roi_mensal = (roi_anual / 12).toFixed(2);
  

  // Formulário e dados
  const { data, setData, post, processing, errors } = useForm({
    resumo: [
      { descricao: "Receita Total com Vendas", valor: totalFaturamento, anual: faturamentoAnual, percentual: 100 },
      { descricao: "Custos Variáveis Totais", valor: totalApuracao + totalGastosVendas, anual: apuracaoAnual + gastosVendasAnuais, percentual: (((totalApuracao + totalGastosVendas) / totalFaturamento) * 100).toFixed(2) },
      { descricao: "Custos com Materiais Diretos e/ou CMV", valor: totalApuracao, anual: apuracaoAnual, percentual: ((totalApuracao / totalFaturamento) * 100).toFixed(2) },
      { descricao: "Gastos com Vendas", valor: totalGastosVendas, anual: gastosVendasAnuais, percentual: ((totalGastosVendas / totalFaturamento) * 100).toFixed(2) },
      { descricao: "Margem de Contribuição", valor: valor, anual: anual_lucro, percentual: percentual_lucro },
      { descricao: "Custos Fixos Totais", valor: totalCustosFixos, anual: custosFixosAnuais, percentual: ((totalCustosFixos / totalFaturamento) * 100).toFixed(2) },
      { descricao: "Resultado Operacional (Lucro)", valor: valor, anual: anual_lucro, percentual: percentual_lucro },
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
    post(route("demonstrativo", { id: planoId }), {
      onSuccess: () => reset(),
    });
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
          Demonstrativo de Resultados
        </h2>
      }
    >
      <div className="p-8 bg-gray-100 min-h-screen">
        <form onSubmit={handleSubmit}>
          {/* Resumo da tabela */}
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
                    <td className="p-2 border-b">{`R$ ${item.valor.toFixed(2).replace(".", ",")}`}</td>
                    <td className="p-2 border-b">{`R$ ${item.anual.toFixed(2).replace(".", ",")}`}</td>
                    <td className="p-2 border-b">{`${item.percentual}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tabela de Indicadores */}
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
                  <td className="p-2 border-b">{`${Lucra}%`}</td>
                  <td className="p-2 border-b">{`${Lucra_anual}%`}</td>
                  <td className="p-2 border-b">Percentual do lucro sobre a receita</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border-b">Ponto de Equilíbrio</td>
                  <td className="p-2 border-b">{`${Ponto_equilibrio}`}</td>
                  <td className="p-2 border-b">{`${Ponto_anual}`}</td>
                  <td className="p-2 border-b">Receita necessária para cobrir custos</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border-b">Rentabilidade</td>
                  <td className="p-2 border-b">{`${Rent}%`}</td>
                  <td className="p-2 border-b">{`${Rent_anual.toFixed(2)}%`}</td>
                  <td className="p-2 border-b">Percentual do lucro sobre o investimento</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border-b">Prazo de Retorno do Investimento</td>
                  <td className="p-2 border-b">{`${
                    roi_mensal < 0 ? "-" : ""
                  }${Math.abs(roi_mensal).toFixed(2)} Meses`}</td>
                  <td className="p-2 border-b">{`${
                    roi_anual < 0 ? "-" : ""
                  }${Math.abs(roi_anual).toFixed(2)} Anos`}</td>
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
