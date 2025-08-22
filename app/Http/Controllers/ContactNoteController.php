<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Contact;
use App\Models\ContactNote;
use Inertia\Inertia;

class ContactNoteController extends Controller
{
    use AuthorizesRequests;
    public function index(Contact $contact)
    {
        $notes = $contact->notes()
           ->where('user_id', auth()->id()) 
           ->latest()
           ->get();

        return Inertia::render('Notes/Index', [
            'contactName' => $contact->first_name,
            'contactId' => $contact->id,
            'notes' => $notes,
        ]);
    }
    public function create(Contact $contact){
         return Inertia::render('Notes/Create', [
            'contactId' => $contact->id,
        ]);
    }

    public function store(Request $r, Contact $contact)
    {
        // dd($r->all())`;
        // $this->authorize('view',$contact);
        // $this->authorize('create', ContactNote::class);
          $this->authorize('create', [ContactNote::class, $contact]);
        $data = $r->validate(['body'=>['required','string','max:10000']]);
        $note = $contact->notes()->create(['user_id'=>auth()->id(),'body'=>$data['body']]);
        return back();
    }

    public function update(Request $r, Contact $contact, ContactNote $note)
    {
        abort_unless($note->contact_id === $contact->id, 404);
        $this->authorize('update',$note);
        $data = $r->validate(['body'=>['required','string','max:10000']]);
        $note->update($data);
        return back();
    }

    public function destroy(Contact $contact, ContactNote $note)
    {
        abort_unless($note->contact_id === $contact->id, 404);
        $this->authorize('delete',$note);
        $note->delete();
        return back();
    }

}
