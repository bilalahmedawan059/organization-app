import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function NoteList({ notes, contactId, currentUserId }: any) {
    const [body, setBody] = useState('');

    async function createNote(e: React.FormEvent) {
        e.preventDefault();
        router.post(route('contacts.notes.store', contactId), { body }, {
            onSuccess: () => setBody('')
        });
    }

    function deleteNote(noteId: number) {
        router.delete(route('contacts.notes.destroy', [contactId, noteId]));
    }

    return (
        <div>
            <h3 className="text-lg mb-2">Notes</h3>
            <form onSubmit={createNote} className="mb-4">
                <textarea value={body} onChange={e => setBody(e.target.value)} className="w-full border border-black p-2" />
                <div className="mt-2"><button className="border border-black p-2" type="submit">Add Note</button></div>
            </form>

            <div className="space-y-3">
                {notes.map((n: any) => (
                    <div key={n.id} className="border border-black p-2">
                        <div className="text-sm text-black">{n.body}</div>
                        <div className="text-xs text-black mt-2">By: {n.user.name}</div>
                        {n.user_id === currentUserId && (
                            <div className="mt-2 flex gap-2">
                                {/* edit and delete actions: implement edit UI as you need (inline or modal) */}
                                <button className="border border-black p-1" onClick={() => deleteNote(n.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
