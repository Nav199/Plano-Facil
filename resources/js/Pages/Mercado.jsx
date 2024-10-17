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
    post(route('plano_mercado', { id: planoId }));
  };

  return (
    <div className='container mx-auto p-4'>
      <Client_Form onChange={(name, value) => handleChange('client', 0, name, value)} />

      {data.concorrente.map((_, index) => (
        <Concorrente_Form
          key={index}
          onChange={(name, value) => handleChange('concorrente', index, name, value)}
        />
      ))}
      <button
        type="button"
        onClick={() => addNewSectionItem('concorrente')}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Adicionar Concorrente
      </button>

      {data.fornecedor.map((_, index) => (
        <Fornecedor_Form
          key={index}
          onChange={(name, value) => handleChange('fornecedor', index, name, value)}
        />
      ))}
      <button
        type="button"
        onClick={() => addNewSectionItem('fornecedor')}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Adicionar Fornecedor
      </button>

      <button
        onClick={handleSubmit}
        type='submit'
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        disabled={processing}
      >
        Enviar
      </button>
    </div>
  );
};

export default Mercado;
