// components/Socios.js
import React from 'react';

const Avaliação_component = ({ Avaliação_component }) => {
  return (
    <section className="bg-white shadow rounded p-4">
    <h2 className="text-xl font-bold mb-2 text-center">Avaliação do Plano</h2>
    <div className="prose text-center">
      {Avaliação_component && Avaliação_component.descricao && Avaliação_component.descricao.length > 0 ? (
        <ul>
          {Avaliação_component.descricao.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Avaliação não disponível.</p>
      )}
    </div>
  </section>
  );
};

export default Avaliação_component;
