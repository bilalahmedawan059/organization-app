<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Models\Contact;
use App\Models\ContactNote;
use App\Policies\ContactPolicy;
use App\Policies\ContactNotePolicy;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        Contact::class     => ContactPolicy::class,
        ContactNote::class => ContactNotePolicy::class,
    ];
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
