import { usePage, useForm } from "@inertiajs/react";
import Button from '@/Components/Button'; 
import Authenticated from "@/Layouts/AuthenticatedLayout";
const Comer = ({ planoId,auth }) => {
  const { totalFaturamento, aliquota } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    gastosVendas: [
      { descricao: "SIMPLES (Imposto Federal)", percentual: aliquota, faturamentoEstimado: totalFaturamento, custoTotal: totalFaturamento * aliquota / 100 },
      { descricao: "Comissões (Gastos com Vendas)", percentual: '', faturamentoEstimado: totalFaturamento, custoTotal: 0 },
      { descricao: "Propaganda (Gastos com Vendas)", percentual: '', faturamentoEstimado: totalFaturamento, custoTotal: totalFaturamento * 0.02 },
      { descricao: "Taxas de Cartões (Gastos com Vendas)", percentual: '', faturamentoEstimado: totalFaturamento, custoTotal: 0 },
    ],
  });
 
  const handlePercentualChange = (index, newPercentual) => {
    const updatedGastosVendas = data.gastosVendas.map((item, i) => {
      if (i === index) {
        const percentual = Math.max(0, Math.min(100, parseFloat(newPercentual) || 0)); // Limita entre 0 e 100
        return {
          ...item,
          percentual,
          custoTotal: item.faturamentoEstimado * (percentual / 100),
        };
      }
      return item;
    });

    setData("gastosVendas", updatedGastosVendas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("comercializacao", { id: planoId }), {
      onSuccess: () => reset(),
    });
  };

  const formatarNumeroBr = (numero) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numero);
  };

  const totalImpostos = data.gastosVendas
    .filter((item) => item.descricao.includes("Imposto"))
    .reduce((acc, curr) => acc + curr.custoTotal, 0);

  const totalGastosVendas = data.gastosVendas
    .filter((item) => !item.descricao.includes("Imposto"))
    .reduce((acc, curr) => acc + curr.custoTotal, 0);

  const totalGeral = totalImpostos + totalGastosVendas;

  return (
     <Authenticated
          user={auth.user}
          header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
              Custos de Comercialização
            </h2>
          }
        >
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Descrição</th>
                <th className="border px-4 py-2">% (Editar)</th>
                <th className="border px-4 py-2">Faturamento Estimado</th>
                <th className="border px-4 py-2">Custo Total</th>
              </tr>
            </thead>
            <tbody>
              {data.gastosVendas.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.descricao}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={item.percentual}
                      onChange={(e) => handlePercentualChange(index, e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
                  <td className="border px-4 py-2">{formatarNumeroBr(item.faturamentoEstimado)}</td>
                  <td className="border px-4 py-2">{formatarNumeroBr(item.custoTotal)}</td>
                </tr>
              ))}
              <tr>
                <td className="border px-4 py-2" colSpan="3">Total Impostos</td>
                <td className="border px-4 py-2">{formatarNumeroBr(totalImpostos)}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2" colSpan="3">Total Gastos com Vendas</td>
                <td className="border px-4 py-2">{formatarNumeroBr(totalGastosVendas)}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2" colSpan="3">Total Geral</td>
                <td className="border px-4 py-2">{formatarNumeroBr(totalGeral)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
            <Button
              type="submit"
              processing={processing}
              className="extra-classes-if-needed"
            >
              Enviar
            </Button>
          </div>
      </form>
    </div>
    </Authenticated>
  );
};

export default Comer;
