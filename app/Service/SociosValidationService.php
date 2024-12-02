<?php

namespace App\Service;

class SociosValidationService
{
    /**
     * Validar o CPF de um sócio.
     *
     * @param string $cpf
     * @return string
     */
    public static function isValidCpf($cpf)
    {
       
        $cpf = preg_replace('/\D/', '', $cpf);

     
        if (strlen($cpf) != 11) {
            return 'O CPF deve ter 11 dígitos.';
        }

       
        if (preg_match('/(\d)\1{10}/', $cpf)) {
            return 'O CPF informado é um número sequencial inválido.';
        }
  
        $sum = 0;
        for ($i = 0; $i < 9; $i++) {
            $sum += $cpf[$i] * (10 - $i);
        }
        $firstCheckDigit = 11 - ($sum % 11);
        if ($firstCheckDigit >= 10) {
            $firstCheckDigit = 0;
        }

       
        $sum = 0;
        for ($i = 0; $i < 10; $i++) {
            $sum += $cpf[$i] * (11 - $i);
        }
        $secondCheckDigit = 11 - ($sum % 11);
        if ($secondCheckDigit >= 10) {
            $secondCheckDigit = 0;
        }


        if ($cpf[9] != $firstCheckDigit || $cpf[10] != $secondCheckDigit) {
            return 'O CPF informado é inválido.';
        }

        return 'CPF válido.';
    }
}


