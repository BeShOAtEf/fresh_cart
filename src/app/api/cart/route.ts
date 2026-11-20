import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = await getToken({ req })
    if (!token?.token)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const res = await fetch(`${process.env.API}/cart`, {
        cache: 'no-store',
        headers: {
            token: token.token
        }
    })
    const payload = await res.json()
    return NextResponse.json(payload, { status: res.status })
}
