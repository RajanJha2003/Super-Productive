import { HomeRecentActivity, SettingsWorkspace } from "@/types/extended";
import { Workspace } from "@prisma/client";
import { notFound } from "next/navigation";
import { ACTIVITY_PER_PAGE } from "./constants";


export const domain=process.env.NODE_ENV!=="production"
?"http://localhost:3000"
:"http://localhost:3000"


export const getWorkspace=async(workspace_id:string,userId:string)=>{
     const res=await fetch(`${domain}/api/workspace/get/workspace_details/${workspace_id}?userId=${userId}`,{
        method:"GET",
        cache:"no-store"
     });

     if(!res.ok){
        return notFound()
     }
   return res.json() as Promise<Workspace>;
}



export const getWorkspaces=async(userId:string)=>{
    const res=await fetch(`${domain}/api/workspace/get/user_workspaces?userId=${userId}`,{
        method:"GET",
        cache:"no-store"
     });

     if(!res.ok){
        return notFound()
     }
   return res.json() as Promise<Workspace[]>;

}



export const getUserAdminWorkspaces=async(userId:string)=>{
    const res=await fetch(`${domain}/api/workspace/get/user_admin_workspaces?userId=${userId}`,{
        method:"GET",
        cache:"no-store"
     });

     if(!res.ok){
        return notFound()
     }
   return res.json() as Promise<Workspace[]>;
}


export const getInitialHomeRecentActivity = async (userId: string) => {
   const res = await fetch(
     `${domain}/api/home-page/get?userId=${userId}&page=${1}&take=${ACTIVITY_PER_PAGE}`,
     {
       method: "GET",
       cache: "no-store",
     }
   );
 
   if (!res.ok) {
     return notFound();
   }
 
   return res.json() as Promise<HomeRecentActivity[]>;
 };



 export const getWorkspaceSettings = async (
   workspace_id: string,
   userId: string
 ) => {
   const res = await fetch(
     `${domain}/api/workspace/get/settings/${workspace_id}?userId=${userId}`,
     {
       method: "GET",
       cache: "no-store",
     }
   );
 
   if (!res.ok) {
     return notFound();
   }
 
   return res.json() as Promise<SettingsWorkspace>;
 };

