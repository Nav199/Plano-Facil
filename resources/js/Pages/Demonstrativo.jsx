import React from "react";
import { usePage, useForm } from "@inertiajs/react";

const Demonstrativo = () => {
  const { faturamento, apuracao, custo_fixo, gastos_vendas } = usePage().props;

  // Dados iniciais
  const totalFaturamento = faturamento?.total ?? 0;
  const faturamentoAnual = faturamento?.faturamento_anual ?? 0;

  const totalApuracao = apuracao?.total ?? 0;
  const apuracaoAnual = apuracao?.apuracao_anual ?? 0;

  const totalCustosFixos = custo_fixo?.total ?? 0;
  const custosFixosAnuais = custo_fixo?.custosFixosAnuais ?? 0;

  const totalGastosVendas = gastos_vendas?.total ?? 0;
  const gastosVendasAnuais = gastos_vendas?.gastosVendasAnuais ?? 0;

  // Cálculos de indicadores para cada período
  const calcularIndicadores = (ano) => {
    let receita = totalFaturamento;
    let custosVariaveis = totalApuracao;
    let custosFixos = totalCustosFixos;
    let gastosVendas = totalGastosVendas;

    if (ano === 1) {
      receita = faturamentoAnual;
      custosVariaveis = apuracaoAnual;
      custosFixos = custosFixosAnuais;
      gastosVendas = gastosVendasAnuais;
    }

    // Cálculo de Custos Variáveis Totais
    const custosVariaveisTotais = custosVariaveis + gastosVendas;

    // Cálculo de Margem de Contribuição
    const margemContribuicao = receita - custosVariaveisTotais;

    // Cálculos do Resultado Operacional
    const resultadoOperacional = margemContribuicao - custosFixos;
    const pontoEquilibrio = custosFixos / ((margemContribuicao / receita) || 1);
    const retornoInvestimento = resultadoOperacional / (custosFixos || 1);
    const lucratividade = (resultadoOperacional / receita) * 100;
    const rentabilidade = (resultadoOperacional / custosFixos) * 100;

    return {
      periodo: ano === 0 ? "1º mês" : `Ano ${ano}`,
      receita,
      custosVariaveis,
      custosFixos,
      gastosVendas,
      custosVariaveisTotais,
      margemContribuicao,
      resultadoOperacional,
      pontoEquilibrio,
      retornoInvestimento,
      lucratividade,
      rentabilidade,
    };
  };

  // Indicadores para o 1º mês e para os 5 anos
  const indicadoresAnuais = [0, 1, 2, 3, 4, 5].map((ano) => calcularIndicadores(ano));

  const { data, setData, post, processing, errors } = useForm({
    indicadores: indicadoresAnuais,
    resumo: [
      { descricao: "Receita Total com vendas", valor: totalFaturamento, anual: faturamentoAnual, percentual: ((faturamentoAnual / totalFaturamento) * 100).toFixed(2) },
      { descricao: "Custos Variáveis Totais", valor: totalApuracao + totalGastosVendas, anual: apuracaoAnual + gastosVendasAnuais, percentual: ((apuracaoAnual + gastosVendasAnuais) / (totalFaturamento || 1) * 100).toFixed(2) },
      { descricao: "Custos com materiais diretos e/ou CMV", valor: totalApuracao, anual: apuracaoAnual, percentual: ((apuracaoAnual / totalApuracao) * 100).toFixed(2) },
      { descricao: "Gastos com Vendas", valor: totalGastosVendas, anual: gastosVendasAnuais, percentual: ((gastosVendasAnuais / totalGastosVendas) * 100).toFixed(2) },
      { descricao: "Margem de Contribuição", valor: totalFaturamento + totalApuracao , anual: faturamentoAnual + apuracaoAnual, percentual: ((totalFaturamento - (totalApuracao + totalGastosVendas)) / totalFaturamento * 100).toFixed(2) },
      { descricao: "Custos Fixos Totais", valor: totalCustosFixos, anual: custosFixosAnuais, percentual: ((totalCustosFixos / totalFaturamento) * 100).toFixed(2) },
      { descricao: "Resultado Operacional (Lucro)", valor: (totalFaturamento - totalApuracao - totalGastosVendas - totalCustosFixos), anual: (faturamentoAnual - apuracaoAnual - gastosVendasAnuais - custosFixosAnuais), percentual: (((totalFaturamento - totalApuracao - totalGastosVendas - totalCustosFixos) / totalFaturamento) * 100).toFixed(2) }
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/sua-rota-aqui", data); // Altere para a rota correta
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

        {/* Indicadores */}
        <div>
        <h2 className="text-xl font-semibold mb-4">Indicadores</h2>
          <table className="w-full bg-white border border-gray-300 rounded shadow">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border-b">Período</th>
                <th className="p-2 border-b">Receita</th>
                <th className="p-2 border-b">Lucratividade</th>
                <th className="p-2 border-b">Rentabilidade</th>
                <th className="p-2 border-b">Ponto de Equilíbrio</th>
                <th className="p-2 border-b">Retorno de Investimento</th>
              </tr>
            </thead>
            <tbody>
              {indicadoresAnuais.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 border-b">{item.periodo}</td>
                  <td className="p-2 border-b">{`R$ ${item.receita.toFixed(2).replace(".", ",")}`}</td>
                  <td className="p-2 border-b">{`${item.lucratividade.toFixed(2)}%`}</td>
                  <td className="p-2 border-b">{`${item.rentabilidade.toFixed(2)}%`}</td>
                  <td className="p-2 border-b">{`R$ ${item.pontoEquilibrio.toFixed(2).replace(".", ",")}`}</td>
                  <td className="p-2 border-b">{`${item.retornoInvestimento.toFixed(2)}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          disabled={processing}
        >
          {processing ? "Enviando..." : "Enviar Dados"}
        </button>
      </form>
    </div>
  );
};

export default Demonstrativo;
