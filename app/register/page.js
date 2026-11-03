"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
export default function RegisterPage(){
 const router=useRouter();const [form,setForm]=useState({name:"",email:"",image:"",password:""});const [busy,setBusy]=useState(false);
 function change(e){setForm({...form,[e.target.name]:e.target.value});}
 async function submit(e){e.preventDefault();if(!/[A-Z]/.test(form.password)||!/[a-z]/.test(form.password)||form.password.length<6)return toast.error("Password needs an uppercase letter, a lowercase letter and at least 6 characters.");setBusy(true);try{const result=await authClient.signUp.email({name:form.name,email:form.email,password:form.password,image:form.image||undefined});if(result.error)throw new Error(result.error.message);toast.success("Account created. Please log in.");router.push("/login");}catch(e){toast.error(e.message||"Registration failed.");}finally{setBusy(false);}}
 async function google(){try{await authClient.signIn.social({provider:"google",callbackURL:"/"});}catch(e){toast.error(e.message||"Google sign-in failed.");}}
 return <div className="page-wrap"><div className="container"><div className="form-card auth-card"><span className="eyebrow">Join the creative community</span><h2>Create your account</h2><p>One account to discover, book and host creative spaces.</p><form onSubmit={submit}><label>Full name<input name="name" value={form.name} onChange={change} required placeholder="Your name"/></label><label>Email address<input name="email" type="email" value={form.email} onChange={change} required placeholder="you@example.com"/></label><label>Photo URL (optional)<input name="image" value={form.image} onChange={change} placeholder="https://..."/></label><label>Password<input name="password" type="password" value={form.password} onChange={change} required minLength={6} placeholder="At least 6 characters"/><small>Use one uppercase and one lowercase letter.</small></label><button className="button button-primary button-wide" disabled={busy}>{busy?"Creating account...":"Create account"}</button></form><div className="divider-text">OR</div><button className="google-button" onClick={google}>G  Sign up with Google</button><p className="auth-switch">Already have an account? <Link href="/login">Log in</Link></p></div></div></div>;
}
