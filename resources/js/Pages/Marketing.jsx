import React from 'react';
import { useForm } from '@inertiajs/react';
import Produto from './Form_Marketing/Form_produto/Produto';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Marketing = ({ planoId, auth }) => {
  const { data, setData, post, processing } = useForm({
    produtos: [{ name: '', price: '' }],
    estrategia_promo: '',
    estrategia_comer: '',
    localizacao: ''
  });

  const inputBase =
    "w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl shadow-sm " +
    "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  const handleProductChange = (index, key, value) => {
    const updated = [...data.produtos];
    updated[index][key] = value;
    setData('produtos', updated);
  };

  const addProduct = () => {
    setData('produtos', [...data.produtos, { name: '', price: '' }]);
  };

  const removeProduct = (index) => {
    setData(
      'produtos',
      data.produtos.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('plano_marketing', { id: planoId }));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-bold text-3xl text-gray-800 tracking-tight text-center py-6">
          Plano de Marketing
        </h2>
      }
    >
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-200">

          <form onSubmit={handleSubmit} className="space-y-12">

            {/* 🔹 PRODUTOS */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Produtos
              </h3>

              <div className="space-y-6">
                {data.produtos.map((product, index) => (
                  <Produto
                    key={index}
                    index={index}
                    product={product}
                    handleProductChange={handleProductChange}
                    removeProduct={removeProduct}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={addProduct}
                className="mt-6 inline-flex items-center gap-2
                           bg-indigo-100 text-indigo-700 font-medium
                           px-6 py-2 rounded-xl hover:bg-indigo-200 transition"
              >
                + Adicionar Produto
              </button>
            </section>

            {/* 🔹 ESTRATÉGIAS */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Estratégias de Marketing
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Estratégias Promocionais
                  </label>
                  <textarea
                    name="estrategia_promo"
                    value={data.estrategia_promo}
                    onChange={(e) => setData('estrategia_promo', e.target.value)}
                    rows={5}
                    maxLength={1500}
                    className={inputBase}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Como os produtos serão promovidos.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Estratégias de Comercialização
                  </label>
                  <textarea
                    name="estrategia_comer"
                    value={data.estrategia_comer}
                    onChange={(e) => setData('estrategia_comer', e.target.value)}
                    rows={5}
                    maxLength={1500}
                    className={inputBase}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Como os produtos serão vendidos e distribuídos.
                  </p>
                </div>

              </div>
            </section>

            {/* 🔹 LOCALIZAÇÃO */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Localização
              </h3>

              <div className="max-w-md">
                <label className="text-sm font-medium text-gray-600">
                  Área de Atuação
                </label>
                <input
                  type="text"
                  name="localizacao"
                  value={data.localizacao}
                  onChange={(e) => setData('localizacao', e.target.value)}
                  maxLength={100}
                  className={inputBase}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Cidade, região ou área onde o marketing será aplicado.
                </p>
              </div>
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

export default Marketing;
