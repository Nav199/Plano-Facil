import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const Empreendedores = () => {
  const { data, setData, post, processing, errors } = useForm({
    nome: '',
    cidade: '',
    estado: '',
    rua: '',
    numeroRua: '',
    curriculo: '',
    funcao: '',
    socios: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSocioChange = (index, e) => {
    const { name, value } = e.target;
    const novosSocios = [...data.socios];
    novosSocios[index][name] = value;
    setData('socios', novosSocios);
  };

  const adicionarSocio = () => {
    setData('socios', [
      ...data.socios,
      {
        nome: '',
        cidade: '',
        estado: '',
        rua: '',
        numeroRua: '',
        curriculo: '',
        funcao: '',
      },
    ]);
  };

  const excluirSocio = (index) => {
    const novosSocios = data.socios.filter((_, i) => i !== index);
    setData('socios', novosSocios);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('socios');  // Define a rota para envio dos dados
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Cadastro de Sócios</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mt-4 text-gray-800">Sócios</h3>
          {data.socios.map((socio, index) => (
            <div key={index} className="space-y-4 mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
              {/* Campos de Sócios */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={socio.nome}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors[`socios.${index}.nome`] && <div className="text-red-600">{errors[`socios.${index}.nome`]}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    value={socio.cidade}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors[`socios.${index}.cidade`] && <div className="text-red-600">{errors[`socios.${index}.cidade`]}</div>}
                </div>
              </div>
              {/* Outros campos */}
              {/* Botão de exclusão */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => excluirSocio(index)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
                >
                  Excluir Sócio
                </button>
              </div>
            </div>
          ))}
          {/* Botão para adicionar sócio */}
          <div className="text-center">
            <button
              type="button"
              onClick={adicionarSocio}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
            >
              Adicionar Sócio
            </button>
          </div>
        </div>
        {/* Botão de envio */}
        <div className="text-center">
          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-green-600"
          >
            Enviar Formulário
          </button>
        </div>
      </form>
    </div>
  );
};

export default Empreendedores;
