import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { deleteUserFromWorkspaceSchema } from "@/schema/deleteUserFromWorkspaceSchema";
import { editUserRoleSchema } from "@/schema/editUserRoleSchema";
import { NotifyType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const session=await getAuthSession();
    if(!session?.user) return new Response("Unauthorized",{status:401});



    const body:unknown=await req.json();

    const result=deleteUserFromWorkspaceSchema.safeParse(body);
    if(!result.success) return new Response("Invalid request",{status:400});

    const {userId,workspaceId}=result.data;

    try {
        const user=await db.user.findUnique({
            where:{
                id:session.user.id
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

        if(!user) return new Response("User not found",{status:404});

        if (
            user.subscriptions[0].userRole === "CAN_EDIT" ||
            user.subscriptions[0].userRole === "READ_ONLY"
          ) {
            return NextResponse.json("ERRORS.NO_PERMISSION", { status: 403 });


           
          }


          await db.subscription.delete({
            where:{
                userId_workspaceId:{
                    userId,
                    workspaceId
                }
            }
          })

          const workspaceUsers=await db.subscription.findMany({
           where:{
            workspaceId
           },
           select:{
            userId:true
           }
        })

            const notificationsData=workspaceUsers.map((user)=>({
                notifyCreatorId:session.user.id,
                userId:user.userId,
                workspaceId,
                notifyType:NotifyType.USER_LEFT_WORKSPACE

            }))
        await db.notification.createMany({
            data:notificationsData
        })


        return NextResponse.json("OK",{status:200});

    } catch (_) {
        return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
      }
    }