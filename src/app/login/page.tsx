"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
export default function Login() {
  const router = useRouter();
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
  async function submit(e:FormEvent) {
    e.preventDefault(); setBusy(true);setMessage("");
    try { const { error }=await getSupabase().auth.signInWithPassword({email,password});
      if(error) throw error; router.replace("/dashboard");router.refresh();
    } catch(err) {setMessage(err instanceof Error?err.message:"Unable to sign in.");} finally {setBusy(false);}
  }
  return <main className="min-h-screen bg-charcoal px-5 py-16 text-cream"><div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-charcoal-light p-8">
    <Link href="/" className="font-display text-2xl">Crave<span className="text-ember">Craft</span></Link>
    <h1 className="mt-8 font-display text-4xl">Welcome back</h1><p className="mt-2 text-cream-muted">Sign in to your kitchen.</p>
    <form onSubmit={submit} className="mt-8 space-y-4"><label className="block">Email<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl bg-charcoal p-3"/></label>
    <label className="block">Password<input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl bg-charcoal p-3"/></label>
    {message&&<p role="alert" className="text-ember-soft">{message}</p>}<button disabled={busy} className="w-full rounded-full bg-ember p-3 font-semibold text-charcoal disabled:opacity-50">{busy?"Signing in...":"Sign in"}</button></form>
    <p className="mt-6 text-sm text-cream-muted">New here? <Link href="/signup" className="text-ember">Create an account</Link></p>
  </div></main>;
}
