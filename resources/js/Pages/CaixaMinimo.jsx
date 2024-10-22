import React, { useState } from 'react';

const CaixaMinimo = () => {
  const [prazoVendas, setPrazoVendas] = useState([
    { nome: 'Prazo 1 (a vista)', porcentagem: 90, dias: 0, media: 0 },
    { nome: 'Prazo 2 (15 dias)', porcentagem: 5, dias: 15, media: 0.75 },
    { nome: 'Prazo 3 (30 dias)', porcentagem: 5, dias: 30, media: 1.5 },
    { nome: 'Prazo 4 (45 dias)', porcentagem: 0, dias: 0, media: 0 },
    { nome: 'Prazo 5', porcentagem: 0, dias: 0, media: 0 }
  ]);

  const [prazoCompras, setPrazoCompras] = useState([
    { nome: 'Prazo 1 (a vista)', porcentagem: 100, dias: 0, media: 0 },
    { nome: 'Prazo 2 (30 dias)', porcentagem: 0, dias: 0, media: 0 },
    { nome: 'Prazo 3', porcentagem: 0, dias: 0, media: 0 },
    { nome: 'Prazo 4', porcentagem: 0, dias: 0, media: 0 },
    { nome: 'Prazo 5', porcentagem: 0, dias: 0, media: 0 }
  ]);

  const [diasEstoque, setDiasEstoque] = useState(16);
  const [custoVariavelMensal, setCustoVariavelMensal] = useState(62948.60);

  const calcularMedia = (arr) => {
    return arr.reduce((acc, item) => acc + (item.porcentagem / 100) * item.dias, 0);
  };

  const handlePrazoChange = (index, value, type) => {
    const updatedPrazoVendas = [...prazoVendas];
    const updatedPrazoCompras = [...prazoCompras];

    if (type === 'venda') {
      updatedPrazoVendas[index].dias = parseFloat(value);
      setPrazoVendas(updatedPrazoVendas);
    } else if (type === 'compra') {
      updatedPrazoCompras[index].dias = parseFloat(value);
      setPrazoCompras(updatedPrazoCompras);
    }
  };

  const prazoMedioVendas = calcularMedia(prazoVendas);
  const prazoMedioCompras = calcularMedia(prazoCompras);

  const subtotal1 = prazoMedioVendas + diasEstoque;
  const subtotal2 = prazoMedioCompras;
  const necessidadeLiquidaDias = subtotal1 - subtotal2;

  const custoDiario = custoVariavelMensal / 30;
  const caixaMinimo = custoDiario * necessidadeLiquidaDias;

  const estoqueInicial = 12120;
  const totalCapitalGiro = caixaMinimo + estoqueInicial;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Caixa Mínimo</h2>

      {/* Contas a receber */}
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
          {prazoVendas.map((prazo, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{prazo.nome}</td>
              <td className="border border-gray-300 px-4 py-2">{prazo.porcentagem}%</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={prazo.dias}
                  onChange={(e) => handlePrazoChange(index, e.target.value, 'venda')}
                  className="w-full p-2 border border-gray-300"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{(prazo.porcentagem * prazo.dias / 100).toFixed(2)}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="border border-gray-300 px-4 py-2">Prazo médio total</td>
            <td className="border border-gray-300 px-4 py-2">100%</td>
            <td className="border border-gray-300 px-4 py-2">{prazoMedioVendas.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Fornecedores */}
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
          {prazoCompras.map((prazo, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{prazo.nome}</td>
              <td className="border border-gray-300 px-4 py-2">{prazo.porcentagem}%</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={prazo.dias}
                  onChange={(e) => handlePrazoChange(index, e.target.value, 'compra')}
                  className="w-full p-2 border border-gray-300"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{(prazo.porcentagem * prazo.dias / 100).toFixed(2)}</td>
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
            value={diasEstoque}
            onChange={(e) => setDiasEstoque(parseFloat(e.target.value))}
            className="w-1/4 p-2 border border-gray-300"
          />
        </div>
      </div>

      {/* 4º Passo: Necessidade Líquida de Capital de Giro */}
      <h3 className="text-lg font-semibold mb-2">4º Passo: Cálculo da Necessidade Líquida de Capital de Giro</h3>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Recursos da empresa fora do seu caixa</th>
            <th className="border border-gray-300 px-4 py-2">Número de dias</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Prazo médio de vendas</td>
            <td className="border border-gray-300 px-4 py-2">{prazoMedioVendas.toFixed(2)} dias</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Prazo médio de compras</td>
            <td className="border border-gray-300 px-4 py-2">{prazoMedioCompras.toFixed(2)} dias</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Necessidade líquida (em dias)</td>
            <td className="border border-gray-300 px-4 py-2">{necessidadeLiquidaDias.toFixed(2)} dias</td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-lg font-semibold mb-2">5º Passo: Cálculo do Caixa Mínimo</h3>
      <p className="mb-2">Custo diário: R$ {custoDiario.toFixed(2)}</p>
      <p className="mb-2">Caixa mínimo: R$ {caixaMinimo.toFixed(2)}</p>
      <p className="mb-2">Estoque inicial: R$ {estoqueInicial.toFixed(2)}</p>
      <p className="mb-2">Total Capital de Giro: R$ {totalCapitalGiro.toFixed(2)}</p>
    </div>
  );
};

export default CaixaMinimo;
