import Link from "next/link";
import { MapPin, Star } from "lucide-react";

export default function StudioCard({ studio }) {
  return <article className="studio-card">
    <Link href={`/studios/${studio._id}`} className="studio-image-wrap">
      <img src={studio.imageUrl} alt={studio.title} className="studio-image"/>
      <span className="category-badge">{studio.category}</span>
    </Link>
    <div className="studio-card-body">
      <div className="studio-card-title"><h3>{studio.title}</h3><span className="rating"><Star size={14} fill="currentColor"/> {studio.rating || "4.8"}</span></div>
      <p className="muted"><MapPin size={14}/> {studio.location}</p>
      <div className="studio-card-bottom"><strong>${studio.hourlyRate} <small>/ hour</small></strong><Link href={`/studios/${studio._id}`} className="text-link">View details ↗</Link></div>
    </div>
  </article>;
}
