import React from 'react'

const Fornecedor_form = () => {
  return (
    <div className="p-4 bg-gray-100 rounded shadow mb-4">
            <h2 className="text-lg font-semibold mb-2">Estudo dos Concorrentes</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="quality" className="block text-sm font-medium text-gray-700">Qualidade</label>
                    <input type="text" id="quality" className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
                    <input type="text" id="price" className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="paymentConditions" className="block text-sm font-medium text-gray-700">Condições de Pagamento</label>
                    <input type="text" id="paymentConditions" className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Localização</label>
                    <input type="text" id="location" className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="customerService" className="block text-sm font-medium text-gray-700">Atendimento</label>
                    <input type="text" id="customerService" className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
            </div>
        </div>
  )
}

export default Fornecedor_form