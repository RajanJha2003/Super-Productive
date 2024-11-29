import { db } from "@/lib/db";
import { sortMindMapsAndTasksDataByUpdatedAt } from "@/lib/sortMindMapsAndTasksDataByUpdatedAt";
import { HomeRecentActivity } from "@/types/extended";
import { NextResponse } from "next/server";


export const GET=async(request:Request)=>{
    const url=new URL(request.url);
    const userId=url.searchParams.get("userId");
    const page=url.searchParams.get("page");
    const take=url.searchParams.get("take");

    if(!userId || !take || !page){
        return NextResponse.json("ERRORS.WRONG_DATA",{
            status:404
        })
    }


    const takeValue=parseInt(take?take:"");
    const pageValue=parseInt(page?page:"");
    const skipValue=(pageValue-1)*takeValue;

    try {
        const tasks=await db.task.findMany({
            where:{
                workspace:{
                    subscribers:{
                        some:{
                            userId
                        }
                    }
                }
            },
            include:{
                updatedBy:{
                    select:{
                        username:true,
                        name:true,
                        id:true,
                        image:true,
                        surname:true,

                    }
                },
                savedTask:{
                    where:{
                        userId
                    },
                    select:{
                        taskId:true
                    }
                },
                workspace:true

            },
            orderBy:{
                updatedAt:"desc"
            },
            skip:skipValue,
            take:takeValue
        })

        const mindMaps=await db.mindMap.findMany({
            where:{
                workspace:{
                    subscribers:{
                        some:{
                            userId
                        }
                    }
                }
            },
            include:{
                updatedBy:{
                    select:{
                        username:true,
                        name:true,
                        id:true,
                        image:true,
                        surname:true,

                    }
                },
                savedMindMaps:{
                    where:{
                        userId
                    },
                    select:{
                        mindMapId:true
                    }
                },
                workspace:true

            },
            orderBy:{
                updatedAt:"desc"
            },
            skip:skipValue,
            take:takeValue
        })

        const mindMapData:HomeRecentActivity[]=mindMaps.map((mindMap)=>({
            id:mindMap.id,
            title:mindMap.title,
            emoji:mindMap.emoji,
            link:`/dashboard/workspace/${mindMap.workspace.id}/mind-maps/mind-map/${mindMap.id}`,
            workspaceName:mindMap.workspace.name,
            createdAt:new Date(mindMap.createdAt),
            type:"mindMap",
            updated:{
                at:new Date(mindMap.updatedAt),
                by:mindMap.updatedBy,
            },
            workspaceId:mindMap.workspaceId,
            starred:mindMap.savedMindMaps.length>0
        }))


        const tasksData:HomeRecentActivity[]=tasks.map((task)=>({
            id:task.id,
            title:task.title,
            emoji:task.emoji,
            link:`/dashboard/workspace/${task.workspace.id}/mind-maps/mind-map/${task.id}`,
            workspaceName:task.workspace.name,
            createdAt:new Date(task.createdAt),
            type:"task",
            updated:{
                at:new Date(task.updatedAt),
                by:task.updatedBy,
            },
            workspaceId:task.workspaceId,
            starred:task.savedTask.length>0
        }))


        return NextResponse.json(
            sortMindMapsAndTasksDataByUpdatedAt({
                tasks:tasksData,
                mindMaps:mindMapData
            }),
            {
                status:200
            }
        )
    } catch (error) {
        return NextResponse.json("ERRORS.DB_ERROR",{
            status:405
           })
        
    }


}