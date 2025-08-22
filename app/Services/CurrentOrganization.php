<?php

namespace App\Services;

use App\Models\Organization;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class CurrentOrganization
{
    private ?Organization $org = null;

    public function set(Organization $org): void
    {
        $this->org = $org;
        Session::put('current_org_id', $org->id);
    }

    public function get(): ?Organization
    {
        if ($this->org) return $this->org;

        $id = Session::get('current_org_id');
        if ($id) return $this->org = Organization::find($id);

        // Fallback: user’s first org
        $user = Auth::user();
        if (!$user) return null;
        $first = $user->organizations()->first();
        if ($first) $this->set($first);
        return $this->org;
    }

    public function id(): ?int
    {
        return optional($this->get())->id;
    }
}
