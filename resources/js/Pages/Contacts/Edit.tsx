import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

type ContactFormData = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    avatar: File | null;
};

export default function EditContact({ contact }: any) {
    const form = useForm<ContactFormData>({
        first_name: contact.first_name ?? "",
        last_name: contact.last_name ?? "",
        email: contact.email ?? "",
        phone: contact.phone ?? "",
        avatar: null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.put(route("contacts.update", contact.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                // optional: redirect or flash message
            },
        });
    }


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, type, value, files } = e.target;

        if (name === "avatar") {
            form.setData("avatar", files?.[0] ?? null);
        } else {
            form.setData(name as keyof ContactFormData, value);
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>

            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-4"
            >
                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="first_name"
                        type="text"
                        value={form.data.first_name}
                        onChange={handleChange}
                        placeholder="First name"
                        className="border border-black rounded p-2"
                    />
                    <input
                        name="last_name"
                        type="text"
                        value={form.data.last_name}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="border border-black rounded p-2"
                    />
                </div>

                <input
                    name="email"
                    type="email"
                    value={form.data.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border border-black rounded p-2 w-full"
                />

                <input
                    name="phone"
                    type="text"
                    value={form.data.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="border border-black rounded p-2 w-full"
                />

                <input
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full"
                />

                <Button type="submit" disabled={form.processing}>
                    {form.processing ? "Updating..." : "Update"}
                </Button>
            </form>
        </div>
    );
}
