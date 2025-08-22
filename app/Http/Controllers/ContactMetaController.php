<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactMetaController extends Controller
{
        // app/Http/Controllers/ContactMetaController.php
    public function store(Request $r, Contact $contact)
    {
        $this->authorize('update',$contact); // Admin only
        $pairs = $r->validate([
            'items' => ['array','max:5'],
            'items.*.key' => ['required','string','max:50'],
            'items.*.value' => ['required','string','max:255'],
        ])['items'] ?? [];

        $contact->meta()->delete();
        foreach ($pairs as $p) $contact->meta()->create($p);
        return back();
    }

}
