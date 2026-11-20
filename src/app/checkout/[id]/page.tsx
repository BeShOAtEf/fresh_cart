
import React from 'react'
import CheckOut from '../_components/CheckOut';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return (
        <div>
            <CheckOut cartId={resolvedParams?.id} />
        </div>
    )
}