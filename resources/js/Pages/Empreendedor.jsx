import React, { useState } from 'react';

const Empreendedores = () => {
  const [empreendedor, setEmpreendedor] = useState({
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
    setEmpreendedor({
      ...empreendedor,
      [name]: value,
    });
  };

  const handleSocioChange = (index, e) => {
    const { name, value } = e.target;
    const novosSocios = [...empreendedor.socios];
    novosSocios[index][name] = value;
    setEmpreendedor({
      ...empreendedor,
      socios: novosSocios,
    });
  };

  const adicionarSocio = () => {
    setEmpreendedor({
      ...empreendedor,
      socios: [
        ...empreendedor.socios,
        {
          nome: '',
          cidade: '',
          estado: '',
          rua: '',
          numeroRua: '',
          curriculo: '',
          funcao: '',
        },
      ],
    });
  };

  const excluirSocio = (index) => {
    const novosSocios = empreendedor.socios.filter((_, i) => i !== index);
    setEmpreendedor({
      ...empreendedor,
      socios: novosSocios,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica para enviar os dados, como uma chamada de API.
    console.log('Dados enviados:', empreendedor);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      
      <h2 className="text-2xl align-items: center font-bold mb-4">Cadastro de Empreendedor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="nome"
              value={empreendedor.nome}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Cidade</label>
            <input
              type="text"
              name="cidade"
              value={empreendedor.cidade}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <input
              type="text"
              name="estado"
              value={empreendedor.estado}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Rua</label>
            <input
              type="text"
              name="rua"
              value={empreendedor.rua}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Número da Rua</label>
            <input
              type="text"
              name="numeroRua"
              value={empreendedor.numeroRua}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Currículo</label>
            <textarea
              name="curriculo"
              value={empreendedor.curriculo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Função na Empresa</label>
          <input
            type="text"
            name="funcao"
            value={empreendedor.funcao}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-4">Sócios</h3>
          {empreendedor.socios.map((socio, index) => (
            <div key={index} className="space-y-2 mt-2 p-4 border rounded-md">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={socio.nome}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    value={socio.cidade}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <input
                    type="text"
                    name="estado"
                    value={socio.estado}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Rua</label>
                  <input
                    type="text"
                    name="rua"
                    value={socio.rua}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Número da Rua</label>
                  <input
                    type="text"
                    name="numeroRua"
                    value={socio.numeroRua}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Currículo</label>
                  <textarea
                    name="curriculo"
                    value={socio.curriculo}
                    onChange={(e) => handleSocioChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Função na Empresa</label>
                <input
                  type="text"
                  name="funcao"
                  value={socio.funcao}
                  onChange={(e) => handleSocioChange(index, e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <button
                type="button"
                onClick={() => excluirSocio(index)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Excluir Sócio
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={adicionarSocio}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Adicionar Sócio
          </button>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 align-items: center; bg-green-500 text-white rounded-md"
        >
          Enviar Formulário
        </button>
      </form>
    </div>
  );
};

export default Empreendedores;
