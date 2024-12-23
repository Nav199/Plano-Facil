import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

const CaixaMinimo = ({ planoId, auth }) => {
  const { props } = usePage();
  const { caixa } = props;

  const custoVariavelMensal = parseFloat(caixa?.custo_variavel_mensal || 0);
  const custoFixoMensal = parseFloat(caixa?.custo_fixo_mensal || 0);
  const custoDiario = parseFloat(caixa?.custo_total_diario || 0);
  const custoTotal = parseFloat(caixa?.custo_total_empresa || 0);
  const estoque_inicial = parseFloat(caixa?.estoque || 0);

  // Função para calcular a média ponderada
  const calcularMedia = (arr) => {
    return arr.reduce((acc, item) => acc + (item.porcentagem / 100) * item.dias, 0);
  };

  // Hook para gerenciar dados do formulário
  const { data, setData, post, processing } = useForm({
    prazoVendas: [
      { nome: "Prazo 1 (à vista)", porcentagem: 90, dias: 0, media: 0 },
      { nome: "Prazo 2 (15 dias)", porcentagem: 5, dias: 0, media: 0 },
      { nome: "Prazo 3 (30 dias)", porcentagem: 5, dias: 0, media: 0 },
      { nome: "Prazo 4 (45 dias)", porcentagem: 0, dias: 0, media: 0 },
      { nome: "Prazo 5", porcentagem: 0, dias: 0, media: 0 },
    ],
    prazoCompras: [
      { nome: "Prazo 1 (à vista)", porcentagem: 90, dias: 0, media: 0 },
      { nome: "Prazo 2 (30 dias)", porcentagem: 5, dias: 0, media: 0 },
      { nome: "Prazo 3", porcentagem: 5, dias: 0, media: 0 },
      { nome: "Prazo 4", porcentagem: 0, dias: 0, media: 0 },
      { nome: "Prazo 5", porcentagem: 0, dias: 0, media: 0 },
    ],
    diasEstoque: '',
    necessidadeLiquidaDias: 0,
    caixaMinimo: 0,
    capital_giro: 0,
    estoque_inicial:0
  });

  // Cálculos fora do useEffect
  const prazoMedioVendas = calcularMedia(data.prazoVendas);
  const prazoMedioCompras = calcularMedia(data.prazoCompras);
  const subtotal1 = prazoMedioVendas + parseFloat(data.diasEstoque || 0);
  const subtotal2 = prazoMedioCompras;
  const necessidadeLiquidaDias = subtotal1 - subtotal2;
  const caixaMinimo = necessidadeLiquidaDias * custoDiario;
  const capital_giro = caixaMinimo + estoque_inicial;

  // Atualizar o estado com os cálculos no useEffect
  useEffect(() => {
    setData({
      ...data,
      necessidadeLiquidaDias,
      caixaMinimo,
      capital_giro,
    });
  }, [data.prazoVendas, data.prazoCompras, data.diasEstoque, custoDiario, estoque_inicial]);

  const handlePrazoChange = (index, value, type) => {
    const updatedPrazo = [...data[type]];
    updatedPrazo[index].dias = parseFloat(value) || 0;
    setData(type, updatedPrazo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("caixa", { id: planoId }));
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(valor);
  };
  return (
<Authenticated
          user={auth.user}
          header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
              Caixa mínimo
            </h2>
          }
        >
    <form onSubmit={handleSubmit}>
    <div className="container mx-auto p-4">
      {/* Contas a Receber */}
      <h3 className="text-lg font-semibold mb-2">Contas a Receber – Cálculo do Prazo Médio de Vendas</h3>
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
      <h3 className="text-lg font-semibold mb-2">Fornecedores – Cálculo do Prazo Médio de Compras</h3>
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
        <h3 className="text-lg font-semibold mb-2">Estoques – Cálculo da Necessidade Média de Estoques</h3>
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
      <h3 className="text-lg font-semibold mb-2">Recursos da Empresa e Necessidade de Capital de Giro</h3>
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
            <td className="border border-gray-300 px-4 py-2">{parseFloat(data.diasEstoque).toFixed(2)}</td>
          </tr>
          <tr className="font-bold">
            <td className="border border-gray-300 px-4 py-2">Subtotal 1 - Recursos fora do caixa (1 + 2)</td>
            <td className="border border-gray-300 px-4 py-2">{parseFloat(subtotal1).toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">3. Fornecedores – Prazo médio de compras</td>
            <td className="border border-gray-300 px-4 py-2">{parseFloat(prazoMedioCompras).toFixed(2)}</td>
          </tr>
          <tr className="font-bold">
            <td className="border border-gray-300 px-4 py-2">Subtotal 2 - Recursos de terceiros no caixa (3)</td>
            <td className="border border-gray-300 px-4 py-2">{parseFloat(subtotal2).toFixed(2)}</td>
          </tr>
          <tr className="font-bold">
            <td className="border border-gray-300 px-4 py-2">Necessidade Líquida de Capital de Giro em dias (Subtotal 1 - Subtotal 2)</td>
            <td className="border border-gray-300 px-4 py-2">{necessidadeLiquidaDias.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Capital do caixa mínimo */}
      <h3 className="text-lg font-semibold mb-2">Cálculo do Caixa Mínimo</h3>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Descrição</th>
            <th className="border border-gray-300 px-4 py-2">Cálculo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Custo Fixo Mensal</td>
            <td className="border border-gray-300 px-4 py-2">{formatarMoeda(custoFixoMensal)}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Custo Variável Mensal</td>
            <td className="border border-gray-300 px-4 py-2">{formatarMoeda(custoVariavelMensal)}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Custo Total da Empresa</td>
            <td className="border border-gray-300 px-4 py-2">{formatarMoeda(custoTotal)}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Custo Total Diário</td>
            <td className="border border-gray-300 px-4 py-2">{formatarMoeda(custoDiario)}</td>
          </tr>
          <tr className="font-bold">
            <td className="border border-gray-300 px-4 py-2">Caixa Mínimo</td>
            <td className="border border-gray-300 px-4 py-2"
            onValue
            >{formatarMoeda(caixaMinimo)}
            </td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-lg font-semibold mb-2">Cálculo do Capital de Giro</h3>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Descrição</th>
            <th className="border border-gray-300 px-4 py-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Estoque Inicial</td>
            <td className="border border-gray-300 px-4 py-2">{formatarMoeda(estoque_inicial)}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Caixa mínimo</td>
            <td className="border border-gray-300 px-4 py-2">{formatarMoeda(custoDiario*necessidadeLiquidaDias)}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">TOTAL DO CAPITAL DE GIRO</td>
            <td className="border border-gray-300 px-4 py-2">{formatarMoeda(caixaMinimo+estoque_inicial)}</td>
          </tr>
        </tbody>
      </table>


      <div className="flex justify-center">
            <Button
              type="submit"
              processing={processing}
              className="extra-classes-if-needed"
            >
              Enviar
            </Button>
          </div>
    </div>
    </form>
    </Authenticated>
  );
};

export default CaixaMinimo;
