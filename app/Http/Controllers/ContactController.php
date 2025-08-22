<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreContactRequest;
use Illuminate\Support\Facades\Log;
use App\Models\Contact;
use App\Models\Organization;
use Inertia\Inertia;

class ContactController extends Controller
{
    
    public function index(Request $r)
    {
        $org_id =  app(\App\Services\CurrentOrganization::class)->id();
        $org = Organization::where('id', $org_id)->first();
        
        $search = $r->string('q')->toString();
        $contacts = Contact::query()
        ->when($search, fn($q)=>$q
            ->whereRaw('CONCAT(first_name," ",last_name) LIKE ?', ["%{$search}%"])
            ->orWhere('email','LIKE',"%{$search}%")
        )
        ->select(['id','first_name','last_name','email','phone','avatar_path'])
        ->orderBy('last_name')->paginate(10)->withQueryString();

        return Inertia::render('Contacts/Index', ['contacts'=>$contacts,'q'=>$search , 'organization' => $org->name]);
    }

    public function create(){
        return Inertia::render('Contacts/Create');
    }
    public function store(StoreContactRequest $r)
    {
        
        $data = $r->validated();

        // Dedup (case-insensitive within current org) — EXACT 422 payload
        $exists = Contact::query()
            ->when($data['email'] ?? null, fn($q) =>
                $q->whereRaw('LOWER(email) = ?', [strtolower($data['email'])])
            )->exists();

        if (($data['email'] ?? null) && $exists) {
            Log::info('duplicate_contact_blocked', [
                'org_id' => app(\App\Services\CurrentOrganization::class)->id(),
                'email'  => $data['email'],
                'user_id'=> auth()->id(),
            ]);
            return response()->json([
                'code' => 'DUPLICATE_EMAIL',
                'existing_contact_id' => Contact::whereRaw('LOWER(email) = ?', [strtolower($data['email'])])->value('id'),
            ], 422);
        }

        if ($r->hasFile('avatar')) {
            $data['avatar_path'] = $r->file('avatar')->store('avatars','public');
        }

        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();

        $contact = Contact::create($data);
        return redirect()->route('contacts.index');
    }

    public function edit(Contact $contact)
    {
        return Inertia::render('Contacts/Edit', [
            'contact' => $contact,
        ]);
    }

    public function update(StoreContactRequest $r, Contact $contact)
    {
        $data = $r->validated();
        if ($r->hasFile('avatar')) {
            $data['avatar_path'] = $r->file('avatar')->store('avatars','public');
        }
        $data['updated_by'] = auth()->id();
        $contact->update($data);
        return back();
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return redirect()->route('contacts.index');
    }

    // Duplicate action
    public function duplicate(Contact $contact)
    {
        // dd(auth()->user()->name);
        $copy = $contact->replicate(['email','created_at','updated_at']);
        unset($copy->email_ci);

        $copy->email = $contact->email . '_copy_' . now()->timestamp;
        if ($contact->email && str_contains($contact->email, '@')) {
            [$username, $domain] = explode('@', $contact->email, 2);
            $copy->email = $username . '_copy_' . now()->timestamp . '@' . $domain;
        } else {
            // fallback if no valid email
            $copy->email = 'copy_' . now()->timestamp . '@example.com';
        }
        $copy->created_by = auth()->id();
        $copy->updated_by = auth()->id();
        $copy->save();

        // dd($copy);

        return redirect()->route('contacts.index');
    }

}
