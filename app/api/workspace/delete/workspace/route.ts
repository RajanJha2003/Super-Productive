import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiWorkspaceDelete } from "@/schema/workSpaceSchema";
import { NextResponse } from "next/server";



export async function POST(request:Request){
    const session=await getAuthSession();
    if(!session?.user) return NextResponse.json({
        message:"ERRORS.UNAUTHORIZED"
    },{status:401})

    const body:unknown=await request.json();
    const result=apiWorkspaceDelete.safeParse(body);
    if(!result.success) return NextResponse.json({
        message:"ERRORS.INVALID_DATA"
    },{status:400})

    const {id,workspaceName}=result.data;

    try {
        const user=await db.user.findUnique({
            where:{
                id:session.user.id
            },
            include:{
                subscriptions:{
                    where:{
                        workspaceId:id
                    },
                    select:{
                        userRole:true
                    }
                }
            }
        })

        if(!user) return NextResponse.json({
            message:"ERRORS.UNAUTHORIZED"
        },{status:401})

        if(user.subscriptions[0].userRole==="CAN_EDIT" || user.subscriptions[0].userRole==="READ_ONLY"){
            return NextResponse.json({
                message:"ERRORS.UNAUTHORIZED"
            },{status:401})
        }

        const workspace=await db.workspace.findUnique({
            where:{
                id
            }
        })

        if(!workspace) return NextResponse.json({
            message:"ERRORS.WORKSPACE_NOT_FOUND"
        },{status:404})

        if(workspace.name!==workspaceName) return NextResponse.json({
            message:"ERRORS.WRONG_NAME"
        },{status:400})

        await db.workspace.delete({
            where:{
                id
            }
        })


        return NextResponse.json("OK",{status:200})
    } catch (error) {
        return NextResponse.json({
            message:"ERRORS.DEFAULT"
        },{status:500})
    }
}