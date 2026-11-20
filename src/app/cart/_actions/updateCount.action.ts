"use server"
import { getTokenAuth } from "@/utilitis/getTokenAuth";

export async function updateCount(productId: string, count: number) {
    const token = await getTokenAuth()
    if (!token) {
        throw new Error('Unauthorized! login first')
    }
    const res = await fetch(`${process.env.API}/cart/${productId}`, {
        cache: 'no-store',
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            token: token
        },
        body: JSON.stringify({ count })
    })
    const payload = await res.json();
    return payload
}
