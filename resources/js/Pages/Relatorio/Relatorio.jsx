import React from 'react';
import { usePage } from '@inertiajs/react';

const Relatorio = () => {
  const { plano, status, message } = usePage().props;

  return (
    <div className="bg-gray-100 min-h-screen p-4 space-y-6">
      <header className="text-center bg-blue-500 text-white py-4">
        <h1 className="text-2xl font-bold">Plano de Negócio - {plano.nome}</h1>
      </header>
      <main id="relatorio-content" className="space-y-6">
        {/* Mostrar mensagem caso não tenha dados */}
        {message ? (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            <p>{message}</p>
          </div>
        ) : (
          <>
            {/* Seção: Missão, Visão e Valores */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Missão, Visão e Valores</h2>
              <p><strong>Missão:</strong> Facilitar a exploração responsável e sustentável da biodiversidade amazônica...</p>
              <p><strong>Visão:</strong> Ser reconhecida como a principal plataforma que conecta as pessoas à incrível biodiversidade amazônica.</p>
              <p><strong>Valores:</strong> Comprometimento com a constante melhoria da plataforma...</p>
            </section>

            {/* Seção: Investimento Fixo */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Investimento Fixo</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="font-bold text-lg">Veículos:</h3>
                  <ul className="list-disc ml-4">
                    {plano.veiculo?.length ? (
                      plano.veiculo.map((v, index) => (
                        <li key={index}>{v.nome} - {v.descricao}</li>
                      ))
                    ) : (
                      <p>Nenhum veículo registrado.</p>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Máquinas:</h3>
                  <ul className="list-disc ml-4">
                    {plano.maquina?.length ? (
                      plano.maquina.map((m, index) => (
                        <li key={index}>{m.nome} - {m.descricao}</li>
                      ))
                    ) : (
                      <p>Nenhuma máquina registrada.</p>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Imóveis:</h3>
                  <ul className="list-disc ml-4">
                    {plano.imoveis?.length ? (
                      plano.imoveis.map((i, index) => (
                        <li key={index}>{i.nome} - {i.descricao}</li>
                      ))
                    ) : (
                      <p>Nenhum imóvel registrado.</p>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Equipamentos:</h3>
                  <ul className="list-disc ml-4">
                    {plano.equipamento?.length ? (
                      plano.equipamento.map((e, index) => (
                        <li key={index}>{e.nome} - {e.descricao}</li>
                      ))
                    ) : (
                      <p>Nenhum equipamento registrado.</p>
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* Seção: Executivos */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Executivos</h2>
              <ul className="list-disc ml-4">
                {plano.executivos?.length ? (
                  plano.executivos.map((executivo, index) => (
                    <li key={index}>
                      <p><strong>Nome:</strong> {executivo.nome}</p>
                      <p><strong>Cargo:</strong> {executivo.cargo}</p>
                      <p><strong>Fonte de Recursos:</strong> {executivo.fonte_recursos}</p>
                      <p><strong>Visão:</strong> {executivo.visao}</p>
                      <p><strong>Valores:</strong> {executivo.valores}</p>
                      <p><strong>Missão:</strong> {executivo.missao}</p>
                      <p><strong>Setor de Atividade:</strong> {executivo.setor_atividade}</p>
                    </li>
                  ))
                ) : (
                  <p>Nenhum executivo registrado.</p>
                )}
              </ul>
            </section>

            {/* Seção: Investimento Pré-Operacional */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Investimento Pré-Operacional</h2>
              <ul className="list-disc ml-4">
                {plano.investimento_pre?.length ? (
                  plano.investimento_pre.map((investimento, index) => (
                    <li key={index}>{investimento.descricao} - R$ {investimento.valor}</li>
                  ))
                ) : (
                  <p>Nenhum investimento pré-operacional registrado.</p>
                )}
              </ul>
            </section>

            {/* Seção: Faturamento */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Faturamento</h2>
              <ul className="list-disc ml-4">
                {plano.Faturamento?.length ? (
                  plano.Faturamento.map((faturamento, index) => (
                    <li key={index}>{faturamento.produto} - R$ {faturamento.valor}</li>
                  ))
                ) : (
                  <p>Nenhum dado de faturamento registrado.</p>
                )}
              </ul>
            </section>
          </>
        )}
      </main>
      <footer className="text-center bg-blue-500 text-white py-4">
        <p>Trabalho elaborado na disciplina de Empreendedorismo, orientado pelo Prof. Dr. Juliano Milton Kruger.</p>
      </footer>
    </div>
  );
};

export default Relatorio;
