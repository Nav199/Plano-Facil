<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enquadramento extends Model
{
    use HasFactory;
    protected $table = 'enquadramento';

    protected $fillable = [
        'id', 'id_forma','tipo'
    ]; 
}
