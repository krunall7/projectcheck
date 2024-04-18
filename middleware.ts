import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
    const session = request.cookies.get("session");

    //Return to /login if don't have a session
    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    //Call the authentication endpoint
    const responseAPI = await fetch(`${request.nextUrl.origin}/api/login`, {
        headers: {
            Cookie: `session=${session?.value}`,
        },
    });

    //Return to /login if token is not authorized
    if (responseAPI.status !== 200) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // if the user is authorized, and try to access the login page, redirect to home
    console.log(request.nextUrl.pathname);
    if (request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

//Add your protected routes
export const config = {
    matcher: [
        "/",
        "/profile",
        "/settings",
        "/projects",
        "/tasks",
    ],
};