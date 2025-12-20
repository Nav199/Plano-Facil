<?php

namespace App\Service;

use Illuminate\Support\Facades\Http;

class CepService
{
    public function buscar(string $cep): ?array
    {
        $cep = preg_replace('/\D/', '', $cep);

        if (strlen($cep) !== 8) {
            return null;
        }

        $response = Http::get("https://brasilapi.com.br/api/cep/v1/{$cep}");

        if ($response->failed()) {
            return null;
        }

        return [
            'rua'    => $response['street'] ?? '',
            'cidade' => $response['city'] ?? '',
            'estado' => $response['state'] ?? '',
            'bairro' => $response['neighborhood'] ?? '',
        ];
    }
}
