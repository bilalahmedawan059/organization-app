<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Contact;

class ContactPolicy
{
    
    public function viewAny(User $u): bool   { return true; }
    public function view(User $u, Contact $c): bool { return true; }

    // Option A: role-based
    public function create(User $u): bool { 
        return $u->hasRole('Admin'); 
    }
    public function update(User $u, Contact $c): bool { return $u->hasRole('Admin'); }
    public function delete(User $u, Contact $c): bool { return $u->hasRole('Admin'); }

}
