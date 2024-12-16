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
        $this->apiKey = 'AIzaSyByHd6XfIDj3mziNkV_jrPgPgVTQ3v7_MU'; 
        $this->baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
    }

    /**
     * Envia a requisição para a API Gemini e retorna a resposta.
     */
    public function analyze(array $dados, string $prompt)
    {
        // Construa o payload com o prompt e os dados
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
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("{$this->baseUrl}?key={$this->apiKey}", $payload);

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
