<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Organization;

class OrganizationPolicy
{
   /**
     * Only Admins can create organizations
     */
    public function create(User $user)
    {
        return $user->hasRole('Admin');
    }

    /**
     * Only Admins can store organizations
     */
    public function store(User $user)
    {
        return $user->hasRole('Admin');
    }
}
