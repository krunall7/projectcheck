// pages/api/projects/[id].js
import prisma from '@/lib/prisma';
import {NextApiResponse} from "next";
import {NextRequest, NextResponse} from "next/server";

type Param = {
    id: string;
}

export async function GET(req:NextRequest, context: { params: Param }) {
    const { id } = context.params;
    console.log(id);

    const project = await prisma.project.findUnique({
        where: { id: id }
    });

    return NextResponse.json({ project });
}

export async function PUT(req:Request, context: { params: Param }) {
    const { id } = context.params;

    const data = await req.json();
    console.log(data);

    // remove deadline if it's empty
    if (!data.deadline) {
        delete data.deadline;
    }

    const updatedProject = await prisma.project.update({
        where: { id: id },
        data: data
    });

    return NextResponse.json({ project: updatedProject });
}

export async function DELETE(req:NextRequest, context: { params: Param }) {
    const { id } = context.params;

    await prisma.project.delete({
        where: { id: id }
    });

    return NextResponse.json('Project deleted');
}