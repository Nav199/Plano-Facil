// components/MissaoVisaoValores.js
import React from 'react';

const MissaoVisaoValores = ({ executivos }) => {
  return (
    <section className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-2 text-center">Missão, Visão e Valores</h2>
      {executivos?.length ? (
        <ul className="list-disc ml-4">
          {executivos.map((executivo, index) => (
            <li key={index}>
              <p><strong>Visão:</strong> {executivo.visao}</p>
              <p><strong>Valores:</strong> {executivo.valores}</p>
              <p><strong>Missão:</strong> {executivo.missao}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum dado encontrado.</p>
      )}
    </section>
  );
};

export default MissaoVisaoValores;
