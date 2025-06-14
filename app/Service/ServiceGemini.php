<?php

namespace App\Service;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ServiceGemini
{
    private $apiKey;
    private $baseUrl;

    public function __construct()
    {
        // Defina sua chave API aqui ou no .env
        $this->apiKey = 'AIzaSyD7G5JPMzR_npTPMNrbVU9_8xh3T5irU4c'; 
        $this->baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    }

    /**
     * Envia a requisição para a API Gemini e retorna a resposta.
     */
    public function analyze(array $dados, string $prompt)
    {

        $payload = [
            'contents' => [
                [
                    'parts' => [
                        [
                            'text' => $prompt . ' ' . json_encode($dados),
                        ],
                    ],
                ],
            ], 
        ];

        // Envia a solicitação para a API Gemini
        $response = Http::withoutVerifying()
                    ->withHeaders([
                        'Content-Type' => 'application/json',
                    ])
                    ->post("{$this->baseUrl}?key={$this->apiKey}", $payload);


        // Log da resposta para debug
        Log::info('Resposta da API Gemini', ['response' => $response->body()]);

        // Se a resposta for bem-sucedida, retorne os dados
        if ($response->successful()) {
            return $response->json();
        }

        // Caso contrário, retorne um erro
        return [
            'error' => true,
            'message' => $response->body(),
        ];
    }
}
