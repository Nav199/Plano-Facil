import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const estados = [
  { nome: "Acre", sigla: "AC" },
  { nome: "Alagoas", sigla: "AL" },
  { nome: "Amazonas", sigla: "AM" },
  { nome: "Bahia", sigla: "BA" },
  { nome: "Ceará", sigla: "CE" },
  { nome: "Espírito Santo", sigla: "ES" },
  { nome: "Goiás", sigla: "GO" },
  { nome: "Maranhão", sigla: "MA" },
  { nome: "Mato Grosso", sigla: "MT" },
  { nome: "Mato Grosso do Sul", sigla: "MS" },
  { nome: "Minas Gerais", sigla: "MG" },
  { nome: "Pará", sigla: "PA" },
  { nome: "Paraíba", sigla: "PB" },
  { nome: "Paraná", sigla: "PR" },
  { nome: "Pernambuco", sigla: "PE" },
  { nome: "Piauí", sigla: "PI" },
  { nome: "Rio de Janeiro", sigla: "RJ" },
  { nome: "Rio Grande do Norte", sigla: "RN" },
  { nome: "Rio Grande do Sul", sigla: "RS" },
  { nome: "Rondônia", sigla: "RO" },
  { nome: "Roraima", sigla: "RR" },
  { nome: "Santa Catarina", sigla: "SC" },
  { nome: "São Paulo", sigla: "SP" },
  { nome: "Sergipe", sigla: "SE" },
  { nome: "Tocantins", sigla: "TO" },
];

const Empreendedores = ({ planoId }) => {
  const { data, setData, post, errors } = useForm({
    socios: [
      { 
        nome: '',
        cidade: '',
        estado: '',
        rua: '',
        numeroRua: '',
        cpf: '',
        curriculo: '',
        funcao: ''
      },
    ],
  });

  const handleSocioChange = (index, e) => {
    const { name, value } = e.target;
    const novosSocios = [...data.socios];
    if (name.startsWith('endereco.')) {
      const enderecoKey = name.split('.')[1];
      novosSocios[index].endereco[enderecoKey] = value;
    } else {
      novosSocios[index][name] = value;
    }
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
        cpf: '',
        curriculo: '',
        funcao: '',
      },
    ]);
  };

  const excluirSocio = (index) => {
    const novosSocios = data.socios.filter((_, i) => i !== index);
    setData('socios', novosSocios);
  };

  const formatarCPF = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    value = value.slice(0, 11); // Limita para no máximo 11 números
  
    if (value.length <= 3) return value;
    if (value.length <= 6) return value.replace(/(\d{3})(\d{1,})/, '$1.$2');
    if (value.length <= 9) return value.replace(/(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3');
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('socios.store', { id: planoId }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Cadastro de Sócios</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mt-4 text-gray-800">Sócios</h3>
          {data.socios.map((socio, index) => (
            <div key={index} className="space-y-4 mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
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
                  {errors.socios && errors.socios[index] && errors.socios[index].nome && (
                    <div className="text-red-600">{errors.socios[index].nome}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    value={socio.cpf}
                    onChange={(e) => {
                      e.target.value = formatarCPF(e);
                      handleSocioChange(index, e);
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors.socios && errors.socios[index] && errors.socios[index].cpf && (
                    <div className="text-red-600">{errors.socios[index].cpf}</div>
                  )}
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
                  {errors.socios && errors.socios[index] && errors.socios[index].cidade && (
                    <div className="text-red-600">{errors.socios[index].cidade}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    name="estado"
                    value={socio.estado}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="">Selecione o Estado</option>
                    {estados.map((estado) => (
                      <option key={estado.sigla} value={estado.sigla}>
                        {`${estado.nome} - ${estado.sigla}`}
                      </option>
                    ))}
                  </select>
                  {errors.socios && errors.socios[index] && errors.socios[index].estado && (
                    <div className="text-red-600">{errors.socios[index].estado}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rua</label>
                  <input
                    type="text"
                    name="rua"
                    value={socio.rua}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors.socios && errors.socios[index] && errors.socios[index].rua && (
                    <div className="text-red-600">{errors.socios[index].rua}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Número da Rua</label>
                  <input
                    type="text"
                    name="numeroRua"
                    value={socio.numeroRua}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors.socios && errors.socios[index] && errors.socios[index].numeroRua && (
                    <div className="text-red-600">{errors.socios[index].numeroRua}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Currículo</label>
                  <textarea
                    name="curriculo"
                    value={socio.curriculo}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors.socios && errors.socios[index] && errors.socios[index].curriculo && (
                    <div className="text-red-600">{errors.socios[index].curriculo}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Função</label>
                  <input
                    type="text"
                    name="funcao"
                    value={socio.funcao}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors.socios && errors.socios[index] && errors.socios[index].funcao && (
                    <div className="text-red-600">{errors.socios[index].funcao}</div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => excluirSocio(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={adicionarSocio}
              className="bg-blue-600 text-white p-2 rounded-lg"
            >
              Adicionar Sócio
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white p-2 rounded-lg"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Empreendedores;
