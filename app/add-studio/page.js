"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import StudioForm from "@/components/StudioForm";
import Loading from "@/components/Loading";
export default function AddStudioPage(){
 const {data:session,isPending}=authClient.useSession();const router=useRouter();
 useEffect(()=>{if(!isPending&&!session?.user)router.replace("/login?callbackUrl=/add-studio");},[isPending,session,router]);
 if(isPending||!session?.user)return <Loading text="Checking your account..."/>;
 return <div className="page-wrap"><div className="container"><div className="page-heading"><span className="eyebrow">Become a host</span><h1>List your creative space</h1><p>Tell creators what makes your studio special.</p></div><StudioForm/></div></div>;
}
