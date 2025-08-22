import React from 'react';
import NoteForm from './NoteForm';
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";


// interface Note {
//     id: number;
//     body: string;
//     created_at: string;
// }

export default function NotesIndex({
    contactName,
    contactId,
    notes,
}: any) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1><strong>Contact Name: </strong>{contactName}</h1>
                <Link href={route("notes.create", contactId)}>
                    <Button>Create notes</Button>
                </Link>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-black">
                        <th className="text-left p-2">Contact Name</th>
                        <th className="text-left p-2">Note Body</th>
                        <th className="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notes?.length ? (
                        notes.map((note: any) => (
                            <tr key={note.id} className="border-b border-black">
                                <td className="p-2">{contactName}</td>
                                <td className="p-2">{note.body}</td>
                                <td className="p-2">

                                    <div>
                                        <Link
                                            href={route("contacts.notes.destroy", [contactId, note.id])}
                                            method="delete"
                                            as="button"
                                        >
                                            <Button>Delete</Button>
                                        </Link>
                                    </div>
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="p-2 text-center">
                                No notes found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-4">{/* render pagination here */}</div>
        </div>
    );
}
