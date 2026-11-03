"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import Loading from "@/components/Loading";
export default function MyListingsPage(){
 const {data:session,isPending}=authClient.useSession();const router=useRouter();const [items,setItems]=useState([]);const [loading,setLoading]=useState(true);const [deleteId,setDeleteId]=useState(null);
 useEffect(()=>{if(!isPending&&!session?.user)router.replace("/login?callbackUrl=/my-listings");},[isPending,session,router]);
 useEffect(()=>{if(session?.user)apiRequest("/api/studios/owner/mine").then(setItems).catch(e=>toast.error(e.message)).finally(()=>setLoading(false));},[session?.user?.id]);
 async function remove(){try{await apiRequest(`/api/studios/${deleteId}`,{method:"DELETE"});setItems(items.filter(x=>x._id!==deleteId));toast.success("Studio deleted.");}catch(e){toast.error(e.message);}finally{setDeleteId(null);}}
 if(isPending||!session?.user||loading)return <Loading/>;
 return <div className="page-wrap"><div className="container"><div className="section-heading"><div><span className="eyebrow">Host dashboard</span><h2>My studio listings</h2><p>Manage the creative spaces you share.</p></div><Link className="button button-primary" href="/add-studio">+ Add studio</Link></div>
 {items.length?items.map(item=><div className="list-row" key={item._id}><div className="list-info"><img src={item.imageUrl} alt=""/><div><h3>{item.title}</h3><p>{item.category} · ${item.hourlyRate}/hour · {item.location}</p></div></div><div className="list-actions"><Link className="small-button" href={`/studios/edit/${item._id}`}>Edit</Link><button className="small-button danger" onClick={()=>setDeleteId(item._id)}>Delete</button></div></div>):<div className="empty-state"><h3>You have no listings yet</h3><p>Add your first studio and welcome creators.</p><Link className="button button-primary" href="/add-studio">List a studio</Link></div>}
 {deleteId&&<div className="modal-backdrop"><div className="modal"><h2>Delete this studio?</h2><p className="muted">This action cannot be undone.</p><div className="modal-actions"><button className="button button-ghost" onClick={()=>setDeleteId(null)}>Keep it</button><button className="button button-primary" onClick={remove}>Yes, delete</button></div></div></div>}
 </div></div>;
}
