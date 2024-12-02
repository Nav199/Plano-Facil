<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class EnderecoSocios extends Model
{
    use HasFactory;
    protected $table = 'enderecos';


    protected $fillable = [
       'rua','numero','cidade','estado'
    ];

    public function socios()
    {
        return $this->hasMany(Socios::class);
    }
    
}
