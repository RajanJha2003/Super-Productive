import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { changePasswordSchema } from "@/schema/changePasswordSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";



export async function POST(request:Request){
    const session=await getAuthSession();
    if(!session?.user){
        return new NextResponse("Unauthorized",{status:400,statusText:"Unauthorized User"});

    }

    const body=await request.json();
    const result=changePasswordSchema.safeParse(body);
    if(!result.success){
        return new NextResponse("Invalid Request",{status:400,statusText:"Invalid Request"});
    }

    const {current_password,new_password,repeat_password}=result.data;


    try {
        const user=await db.user.findUnique({
            where:{
                id:session.user.id
            }
        })

        if(!user){
            return new NextResponse("User not found",{status:400,statusText:"User not found"});
        }

        if(!user.hashedPassword){
            return new NextResponse("ERRORS.NO_PASSWORD",{status:400,statusText:"No password found"});
        }

        const passwordMatch=await bcrypt.compare(current_password,user.hashedPassword);
        if(!passwordMatch){
            return new NextResponse("ERRORS.INVALID_PASSWORD",{status:400,statusText:"Invalid password"});
        }

        const hashedPassword=await bcrypt.hash(new_password,10);

        const updateUser=await db.user.update({
            where:{
                id:session.user.id
            },
            data:{
                hashedPassword
            }
        })


        return NextResponse.json(updateUser,{status:200})
    } catch (error) {
        return NextResponse.json("ERRORS.DB_ERROR",{
            status:405
           })
        
    }
    
}