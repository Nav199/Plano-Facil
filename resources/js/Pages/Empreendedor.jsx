import React from 'react';
import { useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Socios = ({ planoId, auth }) => {
  const { data, setData, post, errors } = useForm({
    socios: [
      {
        nome: '',
        cpf: '',
        cep: '',
        cidade: '',
        estado: '',
        rua: '',
        numeroRua: '',
        curriculo: '',
        funcao: '',
        capitalInvestido: '',
        participacao: 100,
      }
    ],
  });

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    let novosSocios = [...data.socios];

    novosSocios[index][name] = value;

    if (name === "capitalInvestido") {
      novosSocios = recalcularParticipacao(novosSocios);
    }

    setData("socios", novosSocios);
  };

  const buscarCep = async (index, cep) => {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(`/cep/${cepLimpo}`);
      if (!response.ok) return;

      const endereco = await response.json();

      const novos = [...data.socios];
      novos[index].rua = endereco.rua;
      novos[index].cidade = endereco.cidade;
      novos[index].estado = endereco.estado;

      setData("socios", novos);
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
    }
  };

  const formatarCPF = (value) => {
    let v = value.replace(/\D/g, "").slice(0, 11);
    if (v.length <= 3) return v;
    if (v.length <= 6) return v.replace(/(\d{3})(\d+)/, "$1.$2");
    if (v.length <= 9) return v.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
  };

  const addSocio = () => {
    let novos = [
      ...data.socios,
      {
        nome: "",
        cpf: "",
        cep: "",
        cidade: "",
        estado: "",
        rua: "",
        numeroRua: "",
        curriculo: "",
        funcao: "",
        capitalInvestido: "",
        participacao: 0
      }
    ];

    novos = recalcularParticipacao(novos);
    setData("socios", novos);
  };

  const excluirSocio = (index) => {
    setData("socios", data.socios.filter((_, i) => i !== index));
  };

  const recalcularParticipacao = (socios) => {
    const total = socios.reduce((sum, s) => sum + Number(s.capitalInvestido || 0), 0);

    return socios.map(s => ({
      ...s,
      participacao: total > 0
        ? ((Number(s.capitalInvestido) || 0) / total * 100).toFixed(2)
        : 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("socios.store", { id: planoId }));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-bold text-3xl text-gray-800 tracking-tight text-center py-6">
          Cadastro de Sócios
        </h2>
      }
    >
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {data.socios.map((socio, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md space-y-8">

              <h2 className="text-xl font-semibold text-gray-800">
                Sócio {index + 1}
              </h2>

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
                    onChange={(e) =>
                      handleChange(index, {
                        target: { name: "cpf", value: formatarCPF(e.target.value) }
                      })
                    }
                    className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm"
                  />
                </div>

                {/* CEP */}
                <div>
                  <label className="block font-medium">CEP</label>
                  <input
                    type="text"
                    name="cep"
                    value={socio.cep}
                    onChange={(e) => {
                      handleChange(index, e);
                      buscarCep(index, e.target.value);
                    }}
                    className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm"
                    placeholder="00000000"
                  />
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

                {/* Cidade */}
                <div>
                  <label className="block font-medium">Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    value={socio.cidade}
                    readOnly
                    className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm bg-gray-100"
                  />
                </div>

                {/* Estado */}
                <div>
                  <label className="block font-medium">Estado</label>
                  <input
                    type="text"
                    name="estado"
                    value={socio.estado}
                    readOnly
                    className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm bg-gray-100"
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

                {/* Capital Investido */}
                <div>
                  <label className="block font-medium">Capital Investido (R$)</label>
                  <input
                    type="number"
                    min="0"
                    name="capitalInvestido"
                    value={socio.capitalInvestido}
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm"
                  />
                </div>

                {/* Participação */}
                <div>
                  <label className="block font-medium">Participação (%)</label>
                  <input
                    type="text"
                    value={socio.participacao}
                    readOnly
                    className="mt-1 w-full rounded-lg border-gray-300 p-3 shadow-sm bg-gray-100"
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
    </Authenticated>
  );
};

export default Socios;
