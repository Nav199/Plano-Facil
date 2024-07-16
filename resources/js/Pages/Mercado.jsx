import React from 'react'
import Client_form from './Form_Mercado/Client_form'
import Concorrente_form from './Form_Mercado/Concorrente_form'
import Fornecedor_form from './Form_Mercado/Fornecedor_form'

const Mercado = () => {
  return (
    <div className='container mx-auto p-4'>
        <Client_form/>
        <Concorrente_form/>
        <Fornecedor_form/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Enviar</button>
    </div>
  )
}

export default Mercado