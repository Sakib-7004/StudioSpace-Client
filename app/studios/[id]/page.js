"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Star, Users, Clock } from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import Loading from "@/components/Loading";
import { authClient } from "@/lib/auth-client";

export default function StudioDetailsPage() {
  const { id } = useParams();
  const { data: session } = authClient.useSession();
  const [studio,setStudio] = useState(null);
  const [loading,setLoading] = useState(true);
  const [bookingOpen,setBookingOpen] = useState(false);
  const [startAt,setStartAt] = useState("");
  const [endAt,setEndAt] = useState("");
  const [saving,setSaving] = useState(false);
  useEffect(()=>{apiRequest(`/api/studios/${id}`).then(setStudio).catch(e=>toast.error(e.message)).finally(()=>setLoading(false));},[id]);
  async function book(event) {
    event.preventDefault();
    if(!session?.user) return toast.error("Please log in before booking a studio.");
    setSaving(true);
    try {
      await apiRequest("/api/bookings",{method:"POST",body:JSON.stringify({studioId:id,startAt,endAt})});
      toast.success("Booking request sent. You can track it in My Bookings.");
      setBookingOpen(false);
    } catch(e){toast.error(e.message);}
    finally{setSaving(false);}
  }
  if(loading)return <Loading/>;
  if(!studio)return <div className="empty-state"><h3>Studio not found</h3><a className="button button-primary" href="/studios">Explore studios</a></div>;
  return <div className="page-wrap"><div className="container"><div className="details-grid"><div>
    <img className="details-image" src={studio.imageUrl} alt={studio.title}/>
    <div style={{padding:"25px 0"}}><span className="eyebrow">About this space</span><h2 style={{fontFamily:"Manrope"}}>A place to bring your ideas to life</h2><p className="muted">{studio.overview}</p>
      <h3 style={{fontFamily:"Manrope",marginTop:28}}>Amenities</h3><div className="amenity-list">{(studio.amenities||[]).map(a=><span className="amenity-pill" key={a}>{a}</span>)}</div>
      <h3 style={{fontFamily:"Manrope",marginTop:28}}>Your host</h3><p className="muted">{studio.ownerName || "StudioSpace host"} · {studio.ownerEmail}</p>
      <h3 style={{fontFamily:"Manrope",marginTop:28}}>Guest reviews</h3><p className="muted">This new listing is ready for its first creator review.</p>
    </div>
  </div><aside className="details-panel"><span className="category-badge" style={{position:"static",display:"inline-block"}}>{studio.category}</span><h1>{studio.title}</h1><p className="muted"><MapPin size={15} style={{display:"inline"}}/> {studio.location}</p><div className="price">${studio.hourlyRate}<small style={{fontSize:13,color:"var(--muted)",fontWeight:500}}> / hour</small></div><p className="muted"><Star size={15} fill="#d99b32" color="#d99b32" style={{display:"inline"}}/> {studio.rating || "4.8"} · {studio.reviewCount || 0} reviews</p><hr style={{border:0,borderTop:"1px solid var(--line)",margin:"20px 0"}}/><p><Users size={16} style={{display:"inline"}}/> Up to {studio.maxCapacity} people</p><p><Clock size={16} style={{display:"inline"}}/> Flexible hourly booking</p><p className="muted">Security deposit: ${studio.securityDeposit || 0}</p><button className="button button-primary button-wide" onClick={()=>setBookingOpen(true)}>Book workspace now</button><p className="muted" style={{fontSize:11,textAlign:"center"}}>Your request will be marked Pending until the host confirms.</p></aside></div></div>
    {bookingOpen&&<div className="modal-backdrop" onClick={()=>setBookingOpen(false)}><div className="modal" onClick={e=>e.stopPropagation()}><h2>Request a booking</h2><p className="muted">Choose your start and end time for {studio.title}.</p><form onSubmit={book}><label className="form-card" style={{padding:0,border:0,boxShadow:"none"}}>Start time<input type="datetime-local" value={startAt} onChange={e=>setStartAt(e.target.value)} required/></label><label className="form-card" style={{padding:0,border:0,boxShadow:"none"}}>End time<input type="datetime-local" value={endAt} onChange={e=>setEndAt(e.target.value)} required/></label><div className="modal-actions"><button type="button" className="button button-ghost" onClick={()=>setBookingOpen(false)}>Cancel</button><button className="button button-primary" disabled={saving}>{saving?"Sending...":"Send request"}</button></div></form></div></div>}
  </div>;
}
