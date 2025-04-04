import React from 'react';
import { useForm } from '@inertiajs/react';
import Client_Form from './Form_Mercado/Client_Form';
import Concorrente_Form from './Form_Mercado/Concorrente_Form';
import Fornecedor_Form from './Form_Mercado/Fornecedor_Form';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Mercado = ({ planoId, auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    client: {
      perfil: '',
      comportamento: '',
      área: ''
    },
    concorrente: [
      {
        qualidade_concorrente: '',
        nome_concorrente: '',
        preco_concorrente: '',
        pagamento_concorrente: '',
        localizacao_concorrente: '',
        garantias_concorrente: '',
        servico_concorrente: ''
      }
    ],
    fornecedor: [
      {
        descricao_fornecedor: '',
        nome_fornecedor: '',
        preco_fornecedor: '',
        pagamento_fornecedor: '',
        localizacao_fornecedor: '',
        prazo_entrega: ''
      }
    ]
  });

  // Função para lidar com mudanças nos dados
  const handleChange = (section, index, name, value) => {
    const newSectionData = [...data[section]];
    newSectionData[index] = {
      ...newSectionData[index],
      [name]: value
    };
    setData(section, newSectionData);
  };

  // Adiciona novos itens às seções concorrente/fornecedor
  const addNewSectionItem = (section) => {
    setData(section, [
      ...data[section],
      section === 'concorrente'
        ? {
            qualidade_concorrente: '',
            nome_concorrente: '',
            preco_concorrente: '',
            pagamento_concorrente: '',
            localizacao_concorrente: '',
            garantias_concorrente: '',
            servico_concorrente: ''
          }
        : {
            descricao_fornecedor: '',
            nome_fornecedor: '',
            preco_fornecedor: '',
            pagamento_fornecedor: '',
            prazo_entrega: '',
            localizacao_fornecedor: ''
          }
    ]);
  };

  // Função de envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedComportamento = data.client.comportamento.slice(0, 255); // Limita o texto
    setData('client', { ...data.client, comportamento: trimmedComportamento });
    post(route('plano_mercado', planoId));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">
          Análise de Mercado
        </h2>
      }
    >
      <div className="p-4 max-w-2xl mx-auto"></div>
      <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
        {/* Cliente */}
        <div className="mb-8">
          <Client_Form
            data={data.client}
            onChange={(name, value) => setData('client', { ...data.client, [name]: value })}
          />
        </div>

        {/* Concorrentes */}
        <div className="mb-8">
          {data.concorrente.map((concorrente, index) => (
            <Concorrente_Form
              key={index}
              data={concorrente}
              onChange={(name, value) => handleChange('concorrente', index, name, value)}
            />
          ))}
          <div className="text-center">
            <button
              type="button"
              onClick={() => addNewSectionItem('concorrente')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Adicionar Concorrente
            </button>
          </div>
        </div>

        {/* Fornecedores */}
        <div className="mb-8">
          {data.fornecedor.map((fornecedor, index) => (
            <Fornecedor_Form
              key={index}
              data={fornecedor}
              onChange={(name, value) => handleChange('fornecedor', index, name, value)}
            />
          ))}
          <div className="text-center">
            <button
              type="button"
              onClick={() => addNewSectionItem('fornecedor')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Adicionar Fornecedor
            </button>
          </div>
        </div>

        {/* Botão de Enviar */}
        <div className="pt-5">
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={processing}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
    </Authenticated>
  );
};

export default Mercado;
