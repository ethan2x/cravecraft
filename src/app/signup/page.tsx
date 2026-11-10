"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
export default function Signup() {
 const router=useRouter();const [name,setName]=useState("");const [email,setEmail]=useState("");const [password,setPassword]=useState("");
 const [busy,setBusy]=useState(false);const [message,setMessage]=useState("");
 async function submit(e:FormEvent) {e.preventDefault();setBusy(true);setMessage("");
  try { const {data,error}=await getSupabase().auth.signUp({email,password,options:{data:{display_name:name},emailRedirectTo:`${window.location.origin}/auth/callback`}});
   if(error)throw error;
   if(data.session){router.replace("/dashboard");router.refresh();}else setMessage("Check your email for a confirmation link, then sign in.");
  }catch(err){setMessage(err instanceof Error?err.message:"Unable to create account.");}finally{setBusy(false);}
 }
 return <main className="min-h-screen bg-charcoal px-5 py-16 text-cream"><div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-charcoal-light p-8">
 <Link href="/" className="font-display text-2xl">Crave<span className="text-ember">Craft</span></Link><h1 className="mt-8 font-display text-4xl">Join CraveCraft</h1><p className="mt-2 text-cream-muted">Make your kitchen yours.</p>
 <form onSubmit={submit} className="mt-8 space-y-4"><label className="block">Name<input required value={name} onChange={e=>setName(e.target.value)} autoComplete="name" className="mt-2 w-full rounded-xl bg-charcoal p-3"/></label>
 <label className="block">Email<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl bg-charcoal p-3"/></label>
 <label className="block">Password (at least 8 characters)<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl bg-charcoal p-3"/></label>
 {message&&<p role="status" className="text-ember-soft">{message}</p>}<button disabled={busy} className="w-full rounded-full bg-ember p-3 font-semibold text-charcoal disabled:opacity-50">{busy?"Creating account...":"Create account"}</button></form>
 <p className="mt-6 text-sm text-cream-muted">Already have an account? <Link href="/login" className="text-ember">Sign in</Link></p></div></main>;
}
