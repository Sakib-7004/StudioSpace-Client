"use client";
import Link from "next/link";
import { useState } from "react";
import { Camera, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiRequest } from "@/lib/api";
import { useTheme } from "./ThemeProvider";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const user = session?.user;

  async function logout() {
    try {
      await authClient.signOut();
      await apiRequest("/api/session/logout", { method: "POST" });
      toast.success("You have been logged out.");
      router.push("/");
    } catch { toast.error("Could not log out. Please try again."); }
  }

  const links = [["Home", "/"], ["Explore Studios", "/studios"], ["How It Works", "/#how-it-works"], ["About Us", "/#about"]];
  return <header className="site-header">
    <div className="container nav-wrap">
      <Link href="/" className="brand"><span className="brand-mark"><Camera size={22}/></span><span>Studio<span className="brand-accent">Space</span></span></Link>
      <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        {links.map(([label, href]) => <Link key={label} className={pathname === href ? "active" : ""} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
      </nav>
      <div className="nav-actions">
        <button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme">{theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}</button>
        {user ? <div className="profile-wrap">
          <button className="profile-button" onClick={() => setProfileOpen(!profileOpen)}>
            {user.image ? <img src={user.image} alt="" className="avatar"/> : <span className="avatar avatar-fallback">{user.name?.[0] || "U"}</span>}
            <span className="profile-name">{user.name || user.email}</span><ChevronDown size={16}/>
          </button>
          {profileOpen && <div className="profile-menu">
            <Link href="/dashboard" onClick={() => setProfileOpen(false)}>Dashboard</Link>
            <Link href="/add-studio" onClick={() => setProfileOpen(false)}>Add New Studio</Link>
            <Link href="/my-listings" onClick={() => setProfileOpen(false)}>My Studio Listings</Link>
            <Link href="/my-bookings" onClick={() => setProfileOpen(false)}>My Bookings</Link>
            <button onClick={logout}>Logout</button>
          </div>}
        </div> : <div className="auth-actions"><Link className="button button-ghost" href="/login">Log in</Link><Link className="button button-primary" href="/register">Get started</Link></div>}
        <button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </div>
  </header>;
}
