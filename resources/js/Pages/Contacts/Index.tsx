import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/core";
import { Button } from "@/Components/ui/button";

export default function ContactsIndex({ contacts, q, organization }: any) {
    type SearchForm = { q: string };

    const form = useForm<SearchForm>({
        q: q ?? "",
    });

    function search(e: React.FormEvent) {
        e.preventDefault();
        router.get(route("contacts.index"), { q: form.data.q }, { preserveScroll: true });
    }

    const handleDuplicate = (contactId: number) => {
        // You can send data along with the POST request if needed
        router.post(route('contacts.duplicate', contactId));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <form onSubmit={search} className="flex gap-2">
                    <input
                        value={form.data.q}
                        onChange={(e) => form.setData("q", e.target.value)}
                        placeholder="Search name or email"
                        className="border border-black p-2"
                    />
                    <Button type="submit">Search</Button>
                </form>
                <div className="flex items-center gap-4">
                    <h5 className="text-lg font-semibold">
                        Organization: {organization}
                    </h5>
                    <div>
                        <Link href={route("contacts.create")}>
                            <Button>Create Contact</Button>
                        </Link>
                    </div>
                    <div>
                        <Link href={route('org.index')}>
                            <Button>Organizations</Button>
                        </Link>
                    </div>

                </div>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-black">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Phone</th>
                        <th className="text-left p-2">Avatar</th>
                        <th className="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.data.map((c: any) => (
                        <tr key={c.id} className="border-b border-black">
                            <td className="p-2">
                                <Link href={route("contacts.show", c.id)}>
                                    {c.first_name} {c.last_name}
                                </Link>
                            </td>
                            <td className="p-2">{c.email}</td>
                            <td className="p-2">{c.phone}</td>
                            <td className="p-2">
                                {c.avatar_path ? (
                                    <img
                                        src={`/storage/${c.avatar_path}`}
                                        alt=""
                                        className="w-10 h-10 object-cover grayscale"
                                    />
                                ) : (
                                    "—"
                                )}
                            </td>
                            <td className="p-2 d-flex">
                                <div className="mb-3">
                                    <Link href={route("notes.create", c.id)}>
                                        <Button>Create note</Button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href={route("notes.index", c.id)}>
                                        <Button>View note</Button>
                                    </Link>
                                </div>
                                <div>
                                    <Button onClick={() => handleDuplicate(c.id)}>Duplicate</Button>
                                </div>
                                <div>
                                    <Link
                                        href={route("contacts.destroy", c.id)}
                                        method="delete"
                                        as="button"
                                    >
                                        <Button>Delete</Button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >

            <div className="mt-4">{/* render pagination here */}</div>
        </div >
    );
}
