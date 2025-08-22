<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('avatar_path')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->nullable()->constrained('users');
            $table->timestamps();
        });

          // MySQL: generated column for CI uniqueness
        if (DB::getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE contacts ADD COLUMN email_ci VARCHAR(255) GENERATED ALWAYS AS (LOWER(email)) STORED");
            DB::statement("CREATE UNIQUE INDEX contacts_org_email_unique ON contacts(organization_id, email_ci)");
        } else {
            // SQLite: functional unique index
            DB::statement("CREATE UNIQUE INDEX contacts_org_email_unique ON contacts(organization_id, lower(email))");
        }
    }

  

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
