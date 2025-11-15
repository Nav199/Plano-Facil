import React, { useState } from 'react';

const Concorrente_Form = ({ data, onChange }) => {
    const [preco, setPreco] = useState('');

    const handlePriceChange = (e) => {
        let value = e.target.value;
        let numeric = value.replace(/[^\d,]/g, '').replace(',', '.');

        setPreco("R$ " + numeric.replace('.', ','));
        onChange('preco_concorrente', numeric);
    };

    const handleChange = (e) => {
        onChange(e.target.name, e.target.value);
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Estudo dos Concorrentes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/** Nome */}
                <Input label="Nome" name="nome_concorrente" onChange={handleChange} />

                <Input label="Qualidade" name="qualidade_concorrente" onChange={handleChange} />

                <Input
                    label="Preço"
                    value={preco}
                    name="preco_concorrente"
                    onChange={handlePriceChange}
                />

                <Input label="Condições de Pagamento" name="pagamento_concorrente" onChange={handleChange} />

                <Input label="Localização" name="localizacao_concorrente" onChange={handleChange} />

                <Input label="Garantias" name="garantias_concorrente" onChange={handleChange} />

                <Input label="Serviço" name="servico_concorrente" onChange={handleChange} />

            </div>
        </div>
    );
};

const Input = ({ label, ...props }) => (
    <div>
        <label className="text-gray-700 font-medium">{label}</label>
        <input
            {...props}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl 
                       focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
    </div>
);

export default Concorrente_Form;
