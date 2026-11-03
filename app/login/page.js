"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient, createApiSession } from "@/lib/auth-client";
export default function LoginPage(){
 const router=useRouter();const params=useSearchParams();const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [busy,setBusy]=useState(false);
 async function submit(e){e.preventDefault();setBusy(true);try{const result=await authClient.signIn.email({email,password});if(result.error)throw new Error(result.error.message);await createApiSession();toast.success("Welcome back!");router.push(params.get("callbackUrl")||"/");}catch(e){toast.error(e.message||"Login failed.");}finally{setBusy(false);}}
 async function google(){try{await authClient.signIn.social({provider:"google",callbackURL:"/"});}catch(e){toast.error(e.message||"Google sign-in failed.");}}
 return <div className="page-wrap"><div className="container"><div className="form-card auth-card"><span className="eyebrow">Welcome back</span><h2>Log in to StudioSpace</h2><p>Sign in to manage your creative spaces and bookings.</p><form onSubmit={submit}><label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@example.com"/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Your password"/></label><button className="button button-primary button-wide" disabled={busy}>{busy?"Signing in...":"Log in"}</button></form><div className="divider-text">OR CONTINUE WITH</div><button className="google-button" onClick={google}>G  Continue with Google</button><p className="auth-switch">New to StudioSpace? <Link href="/register">Create an account</Link></p></div></div></div>;
}
