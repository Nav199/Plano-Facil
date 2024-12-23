import React, { Suspense, lazy } from 'react';
import { usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Analise_component from './Analise/Analise';
import Avaliação_component from './Analise/Avaliacao_component';
import Socios from './socios/Socios';
const Relatorio = ({auth }) => {
  const { plano, status, message,analise,avaliacao } = usePage().props;
  const DownloadButton = lazy(() => import('@/Components/DownloadButton'));

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(preco || 0);
  };
  return (
      <Authenticated
              user={auth.user}
              header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
                        Plano de Negócio - {plano?.nome}
                </h2>
              }
            >
    <div className="bg-gray-100 min-h-screen p-4 space-y-6">
      <main id="relatorio-content" className="space-y-6">
        {/* Mostrar mensagem caso não tenha dados */}
        {message ? (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            <p>{message}</p>
          </div>
        ) : (
          <> 
          <div className='grid grid-cols-2 gap-6'>

            {/* Seção: Missão, Visão e Valores */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2 text-center">Missão, Visão e Valores</h2>
              {plano?.executivos?.length ? (
                <ul className="list-disc ml-4">
                  {plano.executivos.map((executivo, index) => (
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

            {/* Seção: Executivos */}
            <section className="bg-white shadow rounded p-4">
  <h2 className="text-xl font-bold mb-2">Plano Executivo</h2>
  {plano?.executivos?.length ? (
    <ul className="list-disc ml-4">
      {plano.executivos.map((executivo, index) => (
        <li key={index}>
          <p><strong>Fonte de Recursos:</strong> {executivo.fonte_recursos}</p>
          <p><strong>Visão:</strong> {executivo.visao}</p>
          <p><strong>Valores:</strong> {executivo.valores}</p>
          <p><strong>Missão:</strong> {executivo.missao}</p>
          <p><strong>Setor de Atividade:</strong> {executivo.setor_atividade}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>Nenhum executivo registrado.</p>
  )}

  {plano?.forma?.length ? (
    <ul className="list-disc ml-4">
      {plano.forma.map((forma, index) => (
        <li key={index}>
          <p><strong>Forma Jurídica:</strong> {forma.tipo}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>Nenhuma forma jurídica registrada.</p>
  )}
  
            {/* Seção: Socios */}
      <Socios socios={plano?.socios}/>
</section>


            {/* Seção: Análise de Mercado */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2 text-center">Pesquisa de Mercado</h2>

              {/* Seção de Clientes */}
              {plano?.clientes?.length ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Clientes</h3>
                  <ul className="list-disc ml-4">
                    {plano.clientes.map((cliente, index) => (
                      <li key={index}>
                        <p><strong>Perfil dos Clientes:</strong> {cliente.perfil}</p>
                        <p><strong>Comportamento dos Clientes:</strong> {cliente.comportamento}</p>
                        <p><strong>Área de Abrangência:</strong> {cliente.area}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Nenhum cliente registrado.</p>
              )}

              {/* Seção de Fornecedores */}
              {plano?.fornecedores?.length ? (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Fornecedores</h3>
                  <ul className="list-disc ml-4">
                    {plano.fornecedores.map((fornecedor, index) => (
                      <li key={index}>
                        <p><strong>Descrição:</strong> {fornecedor.descricao}</p>
                        <p><strong>Nome:</strong> {fornecedor.nome}</p>
                        <p><strong>Preço:</strong> {formatarPreco(fornecedor.preco)}</p>
                        <p><strong>Pagamento:</strong> {fornecedor.pagamento}</p>
                        <p><strong>Localização:</strong> {fornecedor.localizacao}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Nenhum fornecedor registrado.</p>
              )}

              {/* Seção de Concorrentes */}
              {plano?.concorrentes?.length ? (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Concorrentes</h3>
                  <ul className="list-disc ml-4">
                    {plano.concorrentes.map((concorrente, index) => (
                      <li key={index}>
                        <p><strong>Nome:</strong> {concorrente.nome}</p>
                        <p><strong>Qualidade:</strong> {concorrente.qualidade}</p>
                        <p><strong>Pagamento:</strong> {concorrente.pagamento}</p>
                        <p><strong>Preço:</strong> {formatarPreco(concorrente.preco)}</p>
                        <p><strong>Garantias:</strong> {concorrente.garantias}</p>
                        <p><strong>Serviço:</strong> {concorrente.servico}</p>
                        <p><strong>Localização:</strong> {concorrente.localizacao}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Nenhum concorrente registrado.</p>
              )}
            </section>

            {/* Seção: Marketing */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2 text-center">Estratégias de Marketing</h2>
              {plano?.marketing?.length ? (
                <ul className="list-disc ml-4">
                  {plano.marketing.map((m, index) => (
                    <li key={index}>
                      <p><strong>Produto:</strong> {m.produto}</p>
                      <p><strong>Preço:</strong> {formatarPreco(m.preco)}</p>
                      <p><strong>Estratégia de Promocionais:</strong> {m.estrategia_promo}</p>
                      <p><strong>Estratégia de Comercialização:</strong> {m.estrategia_comer}</p>
                      <p><strong>Localização:</strong> {m.localizacao}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum marketing registrado.</p>
              )}
            </section>

            {/* Seção: Investimento Pré-Operacional */}

            {/* Seção: Faturamento */}
<section className="bg-white shadow rounded p-4">
  <h2 className="text-xl font-bold mb-2 text-center">Faturamento da Empresa</h2>
  {plano?.faturamento?.length ? (
    <table className="table-auto w-full border-collapse border border-gray-300 text-center">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Produto</th>
          <th className="border border-gray-300 p-2">Quantidade</th>
          <th className="border border-gray-300 p-2">Valor Unitário</th>
          <th className="border border-gray-300 p-2">Total</th>
          <th className="border border-gray-300 p-2">Crescimento</th>
        </tr>
      </thead>
      <tbody>
        {plano.faturamento.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2">{item.produto}</td>
            <td className="border border-gray-300 p-2">{item.quantidade}</td>
            <td className="border border-gray-300 p-2">{formatarPreco(item.valor_unitario)}</td>
            <td className="border border-gray-300 p-2">{formatarPreco(item.total)}</td>
            <td className="border border-gray-300 p-2">{item.crescimento}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Nenhum dado disponível para o faturamento.</p>
  )}
      <h2 className="text-xl font-bold mb-2 text-center">Custo Unitário</h2>
  {plano?.custo_unitario?.length ? (
    <table className="table-auto w-full border-collapse border border-gray-300 text-center">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Produto</th>
          <th className="border border-gray-300 p-2">Material</th>
          <th className="border border-gray-300 p-2">Quantidade</th>
          <th className="border border-gray-300 p-2">Valor</th>
          <th className="border border-gray-300 p-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {plano.custo_unitario.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2">{item.produto}</td>
            <td className="border border-gray-300 p-2">{item.material}</td>
            <td className="border border-gray-300 p-2">{item.quantidade}</td>
            <td className="border border-gray-300 p-2">{formatarPreco(item.valor_unitário)}</td>
            <td className="border border-gray-300 p-2">{formatarPreco(item.total)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Nenhum dado disponível para o custo unitário.</p>
  )}
</section>

  <section className="bg-white shadow rounded p-4">
  <h2 className="text-xl font-bold mb-2 text-center">Comercialização</h2>
  </section>

<section className="bg-white shadow rounded p-4">

  <h2 className="text-xl font-bold mb-2 text-center">Investimento Pré-Operacional</h2>
  {plano?.investimento_pre?.length ? (
    <table className="table-auto w-full border-collapse border border-gray-300 text-center">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Descrição</th>
          <th className="border border-gray-300 p-2">Valor</th>
        </tr>
      </thead>
      <tbody>
        {plano.investimento_pre.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2">{item.descricao}</td>
            <td className="border border-gray-300 p-2">{formatarPreco(item.valor)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Nenhum dado disponível para o investimento pré-operacional.</p>
  )}

    <h2 className="text-xl font-bold mb-2 text-center">Investimento Total</h2>
  {plano?.investimento_total?.length ? (
    <table className="table-auto w-full border-collapse border border-gray-300 text-center">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Valor total do empreendimento</th>
        </tr>
      </thead>
      <tbody>
        {plano.investimento_total.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2">{formatarPreco(item.total_investimento)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Nenhum dado disponível para o Investimento Total.</p>
  )}
 
</section>

  <section className="bg-white shadow rounded p-4">
  <h2 className="text-lg font-semibold mb-2 text-center">Depreciação</h2>
{plano?.depreciacao?.length ? (
      <table className='table-auto w-full border-collapse border border-gray-300 text-sm text-center'>
      <thead>
      <tr>
      <th className="border border-gray-300 px-2 py-1">Ativos</th>
        <th className="border border-gray-300 px-2 py-1">Valor</th>
        <th className="border border-gray-300 px-2 py-1">Anos</th>
        <th className="border border-gray-300 px-2 py-1">Anual</th>
        <th className="border border-gray-300 px-2 py-1">Mensal</th>
        <th className="border border-gray-300 px-2 py-1">Total</th>
      </tr>
      </thead>
      <tbody>
  {plano.depreciacao.map((item, index) => (
    <tr key={index}>
      <td className="border border-gray-300 px-2 py-1">{item.ativos}</td>
      <td className="border border-gray-300 px-2 py-1">{formatarPreco(item.valor)}</td>
      <td className="border border-gray-300 px-2 py-1">{item.anos}</td>
      <td className="border border-gray-300 px-2 py-1">{formatarPreco(item.anual)}</td>
      <td className="border border-gray-300 px-2 py-1">{formatarPreco(item.mensal)}</td>
      <td className="border border-gray-300 px-2 py-1">{formatarPreco(item.total)}</td>
    </tr>
  ))}
</tbody>
</table>
  ) : (
    <p>Nenhum dado disponível para a depreciação.</p>
  )}
  <h2 className="text-lg font-semibold mb-2 text-center">Custos Fixos</h2>
  {plano?.custo_fixo?.length ? (
    <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-center">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-1">Descrição</th>
          <th className="border border-gray-300 px-2 py-1">Custo</th>
          <th className="border border-gray-300 px-2 py-1">Crescimento</th>
        </tr>
      </thead>
      <tbody>
        {plano.custo_fixo.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-2 py-1">{item.descricao}</td>
            <td className="border border-gray-300 px-2 py-1">{item.custo}</td>
            <td className="border border-gray-300 px-2 py-1">{item.crescimento}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-center">Nenhum dado disponível para o faturamento.</p>
  )}


  <section className="bg-white shadow rounded p-4">
  <h2 className="text-xl font-bold mb-2 text-center">Demonstrativo de Resultados</h2>
  {plano?.demonstrativo?.length ? (
    <table className="table-auto w-full border-collapse border border-gray-300 text-center">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Resultado Operacional</th>
          <th className="border border-gray-300 p-2">Lucro Mensal</th>
          <th className="border border-gray-300 p-2">Porcentagem Lucro</th>
        </tr>
      </thead>
      <tbody>
        {plano.demonstrativo.map((demonstrativo, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2">{formatarPreco(demonstrativo.resultado_operacional)}</td>
            <td className="border border-gray-300 p-2">{formatarPreco(demonstrativo.lucro_mensal)}</td>
            <td className="border border-gray-300 p-2">{demonstrativo.porcentagem_lucro ? parseFloat(demonstrativo.porcentagem_lucro).toFixed(2) : 'N/A'}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Nenhum dado disponível para o demonstrativo de resultados.</p>
  )}
</section>
</section>

{/* Seção: Análise SWOT */}
  <Analise_component analise = {analise}/>
  {/* Seção: Análise da IA */}
  <Avaliação_component Avaliação_component={avaliacao}/>
  {/* Botão de Download */}
</div>
  <Suspense fallback={<p>Carregando botão...</p>}>
              <DownloadButton
                elementId="relatorio-content"
                filename={`Plano_de_Negocio_${plano?.nome || 'Desconhecido'}.pdf`}
                planoNome={plano?.nome}
              />
            </Suspense>
          </>
        )}
      </main>

      <footer className="text-center bg-blue-500 text-white py-4">
        <p>&copy; 2024 - Todos os direitos reservados.</p>
        <p>&copy; A Análise de Plano de Negócios feita pela IA é uma análise automatizada, procure um especialista para obter uma avaliação mais detalhada.</p>
      </footer>
    </div>
    </Authenticated>
  );
};

export default Relatorio;
