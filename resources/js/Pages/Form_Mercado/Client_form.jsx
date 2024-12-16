import React from 'react';

const Client_form = ({ onChange }) => { 
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    return (
        <div className="p-4 bg-gray-100 rounded shadow mb-4">
            <h2 className="text-lg font-semibold mb-2">Estudo do Cliente</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="perfil" className="block text-sm font-medium text-gray-700">Público Alvo</label>
                    <input
                        type="text"
                        name="perfil"
                        id="perfil"
                        className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="comportamento" className="block text-sm font-medium text-gray-700">Comportamento dos Clientes</label>
                    <textarea
                        name="comportamento"
                        id="comportamento"
                        maxLength={200}
                        className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="área" className="block text-sm font-medium text-gray-700">Área de Abrangência</label>
                    <input
                        type="text"
                        name="área"
                        id="área"
                        maxLength={200}
                        className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Client_form;
