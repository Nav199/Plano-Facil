import React from 'react';
import { usePage, useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

const Mao_obra = ({ planoId, auth }) => {
  const { cargo } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    cargos: cargo.map((item) => ({
      funcao: item.cargo,
      num_empregados: 0,
      salario_mensal: 0,
      encargos_percentual: 80,
    })),
  });

  const formatCurrency = (value) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  const handlePriceChange = (e, index) => {
    const numericValue = e.target.value.replace(/[^\d]/g, '');
    const value = parseFloat(numericValue) / 100 || 0;
    handleInputChange(index, 'salario_mensal', value);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...data.cargos];
    updated[index][field] = Number(value);
    setData('cargos', updated);
  };

  const calcularTotalGeral = () =>
    data.cargos.reduce((acc, emp) => {
      const subtotal = emp.num_empregados * emp.salario_mensal;
      const encargos = (emp.encargos_percentual / 100) * subtotal;
      return acc + subtotal + encargos;
    }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('mao-obra-store', { id: planoId, totalGeral: calcularTotalGeral() }));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 text-center">
          Custos de Mão de Obra
        </h2>
      }
    >
      <div className="container mx-auto p-6 mt-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit}>
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Função</th>
                  <th className="p-3 text-center">Qtd</th>
                  <th className="p-3 text-right">Salário Mensal</th>
                  <th className="p-3 text-right">Subtotal</th>
                  <th className="p-3 text-center">% Encargos</th>
                  <th className="p-3 text-right">Encargos</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.cargos.map((item, index) => {
                  const subtotal = item.num_empregados * item.salario_mensal;
                  const encargos = (item.encargos_percentual / 100) * subtotal;
                  const total = subtotal + encargos;

                  return (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-3">{item.funcao}</td>

                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={item.num_empregados}
                          onChange={(e) =>
                            handleInputChange(index, 'num_empregados', e.target.value)
                          }
                          className="w-full border rounded px-2 py-1 text-center"
                        />
                      </td>

                      <td className="p-3">
                        <input
                          type="text"
                          value={formatCurrency(item.salario_mensal)}
                          onChange={(e) => handlePriceChange(e, index)}
                          className="w-full border rounded px-2 py-1 text-right"
                        />
                      </td>

                      <td className="p-3 text-right font-medium">
                        {formatCurrency(subtotal)}
                      </td>

                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={item.encargos_percentual}
                          onChange={(e) =>
                            handleInputChange(index, 'encargos_percentual', e.target.value)
                          }
                          className="w-full border rounded px-2 py-1 text-center"
                        />
                      </td>

                      <td className="p-3 text-right">
                        {formatCurrency(encargos)}
                      </td>

                      <td className="p-3 text-right font-semibold">
                        {formatCurrency(total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex justify-end mt-6">
              <div className="bg-gray-100 px-6 py-3 rounded-lg text-xl font-bold">
                Total Geral: {formatCurrency(calcularTotalGeral())}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button type="submit" processing={processing}>
                Enviar
              </Button>
            </div>

            {errors.cargos && (
              <div className="text-red-500 mt-4">
                {errors.cargos.map((error, i) => (
                  <p key={i}>{error}</p>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </Authenticated>
  );
};

export default Mao_obra;
