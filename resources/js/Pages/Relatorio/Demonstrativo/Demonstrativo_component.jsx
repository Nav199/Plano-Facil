import React from 'react'

const Demonstrativo_component = ({Demonstrativo_component}) => {
    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(preco || 0);
      };
  return (
    
    <section className="bg-white shadow rounded p-4">
  <h2 className="text-xl font-bold mb-2 text-center">Demonstrativo de Resultados</h2>
  {Demonstrativo_component?.length ? (
    <table className="table-auto w-full border-collapse border border-gray-300 text-center">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Resultado Operacional</th>
          <th className="border border-gray-300 p-2">Lucro Mensal</th>
          <th className="border border-gray-300 p-2">Porcentagem Lucro</th>
        </tr>
      </thead>
      <tbody>
        {Demonstrativo_component.map((demonstrativo, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2">{formatarPreco(demonstrativo.resultado_operacional)}</td>
            <td className="border border-gray-300 p-2">{formatarPreco(demonstrativo.lucro_mensal)}</td>
            <td className="border border-gray-300 p-2">{demonstrativo.porcentagem_lucro ? parseFloat(demonstrativo.porcentagem_lucro).toFixed(2) : 'N/A'}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Nenhum dado disponível para o demonstrativo de resultados.</p>
  )}
</section>
  )
}

export default Demonstrativo_component