"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import Loading from "@/components/Loading";
export default function MyBookingsPage(){
 const {data:session,isPending}=authClient.useSession();const router=useRouter();const [items,setItems]=useState([]);const [loading,setLoading]=useState(true);
 useEffect(()=>{if(!isPending&&!session?.user)router.replace("/login?callbackUrl=/my-bookings");},[isPending,session,router]);
 useEffect(()=>{if(session?.user)apiRequest("/api/bookings/mine").then(setItems).catch(e=>toast.error(e.message)).finally(()=>setLoading(false));},[session?.user?.id]);
 async function cancel(id){try{await apiRequest(`/api/bookings/${id}/cancel`,{method:"PATCH"});setItems(items.map(x=>x._id===id?{...x,status:"Cancelled"}:x));toast.success("Booking cancelled.");}catch(e){toast.error(e.message);}}
 if(isPending||!session?.user||loading)return <Loading/>;
 return <div className="page-wrap"><div className="container"><div className="page-heading"><span className="eyebrow">Your creative schedule</span><h1>My bookings</h1><p>Keep track of your studio reservation requests.</p></div>
 {items.length?items.map(item=><div className="list-row" key={item._id}><div className="list-info"><img src={item.studioImage} alt=""/><div><h3>{item.studioTitle}</h3><p>{new Date(item.startAt).toLocaleString()} – {new Date(item.endAt).toLocaleString()}</p><p>Host: {item.hostEmail}</p></div></div><div className="list-actions"><span className="status">{item.status}</span>{item.status==="Pending"&&<button className="small-button danger" onClick={()=>cancel(item._id)}>Cancel booking</button>}</div></div>):<div className="empty-state"><h3>No bookings yet</h3><p>Find a studio and send your first booking request.</p><a className="button button-primary" href="/studios">Explore studios</a></div>}
 </div></div>;
}
