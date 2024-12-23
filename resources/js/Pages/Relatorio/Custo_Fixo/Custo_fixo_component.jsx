import React from 'react'

const Custo_fixo_component = ({custo_fixo}) => {
  return (
    <section className="bg-white shadow rounded p-4">
    <h2 className="text-xl font-bold mb-2 text-center">Custos Fixos</h2>
    {custo_fixo?.length ? (
<table className="table-auto w-full border-collapse border border-gray-300 text-center">
<thead>
<tr>
<th className="border border-gray-300 p-2">Descrição</th>
<th className="border border-gray-300 p-2">Custo</th>
<th className="border border-gray-300 p-2">Crescimento</th>
</tr>
</thead>
<tbody>
{custo_fixo.map((item, index) => (
<tr key={index}>
  <td className="border border-gray-300 p-2">{item.descricao}</td>
  <td className="border border-gray-300 p-2">{item.custo}</td>
  <td className="border border-gray-300 p-2">{item.crescimento}%</td>
</tr>
))}
</tbody>
</table>
) : (
<p>Nenhum dado disponível para o faturamento.</p>
)}
  </section>
  )
}

export default Custo_fixo_component