<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ContactNoteController;
use App\Http\Controllers\ContactMetaController;
use App\Http\Controllers\OrganizationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


Route::get('/healthz', fn () => response()->json(['ok' => true]));


Route::middleware(['auth','verified'])->group(function () {
  Route::get('/', fn() => redirect()->route('contacts.index'));

  Route::resource('contacts', ContactController::class);
  Route::post('/contacts/{contact}/duplicate', [ContactController::class,'duplicate'])->name('contacts.duplicate');

  Route::get('/contacts/{contact}/notes', [ContactNoteController::class, 'index'])->name('notes.index');
  Route::get('/contacts/{contact}/notes/create', [ContactNoteController::class, 'create'])->name('notes.create');
  Route::post('/contacts/{contact}/notes', [ContactNoteController::class,'store'])->name('contacts.notes.store');
  Route::put('/contacts/{contact}/notes/{note}', [ContactNoteController::class,'update'])->name('contacts.notes.update');
  Route::delete('/contacts/{contact}/notes/{note}', [ContactNoteController::class,'destroy'])->name('contacts.notes.destroy');

  Route::post('/contacts/{contact}/meta', [ContactMetaController::class,'store'])->name('contacts.meta.store');

  Route::get('/orgs', [OrganizationController::class, 'index'])->name('org.index');
  Route::post('/orgs', [OrganizationController::class,'store'])->name('orgs.store')->can('store', App\Models\Organization::class);
  Route::get('/orgs/create', [OrganizationController::class,'create'])->name('orgs.create')->can('create', App\Models\Organization::class);;
  Route::post('/orgs/switch', [OrganizationController::class,'switch'])->name('orgs.switch');
});
