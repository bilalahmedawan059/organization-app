// resources/js/Pages/Notes/NoteForm.tsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

export default function NoteForm({
    contactId,
    initial = {},
    submitUrl,
    method = 'post',
    onSuccess,
}: {
    contactId: number;
    initial?: any;
    submitUrl: string;
    method?: 'post' | 'put';
    onSuccess?: () => void;
}) {
    type NoteFormData = {
        body: string;
    };

    const form = useForm<NoteFormData>({
        body: initial.body ?? '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (method === 'post') {
            form.post(submitUrl, {
                preserveScroll: true,
                onSuccess: () => onSuccess?.(),
            });
        } else {
            form.put(submitUrl, {
                preserveScroll: true,
                onSuccess: () => onSuccess?.(),
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                placeholder="Write a note..."
                value={form.data.body}
                onChange={(e) => form.setData('body', e.target.value)}
            />
            {form.errors.body && (
                <div className="text-red-500 text-sm">{form.errors.body}</div>
            )}
            <div className="flex gap-2">
                <Button type="submit" disabled={form.processing}>
                    Save Note
                </Button>
            </div>
        </form>
    );
}
