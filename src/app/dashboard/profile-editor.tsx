"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
type Profile={display_name:string;cooking_level:number;favorite_cuisines:string[];dietary_preferences:string[];kitchen_equipment:string[]};
const split=(value:string)=>value.split(",").map(v=>v.trim()).filter(Boolean);
export default function ProfileEditor({userId,initial}:{userId:string;initial:Profile}){
 const router=useRouter();const [name,setName]=useState(initial.display_name);const [level,setLevel]=useState(initial.cooking_level);
 const [cuisines,setCuisines]=useState(initial.favorite_cuisines.join(", "));
 const [diet,setDiet]=useState(initial.dietary_preferences.join(", "));
 const [equipment,setEquipment]=useState(initial.kitchen_equipment.join(", "));
 const [busy,setBusy]=useState(false);const [message,setMessage]=useState("");
 async function save(e:FormEvent){e.preventDefault();setBusy(true);setMessage("");try{
 const {data:{user},error:authError}=await getSupabase().auth.getUser();if(authError||!user||user.id!==userId)throw new Error("Your session expired. Please sign in again.");
 const {error}=await getSupabase().from("profiles").upsert({id:user.id,display_name:name,cooking_level:level,favorite_cuisines:split(cuisines),dietary_preferences:split(diet),kitchen_equipment:split(equipment),updated_at:new Date().toISOString()},{onConflict:"id"});
 if(error)throw error;setMessage("Profile saved!");router.refresh();
 }catch(err){setMessage(err instanceof Error?err.message:"Could not save profile.");}finally{setBusy(false);}}
 async function logout(){await getSupabase().auth.signOut();router.replace("/login");router.refresh();}
 return <section className="mt-8 rounded-3xl border border-white/10 bg-charcoal-light p-7"><form onSubmit={save} className="space-y-5">
 <label className="block">Your name<input value={name} onChange={e=>setName(e.target.value)} className="mt-2 w-full rounded-xl bg-charcoal p-3"/></label>
 <label className="block">Cooking skill level<select value={level} onChange={e=>setLevel(Number(e.target.value))} className="mt-2 w-full rounded-xl bg-charcoal p-3"><option value={1}>1 — Beginner</option><option value={2}>2 — Intermediate</option><option value={3}>3 — Experienced</option></select></label>
 <label className="block">Favorite cuisines <span className="text-sm text-cream-muted">(comma-separated)</span><input value={cuisines} onChange={e=>setCuisines(e.target.value)} placeholder="Caribbean, Italian, Mexican" className="mt-2 w-full rounded-xl bg-charcoal p-3"/></label>
 <label className="block">Dietary preferences <span className="text-sm text-cream-muted">(comma-separated)</span><input value={diet} onChange={e=>setDiet(e.target.value)} placeholder="Vegetarian, dairy-free" className="mt-2 w-full rounded-xl bg-charcoal p-3"/></label>
 <label className="block">Kitchen equipment <span className="text-sm text-cream-muted">(comma-separated)</span><input value={equipment} onChange={e=>setEquipment(e.target.value)} placeholder="Stove, air fryer, microwave" className="mt-2 w-full rounded-xl bg-charcoal p-3"/></label>
 {message&&<p role="status" className="text-ember-soft">{message}</p>}
 <button disabled={busy} className="rounded-full bg-ember px-7 py-3 font-semibold text-charcoal disabled:opacity-50">{busy?"Saving...":"Save my profile"}</button></form>
 <button type="button" onClick={logout} className="mt-8 text-sm text-cream-muted underline hover:text-cream">Sign out</button></section>;
}
