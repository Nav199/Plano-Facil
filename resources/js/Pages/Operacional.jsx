import React from 'react';
import { useForm } from '@inertiajs/react';
import Necessidade from './Form_Operacional/Form_Necessidade/Necessidade';
import Authenticated from "@/Layouts/AuthenticatedLayout";

const Operacional = ({ planoId, auth }) => {
  const { data, setData, post, processing } = useForm({
    capacidadeProdutiva: '',
    volumeProducao: '',
    processosOperacionais: '',
    pessoal: [{ cargo: '', qualificacao: '' }],
  });

  const inputBase =
    "w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl shadow-sm " +
    "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  const handlePessoalChange = (index, key, value) => {
    const updated = [...data.pessoal];
    updated[index][key] = value;
    setData('pessoal', updated);
  };

  const addRow = () => {
    setData('pessoal', [...data.pessoal, { cargo: '', qualificacao: '' }]);
  };

  const removeRow = (index) => {
    setData(
      'pessoal',
      data.pessoal.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('plano_operacional', { id: planoId }));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-bold text-3xl text-gray-800 tracking-tight text-center py-6">
          Plano Operacional
        </h2>
      }
    >
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-200">

          <form onSubmit={handleSubmit} className="space-y-12">

            {/* 🔹 CAPACIDADE E PRODUÇÃO */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Capacidade e Produção
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Capacidade Produtiva
                  </label>
                  <input
                    type="text"
                    value={data.capacidadeProdutiva}
                    onChange={(e) => setData('capacidadeProdutiva', e.target.value)}
                    className={inputBase}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Capacidade máxima de produção ou serviços.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Volume de Produção Inicial
                  </label>
                  <input
                    type="text"
                    value={data.volumeProducao}
                    onChange={(e) => setData('volumeProducao', e.target.value)}
                    className={inputBase}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Volume inicial de produção ou comercialização.
                  </p>
                </div>

              </div>
            </section>

            {/* 🔹 PROCESSOS */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Processos Operacionais
              </h3>

              <textarea
                value={data.processosOperacionais}
                onChange={(e) => setData('processosOperacionais', e.target.value)}
                rows={5}
                className={inputBase}
                placeholder="Descreva como funcionam os processos operacionais da empresa."
              />
            </section>

            {/* 🔹 PESSOAL */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Estrutura de Pessoal
              </h3>

              <Necessidade
                pessoal={data.pessoal}
                handlePessoalChange={handlePessoalChange}
                addRow={addRow}
                removeRow={removeRow}
              />
            </section>

            {/* 🔹 AÇÃO */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={processing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold
                           py-3 px-12 rounded-xl shadow-lg transition-all
                           disabled:opacity-50"
              >
                {processing ? 'Enviando...' : 'Enviar'}
              </button>
            </div>

          </form>

        </div>
      </div>
    </Authenticated>
  );
};

export default Operacional;
