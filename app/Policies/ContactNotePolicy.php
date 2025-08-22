<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ContactNote;

class ContactNotePolicy
{
     // Anyone in the org (Admin/Member) can create a note:
    public function create(User $u): bool
    {
        // If using permissions:
        // return $u->can('notes.create');
        // Or just:
        return $u->hasAnyRole(['Admin', 'Member']);
    }

    // Only the author can change it:
    public function update(User $u, ContactNote $n): bool
    {
        return $u->id === $n->user_id;
    }

    public function delete(User $u, ContactNote $n): bool
    {
        return $u->id === $n->user_id;
    }
}
