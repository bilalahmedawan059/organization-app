import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import NoteList from './NoteList';
import MetaEditor from './MetaEditor';

export default function ContactShow() {
    const props = usePage().props as any;
    const contact = props.contact;
    const [duplicateMsg, setDuplicateMsg] = useState(false);

    useEffect(() => {
        const qp = new URLSearchParams(window.location.search);
        if (qp.get('duplicate') === '1') setDuplicateMsg(true);
    }, []);

    return (
        <div>
            {duplicateMsg && <div className="p-2 mb-4 bg-black text-white">Duplicate detected. No new contact was created.</div>}
            <div className="flex gap-6">
                <div className="w-48">
                    {contact.avatar_path ? <img src={`/storage/${contact.avatar_path}`} className="w-48 h-48 object-cover grayscale" /> : <div className="w-48 h-48 border border-black flex items-center justify-center">No Avatar</div>}
                </div>
                <div>
                    <h1 className="text-xl">{contact.first_name} {contact.last_name}</h1>
                    <p>{contact.email}</p>
                    <p>{contact.phone}</p>
                    <div className="mt-3 flex gap-2">
                        <a href={route('contacts.edit', contact.id)} className="border border-black p-2">Edit</a>
                        <form method="post" action={route('contacts.duplicate', contact.id)}>
                            <input type="hidden" name="_token" value={props.csrfToken} />
                            <button type="submit" className="border border-black p-2">Duplicate</button>
                        </form>
                    </div>
                </div>
            </div>

            <section className="mt-8">
                <NoteList notes={contact.notes} contactId={contact.id} currentUserId={props.auth.user.id} />
            </section>

            <section className="mt-6">
                <MetaEditor meta={contact.meta} contactId={contact.id} />
            </section>
        </div>
    );
}
