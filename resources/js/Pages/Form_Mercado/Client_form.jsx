import React from 'react';

const Client_Form = ({ data, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Estudo do Cliente
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="text-gray-700 font-medium">Público Alvo</label>
                    <input
                        type="text"
                        name="perfil"
                        value={data.perfil}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl 
                                   focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    />
                </div>

                <div>
                    <label className="text-gray-700 font-medium">Comportamento dos Clientes</label>
                    <textarea
                        name="comportamento"
                        value={data.comportamento}
                        onChange={handleChange}
                        rows="4"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl 
                                   focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    ></textarea>
                </div>

                <div className="md:col-span-2">
                    <label className="text-gray-700 font-medium">Área de Abrangência</label>
                    <input
                        type="text"
                        name="área"
                        value={data.área}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl 
                                   focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    />
                </div>

            </div>
        </div>
    );
};

export default Client_Form;
