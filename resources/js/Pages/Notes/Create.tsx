import React from "react";
import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function NotesCreate({
    contactId,
}: any) {
    type NoteFormData = {
        body: string;
    };

    const form = useForm<NoteFormData>({
        body: "",
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route("contacts.notes.store", { contact: contactId }), {
            preserveScroll: true,
            onSuccess: () => {
                alert("Note saved!");
            },
            onError: (errors) => {
                alert(errors);
            },
        });
    }

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Create Note</h2>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Body</label>
                    <input
                        type="text"
                        value={form.data.body}
                        onChange={(e) => form.setData("body", e.target.value)}
                        className="w-full border border-black rounded p-2"
                        required
                    />
                    {form.errors.body && (
                        <div className="text-red-500 text-sm">{form.errors.body}</div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={form.processing}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    {form.processing ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
}
