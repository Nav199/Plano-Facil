import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Executivo = ({ auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    nome: '',
    cpfCnpj: '',
    missao: '',
    setorAtividade: '',
    formaJuridica: '',
    enquadramentoTributario: '',
    fonteRecursos: '',
    valores: '',
    visao: '',
  });

  const [cnaeOptions, setCnaeOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  useEffect(() => {
    const fetchCnae = async () => {
      try {
        const response = await axios.get('/cnae');
        setCnaeOptions(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados de CNAE:', error);
      }
    };

    fetchCnae();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/Executivo');
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-bold text-3xl text-gray-800 tracking-tight text-center py-6">
          Plano Executivo
        </h2>
      }
    >
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-200">

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Nome */}
              <div>
                <label className="text-gray-700 font-medium">Nome da Empresa</label>
                <input
                  type="text"
                  name="nome"
                  value={data.nome}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl
                             focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  required
                />
                {errors.nome && <p className="text-red-600 text-sm">{errors.nome}</p>}
              </div>

              {/* CPF / CNPJ */}
              <div>
                <label className="text-gray-700 font-medium">CPF ou CNPJ</label>
                <input
                  type="text"
                  name="cpfCnpj"
                  value={data.cpfCnpj}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl
                             focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  required
                />
                {errors.cpfCnpj && <p className="text-red-600 text-sm">{errors.cpfCnpj}</p>}
              </div>

              {/* Missão */}
              <div>
                <label className="text-gray-700 font-medium">Missão da Empresa</label>
                <textarea
                  name="missao"
                  value={data.missao}
                  onChange={handleChange}
                  rows="4"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl
                             focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                {errors.missao && <p className="text-red-600 text-sm">{errors.missao}</p>}
              </div>

              {/* Setor */}
              <div>
                <label className="text-gray-700 font-medium">Setor de Atividade</label>
                <select
                  name="setorAtividade"
                  value={data.setorAtividade}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl
                             focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  required
                >
                  <option value="">Selecione...</option>
                  {cnaeOptions.map((cnae, index) => (
                    <option key={index} value={cnae.CNAE}>
                      {cnae.Descrição}
                    </option>
                  ))}
                </select>
                {errors.setorAtividade && (
                  <p className="text-red-600 text-sm">{errors.setorAtividade}</p>
                )}
              </div>

              {/* Forma Jurídica */}
              <div>
                <label className="text-gray-700 font-medium">Forma Jurídica</label>
                <select
                  name="formaJuridica"
                  value={data.formaJuridica}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl
                             focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="MEI">Microempreendedor Individual – MEI</option>
                  <option value="Empresário Individual">Empresário Individual</option>
                  <option value="EIRELI">EIRELI</option>
                  <option value="Sociedade Limitada">Sociedade Limitada</option>
                </select>
                {errors.formaJuridica && (
                  <p className="text-red-600 text-sm">{errors.formaJuridica}</p>
                )}
              </div>

              {/* Enquadramento */}
              <div>
                <label className="text-gray-700 font-medium">Enquadramento Tributário</label>
                <select
                  name="enquadramentoTributario"
                  value={data.enquadramentoTributario}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl
                             focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Simples Nacional">Simples Nacional</option>
                </select>
                {errors.enquadramentoTributario && (
                  <p className="text-red-600 text-sm">{errors.enquadramentoTributario}</p>
                )}
              </div>

              {/* Valores */}
              <div>
                <label className="text-gray-700 font-medium">Valores da Empresa</label>
                <textarea
                  name="valores"
                  value={data.valores}
                  onChange={handleChange}
                  rows="4"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl
                             focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
              </div>

              {/* Fonte de Recursos */}
              <div>
                <label className="text-gray-700 font-medium">Fonte de Recursos</label>
                <textarea
                  name="fonteRecursos"
                  value={data.fonteRecursos}
                  onChange={handleChange}
                  rows="4"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl
                             focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
              </div>

              {/* Visão */}
              <div className="md:col-span-2">
                <label className="text-gray-700 font-medium">Visão da Empresa</label>
                <textarea
                  name="visao"
                  value={data.visao}
                  onChange={handleChange}
                  rows="4"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl
                             focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                {errors.visao && <p className="text-red-600 text-sm">{errors.visao}</p>}
              </div>
            </div>

            {/* BOTÃO */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={processing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold
                           py-3 px-10 rounded-xl shadow-md transition-all"
              >
                {processing ? "Enviando..." : "Enviar"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </Authenticated>
  );
};

export default Executivo;
