<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\Organization;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminRole = Role::findOrCreate('Admin');
        $memberRole = Role::findOrCreate('Member');

        $user = User::factory()->create([
            'name' => 'Demo User',
            'email' => 'demo@example.com',
            'password' => bcrypt('password'),
        ]);


        // First organization
        $org = Organization::create([
            'name' => 'Acme',
            'slug' => 'acme',
            'owner_user_id' => $user->id,
        ]);

        $org->users()->attach($user->id, ['role' => 'Admin']);

        // Set Spatie's team context before assigning the role
        setPermissionsTeamId($org->id);
        $user->assignRole($adminRole);

        // Second organization
        $org2 = Organization::create([
            'name' => 'Beta',
            'slug' => 'beta',
            'owner_user_id' => $user->id,
        ]);

        $org2->users()->attach($user->id, ['role' => 'Admin']);

        setPermissionsTeamId($org2->id);
        $user->assignRole($adminRole);
    }
}
