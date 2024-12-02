import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

const Executivo = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
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
        // Mapeia o array de objetos CNAE para um formato mais conveniente
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
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Plano Executivo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
            <input
              type="text"
              name="nome"
              value={data.nome}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
            {errors.nome && <div className="text-red-600">{errors.nome}</div>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">CPF ou CNPJ</label>
            <input
              type="text"
              name="cpfCnpj"
              value={data.cpfCnpj}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
            {errors.cpfCnpj && <div className="text-red-600">{errors.cpfCnpj}</div>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Missão da Empresa</label>
            <textarea
              name="missao"
              value={data.missao}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.missao && <div className="text-red-600">{errors.missao}</div>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Setor de Atividade</label>
            <select
              name="setorAtividade"
              value={data.setorAtividade}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
             <option value="">Selecione...</option>
            {cnaeOptions.map((cnae, index) => (
              <option key={index} value={cnae.CNAE}>
                {cnae.Descrição}
              </option>
            ))}
            </select>
            {errors.setorAtividade && <div className="text-red-600">{errors.setorAtividade}</div>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Forma Jurídica</label>
            <select
              name="formaJuridica"
              value={data.formaJuridica}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Selecione...</option>
              <option value="MEI">Microempreendedor Individual – MEI</option>
              <option value="Empresário Individual">Empresário Individual</option>
              <option value="EIRELI">Empresa Individual de Responsabilidade Limitada – EIRELI</option>
              <option value="Sociedade Limitada">Sociedade Limitada</option>
            </select>
            {errors.formaJuridica && <div className="text-red-600">{errors.formaJuridica}</div>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Enquadramento Tributário</label>
            <input
              type="text"
              name="enquadramentoTributario"
              value={data.enquadramentoTributario}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.enquadramentoTributario && <div className="text-red-600">{errors.enquadramentoTributario}</div>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Valores</label>
            <textarea
              name="valores"
              value={data.valores}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.visao && <div className="text-red-600">{errors.visao}</div>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Fonte de Recursos</label>
            <textarea
              name="fonteRecursos"
              value={data.fonteRecursos}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.fonteRecursos && <div className="text-red-600">{errors.fonteRecursos}</div>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Visão da Empresa</label>
            <textarea
              name="visao"
              value={data.visao}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.visao && <div className="text-red-600">{errors.visao}</div>}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
          disabled={processing}
        >
          Enviar Formulário
        </button>
      </form>
    </div>
  );
};

export default Executivo;
