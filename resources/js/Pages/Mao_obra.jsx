import React from 'react';
import { usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

const Mao_obra = ({ planoId }) => {
  // Acessa as props do backend através do Inertia
  const { cargo } = usePage().props;

  // Inicializa o useForm com dados dos cargos
  const { data, setData, post, processing, errors } = useForm({
    cargos: cargo.map((item) => ({
      funcao: item.cargo, // Atribui o valor correto da função
      num_empregados: 0,
      salario_mensal: 0,
      encargos_percentual: 80
    })),
    totalGeral: 0
  });

  // Função para formatar valores para o padrão brasileiro
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para atualizar os dados de cada cargo
  const handleInputChange = (index, field, value) => {
    const newCargos = [...data.cargos];
    newCargos[index][field] = Number(value);
    setData('cargos', newCargos);
  };

  // Função para enviar os dados para o backend
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Calcular total geral
    const totalGeral = data.cargos.reduce((acc, emp) => {
      const subtotal = emp.num_empregados * emp.salario_mensal;
      const encargos_sociais = (emp.encargos_percentual / 100) * subtotal;
      return acc + subtotal + encargos_sociais;
    }, 0);

    // Enviar os dados para o backend, incluindo o total geral
    post(route('mao-obra-store', { id: planoId, totalGeral })); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <h2 className="text-2xl font-bold mt-8 mb-6">Custos de mão-de-obra</h2>

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
                <th className="text-left p-2">(%) de encargos sociais</th>
                <th className="text-left p-2">Encargos sociais</th>
                <th className="text-left p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cargo && cargo.length > 0 ? (
                cargo.map((item, index) => {
                  const { num_empregados, salario_mensal, encargos_percentual } = data.cargos[index];
                  const subtotal = num_empregados * salario_mensal;
                  const encargos_sociais = (encargos_percentual / 100) * subtotal;
                  const total = subtotal + encargos_sociais;

                  return (
                    <tr className="border-t" key={index}>
                      <td className="p-2"></td>
                      <td className="p-2">{item.cargo}</td>
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
                          type="number"
                          name="salario_mensal"
                          placeholder="Salário Mensal"
                          value={salario_mensal}
                          onChange={(e) => handleInputChange(index, 'salario_mensal', e.target.value)}
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
              Total: {formatCurrency(data.cargos.reduce((acc, emp) => acc + (emp.num_empregados * emp.salario_mensal) + ((emp.encargos_percentual / 100) * (emp.num_empregados * emp.salario_mensal)), 0))}
            </h3>
          </div>

          {/* Centro do botão */}
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={processing}
            >
              Enviar
            </button>
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
  );
};

export default Mao_obra;
