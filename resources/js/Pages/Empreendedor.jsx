import React from 'react';
import { useForm } from '@inertiajs/react';

const estados = [
  { nome: "Acre", sigla: "AC" }, { nome: "Alagoas", sigla: "AL" }, { nome: "Amazonas", sigla: "AM" },
  { nome: "Bahia", sigla: "BA" }, { nome: "Ceará", sigla: "CE" }, { nome: "Espírito Santo", sigla: "ES" },
  { nome: "Goiás", sigla: "GO" }, { nome: "Maranhão", sigla: "MA" }, { nome: "Mato Grosso", sigla: "MT" },
  { nome: "Mato Grosso do Sul", sigla: "MS" }, { nome: "Minas Gerais", sigla: "MG" },
  { nome: "Pará", sigla: "PA" }, { nome: "Paraíba", sigla: "PB" }, { nome: "Paraná", sigla: "PR" },
  { nome: "Pernambuco", sigla: "PE" }, { nome: "Piauí", sigla: "PI" }, { nome: "Rio de Janeiro", sigla: "RJ" },
  { nome: "Rio Grande do Norte", sigla: "RN" }, { nome: "Rio Grande do Sul", sigla: "RS" },
  { nome: "Rondônia", sigla: "RO" }, { nome: "Roraima", sigla: "RR" }, { nome: "Santa Catarina", sigla: "SC" },
  { nome: "São Paulo", sigla: "SP" }, { nome: "Sergipe", sigla: "SE" }, { nome: "Tocantins", sigla: "TO" },
];

const Socios = ({ planoId }) => {
  const { data, setData, post, errors } = useForm({
    socios: [
      {
        nome: '',
        cpf: '',
        cidade: '',
        estado: '',
        rua: '',
        numeroRua: '',
        curriculo: '',
        funcao: '',
      }
    ],
  });

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const novosSocios = [...data.socios];
    novosSocios[index][name] = value;
    setData("socios", novosSocios);
  };

  const formatarCPF = (value) => {
    let v = value.replace(/\D/g, "").slice(0, 11);
    if (v.length <= 3) return v;
    if (v.length <= 6) return v.replace(/(\d{3})(\d+)/, "$1.$2");
    if (v.length <= 9) return v.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
  };

  const addSocio = () => {
    setData("socios", [
      ...data.socios,
      { nome: "", cpf: "", cidade: "", estado: "", rua: "", numeroRua: "", curriculo: "", funcao: "" }
    ]);
  };

  const excluirSocio = (index) => {
    setData("socios", data.socios.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("socios.store", { id: planoId }));
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-10">
      <h1 className="text-3xl font-bold text-center text-gray-900">Cadastro de Sócios</h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        {data.socios.map((socio, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md space-y-8">

            <h2 className="text-xl font-semibold text-gray-800">Sócio {index + 1}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label className="block font-medium">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={socio.nome}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm"
                />
              </div>

              {/* CPF */}
              <div>
                <label className="block font-medium">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={socio.cpf}
                  onChange={(e) => handleChange(index, { target: { name: "cpf", value: formatarCPF(e.target.value) } })}
                  className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm"
                />
              </div>

              {/* Cidade */}
              <div>
                <label className="block font-medium">Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={socio.cidade}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm"
                />
              </div>

              {/* Estado */}
              <div>
                <label className="block font-medium">Estado</label>
                <select
                  name="estado"
                  value={socio.estado}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm"
                >
                  <option value="">Selecione</option>
                  {estados.map((estado) => (
                    <option key={estado.sigla} value={estado.sigla}>
                      {estado.nome} - {estado.sigla}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rua */}
              <div>
                <label className="block font-medium">Rua</label>
                <input
                  type="text"
                  name="rua"
                  value={socio.rua}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm"
                />
              </div>

              {/* Número */}
              <div>
                <label className="block font-medium">Número</label>
                <input
                  type="text"
                  name="numeroRua"
                  value={socio.numeroRua}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm"
                />
              </div>

              {/* Currículo */}
              <div className="md:col-span-2">
                <label className="block font-medium">Currículo</label>
                <textarea
                  name="curriculo"
                  value={socio.curriculo}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-4 shadow-sm min-h-32"
                  rows={6}
                  placeholder="Descreva o currículo do sócio..."
                />
              </div>

              {/* Função */}
              <div>
                <label className="block font-medium">Função</label>
                <input
                  type="text"
                  name="funcao"
                  value={socio.funcao}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => excluirSocio(index)}
              className="text-red-600 font-semibold hover:text-red-800"
            >
              Excluir Sócio
            </button>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addSocio}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Adicionar Sócio
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Socios;
