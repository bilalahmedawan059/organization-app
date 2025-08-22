<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Organization extends Model
{
     use HasRoles;
     protected $fillable = ['name','slug','owner_user_id'];

    public function users() {
         return $this->belongsToMany(User::class)->withPivot('role')->withTimestamps(); 
    }
    
    public function contacts() {
         return $this->hasMany(Contact::class); 
    }
}
