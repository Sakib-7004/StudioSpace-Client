"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Loading from "@/components/Loading";
export default function DashboardPage(){
 const {data:session,isPending}=authClient.useSession();
 if(isPending)return <Loading/>;
 if(!session?.user)return <div className="empty-state"><h3>Please log in</h3><Link href="/login" className="button button-primary">Log in</Link></div>;
 return <div className="page-wrap"><div className="container"><div className="page-heading"><span className="eyebrow">Your workspace</span><h1>Welcome, {session.user.name || "Creator"}</h1><p>What would you like to do today?</p></div><div className="category-grid">
 {[["Explore studios","Find a space for your next project","/studios"],["Add a studio","Share your creative space","/add-studio"],["My listings","Manage your studio spaces","/my-listings"],["My bookings","Review your reservations","/my-bookings"]].map(([title,desc,href])=><Link className="category-tile" href={href} key={href}><strong>{title}</strong><p className="muted">{desc}</p><span className="text-link">Open →</span></Link>)}
 </div></div></div>;
}
