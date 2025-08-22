<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Concerns\BelongsToOrganization;

class Contact extends Model
{
     use BelongsToOrganization;

    protected $fillable = [
      'organization_id','first_name','last_name','email','phone','avatar_path','created_by','updated_by'
    ];

    public function notes() {
         return $this->hasMany(ContactNote::class); 
    }

    public function meta() {
         return $this->hasMany(ContactMeta::class); 
    }

    public function creator() {
         return $this->belongsTo(User::class, 'created_by'); 
    }
    
    public function updater() {
         return $this->belongsTo(User::class, 'updated_by'); 
    }

    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }
}
