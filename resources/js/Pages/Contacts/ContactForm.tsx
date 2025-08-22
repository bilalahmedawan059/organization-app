import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

export default function ContactForm({ initial = {}, submitUrl, method = 'post', onSuccess }: {
    initial?: any,
    submitUrl: string,
    method?: 'post' | 'put',
    onSuccess?: () => void
}) {

    type ContactFormData = {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        avatar: File | null;
    };

    const form = useForm<ContactFormData>({
        first_name: initial.first_name ?? '',
        last_name: initial.last_name ?? '',
        email: initial.email ?? '',
        phone: initial.phone ?? '',
        avatar: null,
    });

    // const form = useForm({
    //     first_name: initial.first_name ?? '',
    //     last_name: initial.last_name ?? '',
    //     email: initial.email ?? '',
    //     phone: initial.phone ?? '',
    //     avatar: null as File | null,
    // });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post(submitUrl, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => onSuccess?.(),
        })
        // .catch((err: any) => {
        //     // allow parent to handle DUPLICATE_EMAIL scenario if they want
        //     throw err;
        // });
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First name" value={form.data.first_name} onChange={e => form.setData('first_name', e.target.value)} />
                <Input placeholder="Last name" value={form.data.last_name} onChange={e => form.setData('last_name', e.target.value)} />
            </div>
            <Input placeholder="Email" value={form.data.email} onChange={e => form.setData('email', e.target.value)} />
            <Input placeholder="Phone" value={form.data.phone} onChange={e => form.setData('phone', e.target.value)} />
            <input type="file" accept="image/*" onChange={e => form.setData('avatar', e.target.files?.[0] ?? null)} />
            <div className="flex gap-2">
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
