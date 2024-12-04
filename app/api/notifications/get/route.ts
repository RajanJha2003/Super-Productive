import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {

    const url=new URL(req.url);
    const userId=url.searchParams.get("userId");



    if(!userId) return NextResponse.json({error:"User ID is required"},{status:400});
    

    try {
        const userNotifications=await db.notification.findMany({
            where:{
                userId
            },
            include:{
                notifyCreator:{
                    select:{
                        id:true,
                        username:true,
                        image:true
                    }
                },
                workspace:{
                    select:{
                        id:true,
                        name:true
                    },
                },
            },
            orderBy:{
               createdDate:"desc"
            }
          
        })

        if(!userNotifications) return NextResponse.json({error:"No notifications found"},{status:404});

        return NextResponse.json(userNotifications,{status:200});
    } catch (error) {
        return NextResponse.json("ERRORS.DB_ERROR",{
         status:405
        })
     }

}