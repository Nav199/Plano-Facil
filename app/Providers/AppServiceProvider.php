<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Registre os serviços no contêiner.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Configura qualquer coisa após todos os serviços serem registrados.
     *
     * @return void
     */
    public function boot()
    {
        // Adicionar a validação customizada para CPF
        Validator::extend('cpf', function ($attribute, $value, $parameters, $validator) {
            return \App\Service\SociosValidationService::isValidCpf($value);
        });
    }
}
