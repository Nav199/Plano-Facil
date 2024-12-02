<?php

namespace App\Http\Controllers;

use App\Service\ServiceGemini;
use Illuminate\Http\Request;

class SWOTAnalysisController extends Controller
{
    protected $geminiService;

    public function __construct(ServiceGemini $geminiService)
    {
        $this->geminiService = $geminiService;
    }

    /**
     * Faz a análise SWOT do plano de negócio.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function analyze(Request $request)
    {
        $validated = $request->validate([
            'plano_dados' => 'required|array',
            'prompt' => 'required|string',
        ]);

        try {
            $result = $this->geminiService->analyze($validated['plano_dados'], $validated['prompt']);
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
