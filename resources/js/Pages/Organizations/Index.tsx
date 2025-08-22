import React from 'react';
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { useForm } from '@inertiajs/react';


export default function OrganizationsIndex({
    orgs,
    currentOrgId,
}: any) {

    const { post } = useForm();
    const form = useForm({ organization_id: null as number | null });

    function switchOrg(id: number) {
        form.setData("organization_id", id);
        form.post(route('orgs.switch'));
    }
    return (
        <div>

            {orgs.map((org: any) => (
                <button
                    key={org.id}
                    onClick={() => switchOrg(org.id)}
                    disabled={org.id === currentOrgId}
                    className="px-3 py-1 rounded bg-blue-500 text-white m-1"
                >
                    {org.name}
                </button>
            ))}


            <div className="flex justify-between items-center mb-4">
                <Link href={route("orgs.create")}>
                    <Button>Create Organization</Button>
                </Link>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-black">
                        <th className="text-left p-2">Organization Name</th>
                        <th className="text-left p-2">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {orgs?.length ? (
                        orgs.map((org: any) => (
                            <tr key={org.id} className="border-b border-black">
                                <td className="p-2">{org.name}</td>
                                <td className="p-2">
                                    <Button
                                        onClick={() => switchOrg(org.id)}>Create Organization
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="p-2 text-center">
                                No organization found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-4">{/* render pagination here */}</div>
        </div>
    );
}
