<?php
namespace App\Service;

class CnaeService
{
    public function getCnaeData()
    {
        // Definindo os dados como um array
     return [
            [
                "CNAE" => 3250706,
                "Descrição" => "Serviços de prótese dentária",
                "Fator R" => "Sim",
                "Alíquota" => 15.5
            ],
            [
                "CNAE" => 3250706,
                "Descrição" => "Serviços de prótese dentária",
                "Fator R" => "Sim",
                "Alíquota" => 6
            ],
            [
                "CNAE" => 3250709,
                "Descrição" => "Serviço de laboratório óptico",
                "Fator R" => "Sim",
                "Alíquota" => 15.5
            ],
            [
                "CNAE" => 3250709,
                "Descrição" => "Serviço de laboratório óptico",
                "Fator R" => "Sim",
                "Alíquota" => 6
            ],
            [
                "CNAE" => 4399101,
                "Descrição" => "Administração de obras",
                "Fator R" => "Não",
                "Alíquota" => 6
            ],
            [
                "CNAE" => 4512901,
                "Descrição" => "Representantes comerciais e agentes do comércio de veículos automotores",
                "Fator R" => "Sim",
                "Alíquota" => 15.5
            ],
            [
                "CNAE" => 4530702,
                "Descrição" => "Comércio por atacado de pneumáticos e câmaras-de-ar",
                "Fator R" => "Não",
                "Alíquota" => 4
            ],
        ];
    
    }
}
