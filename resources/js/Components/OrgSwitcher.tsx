// resources/js/Components/OrgSwitcher.tsx
import React from 'react';
import { router } from '@inertiajs/react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/Components/ui/select';

export default function OrgSwitcher({ organizations, currentOrgId }: {
    organizations: { id: number; name: string }[];
    currentOrgId: number | null;
}) {
    return (
        <div className="flex items-center">
            <form onSubmit={(e) => e.preventDefault()}>
                <Select
                    defaultValue={currentOrgId?.toString() ?? undefined}
                    onValueChange={(val) => {
                        router.post('/orgs/switch', { organization_id: Number(val) });
                    }}
                >
                    <SelectTrigger className="border border-black rounded p-2 w-48">
                        <SelectValue placeholder="Switch org" />
                    </SelectTrigger>
                    <SelectContent className="border border-black">
                        {organizations.map(o => (
                            <SelectItem key={o.id} value={String(o.id)}>{o.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </form>
        </div>
    );
}
