import React from "react";
import { usePage, useForm } from "@inertiajs/react";

const Demonstrativo = ({planoId}) => {
  const { faturamento, apuracao, custo_fixo, gastos_vendas } = usePage().props;

  // Dados iniciais 
  const totalFaturamento = faturamento?.total ?? 0;
  const faturamentoAnual = faturamento?.faturamento_anual ?? 0;

  const totalApuracao = apuracao?.total ?? 0;
  const apuracaoAnual = apuracao?.apuracao_anual ?? 0;

  const totalCustosFixos = custo_fixo?.total ?? 0;
  const custosFixosAnuais = custo_fixo?.custosFixosAnuais ?? 0;

  const totalGastosVendas = gastos_vendas?.total ?? 0;
  const gastosVendasAnuais = gastos_vendas?.gastosAnuais ?? 0;

  // Calcule o lucro operacional e outros valores antes de usá-los
  const valor = totalFaturamento - (totalApuracao + totalGastosVendas + totalCustosFixos);
  const anual_lucro = faturamentoAnual - (apuracaoAnual + gastosVendasAnuais + custosFixosAnuais);
  const percentual_lucro = totalFaturamento 
    ? ((valor / totalFaturamento) * 100).toFixed(3) 
    : 0;

  // Indicadores para o 1º mês e para os 5 anos
  const { data, setData, post, processing, errors } = useForm({
    resumo: [
      { descricao: "Receita Total com vendas", valor: totalFaturamento, anual: faturamentoAnual, percentual: ((totalFaturamento / totalFaturamento) * 100).toFixed(3) },
      { descricao: "Custos Variáveis Totais", valor: totalApuracao + totalGastosVendas, anual: apuracaoAnual + gastosVendasAnuais, percentual: ((apuracaoAnual + gastosVendasAnuais) / (totalFaturamento || 1) * 100).toFixed(3) },
      { descricao: "Custos com materiais diretos e/ou CMV", valor: totalApuracao, anual: apuracaoAnual, percentual: ((totalApuracao / totalFaturamento) * 100).toFixed(3) },
      { descricao: "Gastos com Vendas", valor: totalGastosVendas, anual: gastosVendasAnuais, percentual: ((totalGastosVendas / totalFaturamento) * 100).toFixed(2) },
      { descricao: "Margem de Contribuição", valor: totalFaturamento + (totalApuracao + totalGastosVendas), anual: faturamentoAnual - (apuracaoAnual + gastosVendasAnuais), percentual: (((totalApuracao + totalGastosVendas) / totalFaturamento) * 100).toFixed(3) },
      { descricao: "Custos Fixos Totais", valor: totalCustosFixos, anual: custosFixosAnuais, percentual: ((totalCustosFixos / totalFaturamento) * 100).toFixed(3) },
      { descricao: "Resultado Operacional (Lucro)", valor: valor, anual: anual_lucro, percentual: percentual_lucro },
    ],
    lucro_operacional: valor,
    lucro_anual: anual_lucro,
    porcentagem: percentual_lucro
  });

  const handleSubmit = (e) => { 
    e.preventDefault();
    post(route("demonstrativo", { id: planoId }), {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Demonstrativo de Resultados</h1>
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

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            disabled={processing}
          >
            {processing ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Demonstrativo;
