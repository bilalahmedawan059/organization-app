<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organization;
use App\Services\CurrentOrganization;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index(){
        $orgs = Organization::where('owner_user_id', auth()->id())->get();
        $currentOrganization =  app(CurrentOrganization::class)->get()?->id;
        
        return Inertia::render('Organizations/Index', [
            'orgs' => $orgs,
            'currentOrgId' => app(\App\Services\CurrentOrganization::class)->get()?->id,
        ]);
    }

    public function create()
    {
        return Inertia::render('Organizations/Create');
    }

    public function store(Request $r, CurrentOrganization $co)
    {
        $data = $r->validate([
            'name' => ['required','string','max:255'],
            'slug' => ['required','alpha_dash','max:255','unique:organizations,slug'],
        ]);
        $org = Organization::create($data + ['owner_user_id'=>auth()->id()]);
        $org->users()->attach(auth()->id(), ['role'=>'Admin']);
        auth()->user()->assignRole('Admin', $org);
        $co->set($org);
        return back();
    }

    public function switch(Request $r, CurrentOrganization $co)
    {
        $r->validate(['organization_id'=>['required','exists:organizations,id']]);
        $org = auth()->user()->organizations()->findOrFail($r->organization_id);
        $co->set($org);
        return redirect('/');
    }
}
