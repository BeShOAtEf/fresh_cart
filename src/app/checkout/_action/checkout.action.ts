'use server'
import { getTokenAuth } from "@/utilitis/getTokenAuth";

type shippingAddressType = {
    details: string;
    phone: string;
    city: string;
}

export async function checkoutOnline(cartId: string, shippingAddress: shippingAddressType) {
    const token = await getTokenAuth()
    if (!token) {
        return { status: "error", message: "Please login first" }
    }
    const apiUrl = process.env.API || "https://ecommerce.routemisr.com/api/v1";
    const currentUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const res = await fetch(`${apiUrl}/orders/checkout-session/${cartId}?url=${encodeURIComponent(currentUrl)}`, {
        method: 'POST',
        body: JSON.stringify({ shippingAddress }),
        headers: {
            token,
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}
