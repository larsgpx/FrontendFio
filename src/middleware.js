import { NextResponse, NextRequest } from "next/server";

export default function middleware(req) {
    const verify = req.cookies.get('loggedIn');
    const score = req.cookies.get('score');
    const url = req.url;
    if (verify && url.includes('/login')) {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_MIDDLEWARE_BASEURL + '/mi-cuenta')
    }

    if (!verify && url.includes('/mi-cuenta')) {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_MIDDLEWARE_BASEURL + '/login')
    }

    if (!score && url.includes('form-registro')) {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_MIDDLEWARE_BASEURL)
    }
}