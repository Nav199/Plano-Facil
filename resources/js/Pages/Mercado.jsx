import React from 'react';
import { useForm } from '@inertiajs/react';
import Client_Form from './Form_Mercado/Client_Form';
import Concorrente_Form from './Form_Mercado/Concorrente_Form';
import Fornecedor_Form from './Form_Mercado/Fornecedor_Form';

const Mercado = ({ planoId }) => {
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
        localizacao_fornecedor: ''
      }
    ]
  });

  const handleChange = (section, index, name, value) => {
    const newSectionData = [...data[section]];
    newSectionData[index] = {
      ...newSectionData[index],
      [name]: value
    };
    setData(section, newSectionData);
  };

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
            localizacao_fornecedor: ''
          }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedComportamento = data.client.comportamento.slice(0, 255); // Adjust length as needed
    setData('client', { ...data.client, comportamento: trimmedComportamento });
    post(route('plano_mercado', planoId));
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <Client_Form
        data={data.client}
        onChange={(name, value) => setData('client', { ...data.client, [name]: value })}
      />

      {/* Concorrentes */}
      <div>
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
      <div>
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

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={processing}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
};

export default Mercado;
