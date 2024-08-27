import React from 'react';
import { useForm } from '@inertiajs/react';
import Client_Form from './Form_Mercado/Client_Form';
import Concorrente_Form from './Form_Mercado/Concorrente_Form';
import Fornecedor_Form from './Form_Mercado/Fornecedor_Form';

const Mercado = () => {
  const { data, setData, post, processing, errors } = useForm({
    client: {
      perfil: '',
      comportamento: '',
      área: ''
    },
    concorrente: {
      qualidade_concorrente: '',
      nome_concorrente: '',
      preco_concorrente: '',
      pagamento_concorrente: '',
      localizacao_concorrente: '',
      garantias_concorrente: '',
      servico_concorrente: ''
    },
    fornecedor: {
      descricao_fornecedor: '',
      nome_fornecedor: '',
      preco_fornecedor: '',
      pagamento_fornecedor: '',
      localizacao_fornecedor: ''
    }
  });

  const handleChange = (section, name, value) => {
    setData(section, {
      ...data[section],
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('plano_mercado',{id}));
  };

  return (
    <div className='container mx-auto p-4'>
      <Client_Form onChange={(name, value) => handleChange('client', name, value)} />
      <Concorrente_Form onChange={(name, value) => handleChange('concorrente', name, value)} />
      <Fornecedor_Form onChange={(name, value) => handleChange('fornecedor', name, value)} />
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
