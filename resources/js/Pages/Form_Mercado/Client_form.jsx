import React from 'react'

const Client_form = () => {
  return (
    <div className="p-4 bg-gray-100 rounded shadow mb-4">
    <h2 className="text-lg font-semibold mb-2">Estudo do Cliente</h2>
    <div className="grid grid-cols-2 gap-4">
        <div>
            <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">Público Alvo</label>
            <input type="text" name='publico' id="targetAudience" className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
            <label htmlFor="customerBehavior" className="block text-sm font-medium text-gray-700">Comportamento dos Clientes</label>
            <textarea name='comportamento' id="customerBehavior" className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <div>
            <label htmlFor="coverageArea" className="block text-sm font-medium text-gray-700">Área de Abrangência</label>
            <input type="text" name='área' id="coverageArea" className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
    </div>
    </div>
  )
}

export default Client_form