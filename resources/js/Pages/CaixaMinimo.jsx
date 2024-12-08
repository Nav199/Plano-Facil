import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

const CaixaMinimo = () => {
  const { custo_fixo_mensal, custo_variavel_mensal, custo_total_empresa, custo_total_diario, estoque } = usePage().props;

  const { data, setData, post } = useForm({
      prazoVendas: [
          { nome: "Prazo 1 (à vista)", porcentagem: 90, dias: 0, media: 0 },
          { nome: "Prazo 2 (15 dias)", porcentagem: 5, dias: 15, media: 0.75 },
          { nome: "Prazo 3 (30 dias)", porcentagem: 5, dias: 30, media: 1.5 },
          { nome: "Prazo 4 (45 dias)", porcentagem: 0, dias: 0, media: 0 },
          { nome: "Prazo 5", porcentagem: 0, dias: 0, media: 0 },
      ],
      prazoCompras: [
          { nome: "Prazo 1 (à vista)", porcentagem: 100, dias: 0, media: 0 },
          { nome: "Prazo 2 (30 dias)", porcentagem: 0, dias: 0, media: 0 },
          { nome: "Prazo 3", porcentagem: 0, dias: 0, media: 0 },
          { nome: "Prazo 4", porcentagem: 0, dias: 0, media: 0 },
          { nome: "Prazo 5", porcentagem: 0, dias: 0, media: 0 },
      ],
      diasEstoque: '',
      custoVariavelMensal: custo_variavel_mensal,
      custoFixoMensal: custo_fixo_mensal,
      custoDiario: custo_total_diario || 0, // Garantir que custoDiario tenha um valor válido
      custoTotal: custo_total_empresa,
      estoque_inicial: estoque
  });
  

  const handlePrazoChange = (index, value, type) => {
    const updatedPrazo = [...data[type]];
    updatedPrazo[index].dias = parseFloat(value);
    setData(type, updatedPrazo);
  };

  const calcularMedia = (arr) => {
    return arr.reduce((acc, item) => acc + (item.porcentagem / 100) * item.dias, 0);
  };

  const prazoMedioVendas = calcularMedia(data.prazoVendas);
  const prazoMedioCompras = calcularMedia(data.prazoCompras);

  const contasReceber = data.prazoVendas.map((prazo) => (prazo.porcentagem * prazo.dias) / 100);
  const totalContasReceber = contasReceber.reduce((acc, val) => acc + val, 0);

  const fornecedores = data.prazoCompras.map((prazo) => (prazo.porcentagem * prazo.dias) / 100);
  const totalFornecedores = fornecedores.reduce((acc, val) => acc + val, 0);

  const subtotal1 = totalContasReceber + data.diasEstoque;
  const subtotal2 = totalFornecedores;

  const necessidadeLiquidaDias = subtotal1 - subtotal2;

  // Verifica se o valor é um número válido
  const isNumber = (value) => !isNaN(value) && value !== null;

  //const caixaMinimo = isNumber(necessidadeLiquidaDias) && isNumber(custoDiario) ? custoDiario * necessidadeLiquidaDias : 0;

  //const totalCapitalGiro = estoque_inicial + caixaMinimo;

  const handleSubmit = () => {
    post("/caixa-minimo");
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Caixa Mínimo</h2>

      {/* Contas a Receber */}
      <h3 className="text-lg font-semibold mb-2">1º Passo: Contas a Receber – Cálculo do Prazo Médio de Vendas</h3>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Prazo médio de vendas</th>
            <th className="border border-gray-300 px-4 py-2">%</th>
            <th className="border border-gray-300 px-4 py-2">Nº de dias</th>
            <th className="border border-gray-300 px-4 py-2">Média Ponderada</th>
          </tr>
        </thead>
        <tbody>
          {data.prazoVendas.map((prazo, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{prazo.nome}</td>
              <td className="border border-gray-300 px-4 py-2">{prazo.porcentagem}%</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={prazo.dias}
                  onChange={(e) => handlePrazoChange(index, e.target.value, "prazoVendas")}
                  className="w-full p-2 border border-gray-300"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {(prazo.porcentagem * prazo.dias / 100).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="border border-gray-300 px-4 py-2">Prazo médio total</td>
            <td className="border border-gray-300 px-4 py-2">100%</td>
            <td className="border border-gray-300 px-4 py-2">{prazoMedioVendas.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Tabela para fornecedores */}
      <h3 className="text-lg font-semibold mb-2">2º Passo: Fornecedores – Cálculo do Prazo Médio de Compras</h3>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Prazo médio de compras</th>
            <th className="border border-gray-300 px-4 py-2">%</th>
            <th className="border border-gray-300 px-4 py-2">Nº de dias</th>
            <th className="border border-gray-300 px-4 py-2">Média Ponderada</th>
          </tr>
        </thead>
        <tbody>
          {data.prazoCompras.map((prazo, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{prazo.nome}</td>
              <td className="border border-gray-300 px-4 py-2">{prazo.porcentagem}%</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={prazo.dias}
                  onChange={(e) => handlePrazoChange(index, e.target.value, "prazoCompras")}
                  className="w-full p-2 border border-gray-300"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {(prazo.porcentagem * prazo.dias / 100).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="border border-gray-300 px-4 py-2">Prazo médio total</td>
            <td className="border border-gray-300 px-4 py-2">100%</td>
            <td className="border border-gray-300 px-4 py-2">{prazoMedioCompras.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Estoques */}
      <div>
        <h3 className="text-lg font-semibold mb-2">3º Passo: Estoques – Cálculo da Necessidade Média de Estoques</h3>
        <div className="mb-4">
          <label className="block mb-2">Necessidade média de estoques (em dias):</label>
          <input
            type="number"
            value={data.diasEstoque}
            onChange={(e) => setData("diasEstoque", parseFloat(e.target.value))}
            className="w-1/4 p-2 border border-gray-300"
          />
        </div>
      </div>
   {/* Recursos da Empresa */}
   <h3 className="text-lg font-semibold mb-2">4º Passo: Recursos da Empresa e Necessidade de Capital de Giro</h3>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Descrição</th>
            <th className="border border-gray-300 px-4 py-2">Cálculo (em dias)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">1. Contas a Receber – Prazo médio de vendas</td>
            <td className="border border-gray-300 px-4 py-2">{prazoMedioVendas.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">2. Estoques – Necessidade média de estoques</td>
            <td className="border border-gray-300 px-4 py-2">{data.diasEstoque}</td>
          </tr>
          <tr className="font-bold">
            <td className="border border-gray-300 px-4 py-2">Subtotal 1 - Recursos fora do caixa (1 + 2)</td>
            <td className="border border-gray-300 px-4 py-2">{subtotal1.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">3. Fornecedores – Prazo médio de compras</td>
            <td className="border border-gray-300 px-4 py-2">{prazoMedioCompras.toFixed(2)}</td>
          </tr>
          <tr className="font-bold">
            <td className="border border-gray-300 px-4 py-2">Subtotal 2 - Recursos de terceiros no caixa (3)</td>
            <td className="border border-gray-300 px-4 py-2">{subtotal2.toFixed(2)}</td>
          </tr>
          <tr className="font-bold">
            <td className="border border-gray-300 px-4 py-2">Necessidade Líquida de Capital de Giro em dias (Subtotal 1 - Subtotal 2)</td>
            <td className="border border-gray-300 px-4 py-2">{necessidadeLiquidaDias.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      
      



      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Salvar Dados
      </button>
    </div>
  );
};

export default CaixaMinimo;
