import React from 'react';

const Analise_component = ({ analise }) => {
  return (
    analise && (
      <section className="bg-white shadow rounded p-4">
        <table className="table-auto w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-200 text-left">Fatores Internos</th>
              <th className="border border-gray-300 p-2 bg-gray-200 text-left">Fatores Externos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Pontos Fortes */}
              <td className="border border-gray-300 p-2">
                <h3 className="font-semibold">Pontos Fortes</h3>
                {analise.forcas && analise.forcas.length > 0 ? (
                  <ul className="list-disc ml-4">
                    {analise.forcas.map((forca, index) => (
                      <li key={index}>{forca}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Nenhum ponto forte registrado.</p>
                )}
              </td>

              {/* Oportunidades */}
              <td className="border border-gray-300 p-2">
                <h3 className="font-semibold">Oportunidades</h3>
                {analise.oportunidades && analise.oportunidades.length > 0 ? (
                  <ul className="list-disc ml-4">
                    {analise.oportunidades.map((oportunidade, index) => (
                      <li key={index}>{oportunidade}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Nenhuma oportunidade registrada.</p>
                )}
              </td>
            </tr>

            <tr>
              {/* Fraquezas */}
              <td className="border border-gray-300 p-2">
                <h3 className="font-semibold">Fraquezas</h3>
                {analise.fraquezas && analise.fraquezas.length > 0 ? (
                  <ul className="list-disc ml-4">
                    {analise.fraquezas.map((fraqueza, index) => (
                      <li key={index}>{fraqueza}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Nenhuma fraqueza registrada.</p>
                )}
              </td>

              {/* Ameaças */}
              <td className="border border-gray-300 p-2">
                <h3 className="font-semibold">Ameaças</h3>
                {analise.ameacas && analise.ameacas.length > 0 ? (
                  <ul className="list-disc ml-4">
                    {analise.ameacas.map((ameaca, index) => (
                      <li key={index}>{ameaca}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Nenhuma ameaça registrada.</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Ações Estratégicas */}
        <h3 className="text-lg font-bold mt-6 text-center">Ações Estratégicas</h3>
        {analise.acoes && analise.acoes.length > 0 ? (
          <ul className="list-disc ml-4 text-center">
            {analise.acoes.map((acao, index) => (
              <li key={index}>{acao}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma ação estratégica registrada.</p>
        )}
      </section>
    )
  );
};

export default Analise_component;
