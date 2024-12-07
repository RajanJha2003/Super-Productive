
import { db } from "@/lib/db";
import { NextResponse } from "next/server";





export const GET=async(request:Request)=>{
    const url=new URL(request.url);

    const workspaceId=url.searchParams.get("workspaceId");


    if(!workspaceId){
        return NextResponse.json("ERRORS.NO_WORKSPACE",{status:404});

    }

    try {
        const users=await db.user.findMany({
            where:{
                subscriptions:{
                    some:{workspaceId}
                }
            },
            include:{
                subscriptions:{
                    where:{
                        workspaceId
                    },
                    select:{
                        userRole:true
                    }
                }
            }
        })


        const returnedUsers=users.map((user)=>{
            return{
                id:user.id,
                usernmae:user.username,
                image:user.image,
                userRole:user.subscriptions[0].userRole,
                lastTimeActive:user.lastTimeActive
            }
        })


        return NextResponse.json(returnedUsers,{status:200})
    } catch (error) {
        return NextResponse.json("ERRORS.DB_ERROR",{
         status:405
        })
     }

}
