"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { apiRequest } from "@/lib/api";
import StudioCard from "@/components/StudioCard";
import Loading from "@/components/Loading";

const categories = ["All","Photo Studio","Film Stage","Podcast Lounge","Music Suite","Workshop","Sound Stage"];
export default function StudiosPage() {
  const [category,setCategory] = useState("All");
  const [search,setSearch] = useState("");
  const [studios,setStudios] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const initialCategory = new URLSearchParams(window.location.search).get("category") || "All";
    setCategory(initialCategory);
  }, []);
  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams();
    if(category !== "All") query.set("category",category);
    if(search.trim()) query.set("search",search.trim());
    apiRequest(`/api/studios?${query.toString()}`).then(setStudios).catch(() => setStudios([])).finally(() => setLoading(false));
  },[category,search]);
  return <div className="page-wrap"><div className="container"><div className="page-heading"><span className="eyebrow">Explore the possibilities</span><h1>Find your creative space</h1><p>Search unique studios and production spaces hosted by the creative community.</p></div>
    <div className="filter-bar"><Search size={19}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search by studio, category or location..."/><select value={category} onChange={(e)=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></div>
    {loading ? <Loading/> : studios.length ? <div className="studio-grid">{studios.map(s=><StudioCard key={s._id} studio={s}/>)}</div> : <div className="empty-state"><h3>No studios found</h3><p>Try a different search or choose another category.</p><button className="button button-primary" onClick={()=>{setSearch("");setCategory("All");}}>Clear filters</button></div>}
  </div></div>;
}
