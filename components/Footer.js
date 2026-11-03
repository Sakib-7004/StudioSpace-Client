"use client";
import Link from "next/link";
import { Camera, Instagram, Youtube } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  function subscribe(event) {
    event.preventDefault();
    toast.success("Thanks for your interest! Newsletter signup will be connected soon.");
    event.currentTarget.reset();
  }
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div><Link href="/" className="brand footer-brand"><span className="brand-mark"><Camera size={22}/></span><span>Studio<span className="brand-accent">Space</span></span></Link>
        <p className="footer-copy">A creative home for creators. Discover inspiring studios, meet great hosts, and make your next idea happen.</p>
        <div className="social-links"><a href="https://instagram.com" aria-label="Instagram"><Instagram/></a><a href="https://youtube.com" aria-label="YouTube"><Youtube/></a><a href="https://x.com" aria-label="X">𝕏</a></div>
      </div>
      <div><h3>Explore</h3><Link href="/studios">All studios</Link><Link href="/studios?category=Photo%20Studio">Photo studios</Link><Link href="/studios?category=Podcast%20Lounge">Podcast rooms</Link><Link href="/studios?category=Music%20Suite">Music suites</Link></div>
      <div><h3>For hosts</h3><Link href="/add-studio">List your space</Link><Link href="/my-listings">Manage listings</Link><Link href="/my-bookings">Bookings</Link><Link href="/#how-it-works">How it works</Link></div>
      <div><h3>Stay inspired</h3><p>Get creative space ideas and product updates.</p><form className="newsletter" onSubmit={subscribe}><input type="email" placeholder="Your email address" required/><button aria-label="Subscribe">→</button></form></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} StudioSpace. All rights reserved.</span><span>Made for creators, by creators.</span></div>
  </footer>;
}
