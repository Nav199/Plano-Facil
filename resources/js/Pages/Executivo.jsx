import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Executivo = ({ auth }) => {
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
  const [cpfCnpjValido, setCpfCnpjValido] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cpfCnpj') {
      const formattedValue = formatarCPFouCNPJ(value);
      setData(name, formattedValue);
      validarCPFouCNPJ(value);
    } else {
      setData(name, value);
    }
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

  const formatarCPFouCNPJ = (valor) => {
    let value = valor.replace(/\D/g, '');
    if (value.length <= 11) {
      // Formatar como CPF
      if (value.length <= 3) return value;
      if (value.length <= 6) return value.replace(/(\d{3})(\d{1,})/, '$1.$2');
      if (value.length <= 9) return value.replace(/(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3');
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3-$4');
    } else {
      // Formatar como CNPJ
      if (value.length <= 2) return value;
      if (value.length <= 5) return value.replace(/(\d{2})(\d{1,})/, '$1.$2');
      if (value.length <= 8) return value.replace(/(\d{2})(\d{3})(\d{1,})/, '$1.$2.$3');
      if (value.length <= 12) return value.replace(/(\d{2})(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3/$4');
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,})/, '$1.$2.$3/$4-$5');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/Executivo');
  };

  return (
    <Authenticated user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">Plano Executivo</h2>}>
    <div className="p-4 max-w-2xl mx-auto">
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
              {cpfCnpjValido && (
                <div className="text-green-600 mt-1 text-sm">
                  CPF ou CNPJ identificado com sucesso.
                </div>
              )}
              {errors.cpfCnpj && <div className="text-red-600">{errors.cpfCnpj}</div>}
            </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Missão da Empresa</label>
            <textarea
              name="missao"
              value={data.missao}
              onChange={handleChange}
               minLength="10"
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
          <select
              name="enquadramentoTributario"
              value={data.enquadramentoTributario}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Selecione...</option>
              <option value="Simples Nacional">Simples Nacional</option>
            </select>
          {errors.enquadramentoTributario && (
            <div className="text-red-600">{errors.enquadramentoTributario}</div>
          )} 
        </div> 

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Valores da Empresa</label>
            <textarea
              name="valores"
              value={data.valores}
              onChange={handleChange}
               minLength="10"
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
              minLength="10"
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
               minLength="10"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.visao && <div className="text-red-600">{errors.visao}</div>}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            disabled={processing}
          >
            {processing ? "Enviando..." : "Enviar"}
          </button>
          
        </div>
      </form>
    </div>
    </Authenticated>
  );
};

export default Executivo;
