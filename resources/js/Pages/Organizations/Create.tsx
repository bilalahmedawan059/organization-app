import React from "react";
import { useForm } from "@inertiajs/react";

export default function OrganizationCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        slug: "",
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route("orgs.store"));
    }

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Create Organization</h2>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border border-black rounded p-2"
                        required
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm">{errors.name}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">Slug</label>
                    <input
                        type="text"
                        value={data.slug}
                        onChange={(e) => setData("slug", e.target.value)}
                        className="w-full border border-black rounded p-2"
                        required
                    />
                    {errors.slug && (
                        <div className="text-red-500 text-sm">{errors.slug}</div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    {processing ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
}
