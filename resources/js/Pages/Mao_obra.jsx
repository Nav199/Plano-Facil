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
      encargos_percentual: 80
    })),
    totalGeral: 0
  });

  // Função para formatar valores como moeda (R$)
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  // Função que trata a mudança no campo salário mensal
  const handlePriceChange = (e, index) => {
    let value = e.target.value;

    // Remove caracteres não numéricos
    let numericValue = value.replace(/[^\d]/g, '');

    // Converte para float ajustando os centavos
    let floatValue = parseFloat(numericValue) / 100 || 0;

    // Atualiza o estado com o valor numérico
    handleInputChange(index, 'salario_mensal', floatValue);
  };

  // Função para atualizar o valor nos campos do estado
  const handleInputChange = (index, field, value) => {
    const newCargos = [...data.cargos];
    newCargos[index][field] = Number(value);
    setData('cargos', newCargos);
  };

  // Função para enviar os dados para o backend
  const handleSubmit = (e) => {
    e.preventDefault();

    // Calcular o total geral
    const totalGeral = data.cargos.reduce((acc, emp) => {
      const subtotal = emp.num_empregados * emp.salario_mensal;
      const encargos_sociais = (emp.encargos_percentual / 100) * subtotal;
      return acc + subtotal + encargos_sociais;
    }, 0);

    post(route('mao-obra-store', { id: planoId, totalGeral }));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
          Custos de mão-de-obra
        </h2>
      }
    >
      <div className="min-h-screen flex flex-col items-center bg-gray-100 mt-16">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <form onSubmit={handleSubmit}>
            <table className="table-auto w-full mb-6 border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2"></th>
                  <th className="text-left p-2">Função</th>
                  <th className="text-left p-2">Nº Empregados</th>
                  <th className="text-left p-2">Salário Mensal</th>
                  <th className="text-left p-2">Subtotal</th>
                  <th className="text-left p-2">(%) de Encargos Sociais</th>
                  <th className="text-left p-2">Encargos Sociais</th>
                  <th className="text-left p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.cargos && data.cargos.length > 0 ? (
                  data.cargos.map((item, index) => {
                    const { num_empregados, salario_mensal, encargos_percentual } = item;
                    const subtotal = num_empregados * salario_mensal;
                    const encargos_sociais = (encargos_percentual / 100) * subtotal;
                    const total = subtotal + encargos_sociais;

                    return (
                      <tr className="border-t" key={index}>
                        <td className="p-2"></td>
                        <td className="p-2">{item.funcao}</td>
                        <td className="p-2">
                          <input
                            type="number"
                            name="num_empregados"
                            placeholder="Nº Empregados"
                            value={num_empregados}
                            onChange={(e) => handleInputChange(index, 'num_empregados', e.target.value)}
                            className="border border-gray-300 p-2 w-full rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="salario_mensal"
                            placeholder="Salário Mensal"
                            value={formatCurrency(salario_mensal)} // Formata o valor para exibição
                            onChange={(e) => handlePriceChange(e, index)} // Atualiza o estado
                            className="border border-gray-300 p-2 w-full rounded"
                          />
                        </td>
                        <td className="p-2">{formatCurrency(subtotal)}</td>
                        <td className="p-2">
                          <input
                            type="number"
                            name="encargos_percentual"
                            placeholder="Encargos (%)"
                            value={encargos_percentual}
                            onChange={(e) => handleInputChange(index, 'encargos_percentual', e.target.value)}
                            className="border border-gray-300 p-2 w-full rounded"
                          />
                        </td>
                        <td className="p-2">{formatCurrency(encargos_sociais)}</td>
                        <td className="p-2">{formatCurrency(total)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center p-4">Nenhum cargo encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center mb-4">
              <div></div>
              <h3 className="font-bold text-xl">
                Total: {formatCurrency(
                  data.cargos.reduce((acc, emp) => {
                    const subtotal = emp.num_empregados * emp.salario_mensal;
                    const encargos_sociais = (emp.encargos_percentual / 100) * subtotal;
                    return acc + subtotal + encargos_sociais;
                  }, 0)
                )}
              </h3>
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

            {errors.cargos && (
              <div className="text-red-500 mt-2">
                {errors.cargos.map((error, index) => (
                  <p key={index}>{error}</p>
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
