<?php

namespace App\Http\Controllers\CRM;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CustomerProfileController extends Controller
{
    public function index(Request $request)
    {
        $page = (int)($request->query('page', 1));
        $search = $request->query('search');
        return response()->json([
            'customer' => [
                'data' => [
                    [ 'id' => 1, 'name' => 'Acme Corp', 'search' => $search ],
                ],
                'current_page' => $page,
                'last_page' => 1,
            ],
        ]);
    }
}



