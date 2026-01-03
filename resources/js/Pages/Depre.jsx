import React from 'react';
import { useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Button from "@/Components/Button";

const Depre = ({ planoId, auth, total }) => {

  const parseValor = (valor) => {
    if (typeof valor === 'string') {
      return parseFloat(
        valor.replace(/\D/g, '')
      ) / 100 || 0;
    }
    return valor || 0;
  };

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  };

  const { data, setData, post, processing } = useForm({
    ativos: [
      { nome: 'IMÓVEIS', valor: parseValor(total.imoveis), vidaUtil: 25 },
      { nome: 'MÁQUINAS', valor: parseValor(total.maquinas), vidaUtil: 10 },
      { nome: 'EQUIPAMENTOS', valor: parseValor(total.equipamentos), vidaUtil: 10 },
      { nome: 'MÓVEIS E UTENSÍLIOS', valor: parseValor(total.moveis_utensilios), vidaUtil: 10 },
      { nome: 'VEÍCULOS', valor: parseValor(total.veiculos), vidaUtil: 5 },
      { nome: 'COMPUTADORES', valor: parseValor(total.computadores), vidaUtil: 5 },
    ],
  });

  const handleValorChange = (index, e) => {
    const valorNumerico = parseValor(e.target.value);
    const novosAtivos = [...data.ativos];
    novosAtivos[index].valor = valorNumerico;
    setData('ativos', novosAtivos);
  };

  const calcularDepreciacao = (valor, vidaUtil) => {
    const depAnual = valor / vidaUtil;
    const depMensal = depAnual / 12;
    return { depAnual, depMensal };
  };

  const totalDepAnual = data.ativos.reduce(
    (acc, item) => acc + (item.valor / item.vidaUtil), 0
  );

  const totalDepMensal = totalDepAnual / 12;

  const handleSubmit = (e) => {
    e.preventDefault();

    const ativosCalculados = data.ativos.map(item => {
      const depAnual = item.valor / item.vidaUtil;
      const depMensal = depAnual / 12;

      return {
        ...item,
        depAnual: Number(depAnual.toFixed(2)),
        depMensal: Number(depMensal.toFixed(2)),
      };
    });

    post(route('depreciacao', { id: planoId }), {
      ativos: ativosCalculados
    });
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
          Custo com Depreciação
        </h2>
      }
    >
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit}>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Ativos Fixos</th>
                <th className="border px-4 py-2">Valor do bem</th>
                <th className="border px-4 py-2">Vida útil (anos)</th>
                <th className="border px-4 py-2">Depreciação Anual</th>
                <th className="border px-4 py-2">Depreciação Mensal</th>
              </tr>
            </thead>
            <tbody>
              {data.ativos.map((item, index) => {
                const { depAnual, depMensal } = calcularDepreciacao(item.valor, item.vidaUtil);

                return (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.nome}</td>

                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={formatarValor(item.valor)}
                        onChange={(e) => handleValorChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </td>

                    <td className="border px-4 py-2 text-center">{item.vidaUtil}</td>
                    <td className="border px-4 py-2">{formatarValor(depAnual)}</td>
                    <td className="border px-4 py-2">{formatarValor(depMensal)}</td>
                  </tr>
                );
              })}

              <tr className="font-bold bg-gray-100">
                <td colSpan={3} className="border px-4 py-2 text-right">Total:</td>
                <td className="border px-4 py-2">{formatarValor(totalDepAnual)}</td>
                <td className="border px-4 py-2">{formatarValor(totalDepMensal)}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-center mt-6">
            <Button type="submit" processing={processing}>
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </Authenticated>
  );
};

export default Depre;
