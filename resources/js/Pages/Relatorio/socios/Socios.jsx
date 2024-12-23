// components/Socios.js
import React from 'react';

const Socios = ({ socios }) => {
  return (
    <section className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-2 text-center">Sócios da empresa</h2>
      {socios?.length ? (
        <ul className="list-disc ml-4">
          {socios.map((socio, index) => (
            <li key={index}>
              <p><strong>Nome:</strong> {socio.nome}</p>
              <p><strong>Curriculo:</strong> {socio.curriculo}</p>
              <p><strong>Função na Empresa:</strong> {socio.funcao}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum dado encontrado.</p>
      )}
    </section>
  );
};

export default Socios;
