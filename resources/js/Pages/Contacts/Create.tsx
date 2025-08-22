import React from 'react';
import ContactForm from './ContactForm';
import { router } from '@inertiajs/react';

export default function CreateContact() {
    return (
        <div>
            <h1 className="text-xl mb-4">Create Contact</h1>
            <ContactForm
                submitUrl={route('contacts.store')}
                onSuccess={() => { router.visit(route('contacts.index')); }}
            />
        </div>
    );
}
