"use client";
import { useEffect,useState } from "react";
import { useParams,useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import StudioForm from "@/components/StudioForm";
import Loading from "@/components/Loading";
export default function EditStudioPage(){
 const {id}=useParams();const router=useRouter();const {data:session,isPending}=authClient.useSession();const [studio,setStudio]=useState(null);const [loading,setLoading]=useState(true);
 useEffect(()=>{if(!isPending&&!session?.user)router.replace("/login?callbackUrl=/studios/edit/"+id);},[isPending,session,router,id]);
 useEffect(()=>{if(session?.user)apiRequest(`/api/studios/${id}`).then(setStudio).catch(e=>toast.error(e.message)).finally(()=>setLoading(false));},[id,session?.user?.id]);
 if(isPending||!session?.user||loading)return <Loading text="Loading studio details..."/>;
 if(!studio)return <div className="empty-state">Studio not found.</div>;
 if(studio.ownerEmail!==session.user.email)return <div className="empty-state"><h3>You cannot edit this listing</h3></div>;
 return <div className="page-wrap"><div className="container"><div className="page-heading"><span className="eyebrow">Host dashboard</span><h1>Update your studio</h1><p>Make changes to your listing details.</p></div><StudioForm initialData={studio}/></div></div>;
}
