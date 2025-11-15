import React from 'react';
import { useForm } from '@inertiajs/react';

import Client_Form from './Form_Mercado/Client_Form';
import Concorrente_Form from './Form_Mercado/Concorrente_Form';
import Fornecedor_Form from './Form_Mercado/Fornecedor_Form';

import Authenticated from '@/Layouts/AuthenticatedLayout';

const Mercado = ({ planoId, auth }) => {
    const { data, setData, post, processing } = useForm({
        client: { perfil: '', comportamento: '', área: '' },
        concorrente: [
            {
                qualidade_concorrente: '',
                nome_concorrente: '',
                preco_concorrente: '',
                pagamento_concorrente: '',
                localizacao_concorrente: '',
                garantias_concorrente: '',
                servico_concorrente: '',
            },
        ],
        fornecedor: [
            {
                descricao_fornecedor: '',
                nome_fornecedor: '',
                preco_fornecedor: '',
                pagamento_fornecedor: '',
                localizacao_fornecedor: '',
                prazo_entrega: '',
            },
        ],
    });

    const handleChange = (section, index, name, value) => {
        const updated = [...data[section]];
        updated[index][name] = value;
        setData(section, updated);
    };

    const addNewSectionItem = (section) => {
        const emptyItem =
            section === 'concorrente'
                ? {
                      qualidade_concorrente: '',
                      nome_concorrente: '',
                      preco_concorrente: '',
                      pagamento_concorrente: '',
                      localizacao_concorrente: '',
                      garantias_concorrente: '',
                      servico_concorrente: '',
                  }
                : {
                      descricao_fornecedor: '',
                      nome_fornecedor: '',
                      preco_fornecedor: '',
                      pagamento_fornecedor: '',
                      localizacao_fornecedor: '',
                      prazo_entrega: '',
                  };

        setData(section, [...data[section], emptyItem]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('plano_mercado', planoId));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="text-3xl font-bold text-gray-800 text-center py-6">
                    Análise de Mercado
                </h2>
            }
        >
            <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

                <form onSubmit={handleSubmit} className="space-y-16">

                    {/* CLIENTE */}
                    <Client_Form
                        data={data.client}
                        onChange={(name, value) =>
                            setData('client', { ...data.client, [name]: value })
                        }
                    />

                    {/* CONCORRENTES */}
                    <div className="space-y-6">
                        {data.concorrente.map((item, index) => (
                            <Concorrente_Form
                                key={index}
                                data={item}
                                onChange={(name, value) =>
                                    handleChange('concorrente', index, name, value)
                                }
                            />
                        ))}

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => addNewSectionItem('concorrente')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition"
                            >
                                + Adicionar Concorrente
                            </button>
                        </div>
                    </div>

                    {/* FORNECEDORES */}
                    <div className="space-y-6">
                        {data.fornecedor.map((item, index) => (
                            <Fornecedor_Form
                                key={index}
                                data={item}
                                onChange={(name, value) =>
                                    handleChange('fornecedor', index, name, value)
                                }
                            />
                        ))}

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => addNewSectionItem('fornecedor')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition"
                            >
                                + Adicionar Fornecedor
                            </button>
                        </div>
                    </div>

                    {/* ENVIAR */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-10 rounded-xl shadow-lg transition disabled:opacity-60"
                        >
                            Enviar
                        </button>
                    </div>

                </form>
            </div>
        </Authenticated>
    );
};

export default Mercado;
