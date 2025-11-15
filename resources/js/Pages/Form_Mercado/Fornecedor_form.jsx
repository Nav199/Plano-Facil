import React, { useState } from 'react';

const Fornecedor_Form = ({ data, onChange }) => {
    const [preco, setPreco] = useState('');

    const handlePriceChange = (e) => {
        let value = e.target.value;
        let numeric = value.replace(/[^\d,]/g, '').replace(',', '.');

        setPreco("R$ " + numeric.replace('.', ','));
        onChange('preco_fornecedor', numeric);
    };

    const handleChange = (e) => {
        onChange(e.target.name, e.target.value);
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Estudo dos Fornecedores
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Input label="Nome" name="nome_fornecedor" onChange={handleChange} />

                <Input label="Descrição" name="descricao_fornecedor" onChange={handleChange} />

                <Input
                    label="Preço"
                    name="preco_fornecedor"
                    value={preco}
                    onChange={handlePriceChange}
                />

                <Input
                    label="Condições de Pagamento"
                    name="pagamento_fornecedor"
                    onChange={handleChange}
                />

                <Input label="Prazo de entrega" name="prazo_entrega" onChange={handleChange} />

                <Input label="Localização" name="localizacao_fornecedor" onChange={handleChange} />

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

export default Fornecedor_Form;
