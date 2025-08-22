// resources/js/Layouts/AppLayout.tsx
import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import OrgSwitcher from '@/Components/OrgSwitcher';
import { Button } from '@/Components/ui/button';

export const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const props = usePage().props as any;
    const organizations = props?.current_org?.organizations ?? [];
    const currentOrgId = props?.current_org?.id ?? null;

    return (
        <div className="min-h-screen bg-white text-black">
            <header className="border-b border-black p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-lg font-medium">App</Link>
                    <OrgSwitcher organizations={organizations} currentOrgId={currentOrgId} />
                </div>
                <div>
                    <Button asChild>
                        <a href="/logout" onClick={(e) => { e.preventDefault(); /* form post logout */ }}>Logout</a>
                    </Button>
                </div>
            </header>

            <main className="p-6">
                {children}
            </main>
        </div>
    );
};

export default App;
