import { getAuthSession } from "@/lib/auth";






export async function POST(request:Request){
    const session=await getAuthSession();
    if(!session?.user){
        return new Response("Unauthorized",{
            status:400,
            statusText:"Unauthorized user"
        })
    }

    const body:unknown=await request.json();
    const result=deleteTas
}