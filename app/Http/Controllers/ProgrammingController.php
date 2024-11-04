<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProgrammingController extends Controller
{
    public function index()
    {
        return view('programming.dashboard'); 
    }
}
