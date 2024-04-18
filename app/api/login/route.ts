import {auth} from "firebase-admin";
import {customInitApp} from "@/lib/firebase-admin-config";
import {cookies, headers} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

// Init the Firebase SDK every time the server is called
customInitApp();

export async function POST(request: NextRequest, response: NextResponse) {
    const authorization = headers().get("Authorization");
    if (authorization?.startsWith("Bearer ")) {
        const idToken = authorization.split("Bearer ")[1];
        const decodedToken = await auth().verifyIdToken(idToken);

        if (decodedToken) {
            //Generate session cookie
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            const sessionCookie = await auth().createSessionCookie(idToken, {
                expiresIn,
            });
            const options = {
                name: "session",
                value: sessionCookie,
                maxAge: expiresIn,
                httpOnly: true,
                secure: true,
            };

            //Add the cookie to the browser
            cookies().set(options);


            // Add the user to the database if it doesn't exist
            const user = await prisma.user.upsert({
                where: {email: decodedToken.email},
                update: {},
                create: {
                    id: decodedToken.uid,
                    email: decodedToken.email ?? "",
                    name: decodedToken.name,
                    photo: decodedToken.picture,
                },
            });

            return NextResponse.json({message: "Logged in", user}, {status: 200});
        }
    }

    return NextResponse.json({}, {status: 200});
}

export async function GET(request: NextRequest) {
    const session = cookies().get("session")?.value || "";

    //Validate if the cookie exist in the request
    if (!session) {
        return NextResponse.json({isLogged: false}, {status: 401});
    }

    //Use Firebase Admin to validate the session cookie
    const decodedClaims = await auth().verifySessionCookie(session, true);

    if (!decodedClaims) {
        return NextResponse.json({isLogged: false}, {status: 401});
    }

    // If the session is valid, return the user as logged
    return NextResponse.json({
        isLogged: true,
        user: decodedClaims
    }, {status: 200});
}

// Log out the user
export async function DELETE(request: NextRequest, response: NextResponse) {
    const session = cookies().get("session")?.value || "";

    if (!session) {
        return NextResponse.json({message: "No session found"}, {status: 200});
    }

    //Remove the session cookie from the browser
    cookies().set({
        name: "session",
        value: "",
        maxAge: 0,
    });

    return NextResponse.json({message: "Logged out"}, {status: 200});
}