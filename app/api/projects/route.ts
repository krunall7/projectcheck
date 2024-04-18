import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {auth} from "firebase-admin";
import prisma from "@/lib/prisma";

export async function POST(req:NextRequest, res: NextResponse) {
    const session = cookies().get("session")?.value || "";
    const data = await req.formData();

    //Validate if the cookie exist in the request
    if (!session) {
        return NextResponse.json({isLogged: false}, {status: 401});
    }

    //Use Firebase Admin to validate the session cookie
    const decodedClaims = await auth().verifySessionCookie(session, true);

    if (!decodedClaims) {
        return NextResponse.json({isLogged: false}, {status: 401});
    }

    if (!data){
        return NextResponse.json({message: "No data found"}, {status: 400});
    }


    const project = await prisma.project.create({
        data: {
            title: data.get("title"),
            deadline: new Date(data.get("deadline") as string),
            description: data.get("description"),
            image: data.get("image"),
            createdBy: decodedClaims.uid
        }
    });

    return NextResponse.json({project, message: "Project created successfully"}, {status: 201});
}

export async function GET(req:NextRequest, res: NextResponse) {
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

    const projects = await prisma.project.findMany({
        where: {
            createdBy: decodedClaims.uid
        }
    });

    return NextResponse.json({projects});
}

export async function DELETE(req:NextRequest, res: NextResponse) {
    const session = cookies().get("session")?.value || "";

    if (!session) {
        return NextResponse.json({message: "No session found"}, {status: 200});
    }

    //Remove the session cookie from the browser
    cookies().set({
        name: "session",
        value: "",
        maxAge: 0,
        path: "/"
    });

    return NextResponse.json({message: "Logged out"}, {status: 200});
}

export async function PUT(req:NextRequest, res: NextResponse) {
    const session = cookies().get("session")?.value || "";
    const data = await req.formData();

    //Validate if the cookie exist in the request
    if (!session) {
        return NextResponse.json({isLogged: false}, {status: 401});
    }

    //Use Firebase Admin to validate the session cookie
    const decodedClaims = await auth().verifySessionCookie(session, true);

    if (!decodedClaims) {
        return NextResponse.json({isLogged: false}, {status: 401});
    }

    if (!data){
        return NextResponse.json({message: "No data found"}, {status: 400});
    }

    const project = await prisma.project.update({
        where: {
            id: parseInt(data.get("id") as string)
        },
        data: {
            title: data.get("title"),
            deadline: new Date(data.get("deadline") as string),
            description: data.get("description"),
            image: data.get("image"),
        }
    });

    return NextResponse.json({project, message: "Project updated successfully"}, {status: 200});
}
