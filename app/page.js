"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Camera, Headphones, Lightbulb, Music2, ShieldCheck, Video } from "lucide-react";
import { apiRequest } from "@/lib/api";
import StudioCard from "@/components/StudioCard";
import Loading from "@/components/Loading";

const categories = [
  { name: "Photo Studio", icon: Camera, text: "Portraits & campaigns" },
  { name: "Film Stage", icon: Video, text: "Production-ready sets" },
  { name: "Podcast Lounge", icon: Headphones, text: "Record your next show" },
  { name: "Music Suite", icon: Music2, text: "Make something loud" },
  { name: "Workshop", icon: Lightbulb, text: "Create by hand" }
];

export default function HomePage() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    apiRequest("/api/studios?limit=6").then(setStudios).catch(() => setStudios([])).finally(() => setLoading(false));
    const timer = setInterval(() => setSlide((old) => (old + 1) % 3), 5000);
    return () => clearInterval(timer);
  }, []);
  const slides = [
    ["Make room for your next big idea.", "From quiet podcast rooms to full-scale production stages, find a space that brings your vision to life."],
    ["Find a space. Create a story.", "Explore inspiring studios hosted by people who care about your craft."],
    ["Your studio could be someone’s next masterpiece.", "Share your creative space with a community of makers and independent creators."]
  ];
  return <>
    <section className="hero"><div className="container"><div className="hero-panel"><div className="hero-content">
      <span className="eyebrow">A creative space for every idea</span><h1>{slides[slide][0]}</h1><p>{slides[slide][1]}</p>
      <div className="hero-buttons"><Link className="button button-primary" href="/studios">Explore studios <ArrowRight size={17}/></Link><Link className="button button-ghost" href="/add-studio">Host your space</Link></div>
      <div className="hero-pagination">{slides.map((_, i) => <button key={i} onClick={() => setSlide(i)} aria-label={`Show slide ${i+1}`} style={{width:slide===i?34:18,background:slide===i?"#fff":"#ffffff80",height:4,border:0,borderRadius:8}}/>)}</div>
    </div></div></div></section>
    <section className="section"><div className="container"><div className="section-heading"><div><span className="eyebrow">Handpicked for you</span><h2>Featured creative spaces</h2><p>Spaces that help good ideas become great work.</p></div><Link className="text-link" href="/studios">Explore all studios ↗</Link></div>
      {loading ? <Loading/> : studios.length ? <div className="studio-grid">{studios.slice(0,6).map((studio) => <StudioCard key={studio._id} studio={studio}/>)}</div> : <div className="empty-state"><h3>New spaces are on the way</h3><p>Be the first host to list a creative studio.</p><Link href="/add-studio" className="button button-primary">List your studio</Link></div>}
    </div></section>
    <section className="section" style={{background:"var(--surface)"}}><div className="container"><div className="section-heading"><div><span className="eyebrow">Find your perfect setup</span><h2>Browse by category</h2><p>Whatever you're creating, there's a space for it.</p></div></div>
      <div className="category-grid">{categories.map(({name,icon:Icon,text})=><Link className="category-tile" href={`/studios?category=${encodeURIComponent(name)}`} key={name}><span className="category-icon"><Icon size={23}/></span><strong>{name}</strong><p className="muted" style={{fontSize:11,margin:"4px 0 0"}}>{text}</p></Link>)}</div>
    </div></section>
    <section className="section" id="how-it-works"><div className="container"><div className="section-heading"><div><span className="eyebrow">Simple from start to finish</span><h2>How booking works</h2><p>Four easy steps between your idea and your next creation.</p></div></div>
      <div className="steps-grid">{[["01","Discover spaces","Explore studios by type, location and budget."],["02","Select shoot hours","Choose a date and the time that works for you."],["03","Book your space","Send your booking request and track its status."],["04","Create & produce","Show up, get inspired and make something great."]].map(([n,t,d])=><article className="step-card" key={n}><span className="step-number">{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
    </div></section>
    <section className="section" id="about" style={{background:"var(--soft)"}}><div className="container"><div className="section-heading"><div><span className="eyebrow">Create with confidence</span><h2>Good spaces. Better creative days.</h2><p>We make it easier for hosts and creators to work together.</p></div></div>
      <div className="support-grid">{[[ShieldCheck,"Clear expectations","Transparent pricing and booking details before you reserve."],[Camera,"Spaces for every craft","Discover photography, film, podcast, music and workshop spaces."],[Headphones,"Creator-first support","A simple way to connect with hosts and manage your bookings."]].map(([Icon,t,d])=><article className="support-card" key={t}><Icon size={25}/><h3>{t}</h3><p>{d}</p></article>)}</div>
    </div></section>
  </>;
}
