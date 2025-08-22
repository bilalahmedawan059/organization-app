import React, { useState } from 'react';
import { router } from '@inertiajs/react';

type MetaItem = {
    key: string;
    value: string;
};

type MetaEditorProps = {
    meta?: MetaItem[];
    contactId: number | string;
};

export default function MetaEditor({ meta = [], contactId }: MetaEditorProps) {
    const [items, setItems] = useState<MetaItem[]>(
        meta.length ? meta.map(m => ({ key: m.key, value: m.value })) : [{ key: '', value: '' }]
    );

    function addItem() {
        if (items.length >= 5) return;
        setItems([...items, { key: '', value: '' }]);
    }

    function removeItem(i: number) {
        setItems(items.filter((_, idx) => idx !== i));
    }

    function setItem(i: number, field: keyof MetaItem, value: string) {
        const copy = [...items];
        copy[i][field] = value;
        setItems(copy);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        router.post(route('contacts.meta.store', contactId), { items });
    }

    return (
        <form onSubmit={submit} className="space-y-3">
            <h3 className="text-lg">Custom fields</h3>
            {items.map((it, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                    <input
                        value={it.key}
                        onChange={e => setItem(idx, 'key', e.target.value)}
                        placeholder="Key"
                        className="border border-black p-1"
                    />
                    <input
                        value={it.value}
                        onChange={e => setItem(idx, 'value', e.target.value)}
                        placeholder="Value"
                        className="border border-black p-1"
                    />
                    <button type="button" onClick={() => removeItem(idx)} className="border border-black p-1">
                        Remove
                    </button>
                </div>
            ))}

            <div className="flex gap-2">
                <button type="button" onClick={addItem} className="border border-black p-2">
                    Add
                </button>
                <button type="submit" className="border border-black p-2">
                    Save
                </button>
            </div>
            <div className="text-xs text-black">Max 5 fields</div>
        </form>
    );
}
