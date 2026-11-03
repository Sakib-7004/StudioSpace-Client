"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Camera, Headphones, Lightbulb, Music2, ShieldCheck, Video } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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

const slides = [
  { title: "Make room for your next big idea.", text: "From quiet podcast rooms to full-scale production stages, find a space that brings your vision to life.", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1800" },
  { title: "Find a space. Create a story.", text: "Explore inspiring studios hosted by people who care about your craft.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1800" },
  { title: "Your studio could be someone’s next masterpiece.", text: "Share your creative space with a community of makers and independent creators.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800" }
];

export default function HomePage() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiRequest("/api/studios?limit=6").then(setStudios).catch(() => setStudios([])).finally(() => setLoading(false));
  }, []);
  return <>
    <section className="hero"><div className="container"><Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4500, disableOnInteraction: false }} pagination={{ clickable: true }} loop className="hero-swiper">
      {slides.map((slide) => <SwiperSlide key={slide.title}><div className="hero-panel" style={{ backgroundImage: `linear-gradient(90deg,rgba(13,23,17,.86),rgba(13,23,17,.2)),url(${slide.image})` }}><div className="hero-content">
        <span className="eyebrow">A creative space for every idea</span><h1>{slide.title}</h1><p>{slide.text}</p>
        <div className="hero-buttons"><Link className="button button-primary" href="/studios">Explore studios <ArrowRight size={17}/></Link><Link className="button button-ghost" href="/add-studio">Host your space</Link></div>
      </div></div></SwiperSlide>)}
    </Swiper></div></section>
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
      <div className="support-grid">{[[ShieldCheck,"Liability protection","Clear booking details and practical guidance for hosts and creators."],[Camera,"Verified profiles","Profile information helps creators understand who is hosting a space."],[Video,"Equipment safety","Space details and amenities help guests plan safe, suitable sessions."],[Headphones,"Creator support","A clear support path for questions about listings and reservations."]].map(([Icon,t,d])=><article className="support-card" key={t}><Icon size={25}/><h3>{t}</h3><p>{d}</p></article>)}</div>
    </div></section>
  </>;
}
