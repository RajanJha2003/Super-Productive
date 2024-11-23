import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {z} from 'zod';



export async function POST(request:Request){
          const session=await getAuthSession();

          if(!session?.user){

            return new NextResponse("Unauthorized",{
                status:400,
                statusText:"Unauthorized User"
            })

          }


         

          try {
            const user=await db.user.findUnique({
              where:{
                id:session.user.id
              }
            })

            if(!user){
              return new NextResponse("User not found",{
                status:404,
                statusText:"user not found"
              })
            }

            const updateUser=await db.user.update({
              where:{
                id:session.user.id,
              },
              data:{
                image:null
              }
            })

            return NextResponse.json(updateUser,{
              status:200
            })
          } catch (error) {
             return NextResponse.json("ERRORS.DB_ERROR",{
              status:405
             })
          }

}
