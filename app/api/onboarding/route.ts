import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getRandomWorkspaceColor } from "@/lib/getRandomWorkspaceColor";
import { onboardingSchema } from "@/schema/onboardingSchema";
import { UseCase as UseCaseType } from "@prisma/client";
import { NextResponse } from "next/server";
import {v4 as uuidv4} from "uuid";




export async function POST(request:Request){
    const session=await getAuthSession();
    if(!session?.user) return new Response("Unauthorized",{status:401});

    const body:unknown=await request.json();
    const result=onboardingSchema.safeParse(body);

    if(!result.success){
        return NextResponse.json("ERRORS.WRONG_DATA",{
            status:401
        })
    }
    const {name,surname,useCase,workspaceImage,workspaceName}=result.data;

    try {
        const user=await db.user.findUnique({
            where:{
                id:session.user.id
            }
        })

        if(!user){
            return new NextResponse("ERRORS.NO_USER_API",{
                status:404,
                statusText:"User not found"
            })
        }

        await db.user.update({
            where:{
                id:session.user.id
            },
            data:{
                completedOnboarding:true,
                name,
                surname,
                useCase:useCase as UseCaseType
            }
        })

        const workspace=await db.workspace.create({
            data:{
                name:workspaceName,
                creatorId:user.id,
                image:workspaceImage,
                color:getRandomWorkspaceColor(),
                inviteCode:uuidv4(),
                adminCode:uuidv4(),
                canEditCode:uuidv4(),
                readOnlyCode:uuidv4()
            }
        })


        await db.subscription.create({
            data:{
                userId:user.id,
                workspaceId:workspace.id,
                userRole:"OWNER"
            }
        })


        await db.pomodoroSettings.create({
            data:{
                userId:user.id,
            }
        })


        const conversation=await db.conversation.create({
            data:{
                workspaceId:workspace.id,
                
            }
        })


        return NextResponse.json("OK",{
            status:200
        })
    } catch (error) {
        return NextResponse.json("ERRORS.DB_ERROR",{
            status:405
           })
        
    }
    
}