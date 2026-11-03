"use client";
import { useState } from "react";
import { toast } from "sonner";
import { API_URL, apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const categories = ["Photo Studio", "Film Stage", "Podcast Lounge", "Music Suite", "Workshop", "Sound Stage"];
const amenities = ["Lighting equipment", "Green screen", "Soundproofing", "Wi-Fi", "Air conditioning", "Changing room", "Parking", "Makeup station"];

export default function StudioForm({ initialData }) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialData?.title || "", category: initialData?.category || categories[0],
    hourlyRate: initialData?.hourlyRate || "", securityDeposit: initialData?.securityDeposit || 0,
    maxCapacity: initialData?.maxCapacity || 5, location: initialData?.location || "",
    imageUrl: initialData?.imageUrl || "", overview: initialData?.overview || "",
    amenities: initialData?.amenities || []
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  function change(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  function toggleAmenity(item) {
    setForm({ ...form, amenities: form.amenities.includes(item) ? form.amenities.filter((x) => x !== item) : [...form.amenities, item] });
  }
  async function uploadImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!key) return toast.error("Add NEXT_PUBLIC_IMGBB_API_KEY to your client .env file first.");
    setUploading(true);
    try {
      const body = new FormData(); body.append("image", file);
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error("Image upload failed.");
      setForm((old) => ({ ...old, imageUrl: data.data.url }));
      toast.success("Image uploaded successfully.");
    } catch (error) { toast.error(error.message); }
    finally { setUploading(false); }
  }
  async function submit(event) {
    event.preventDefault(); setSaving(true);
    try {
      const url = initialData ? `/api/studios/${initialData._id}` : "/api/studios";
      await apiRequest(url, { method: initialData ? "PATCH" : "POST", body: JSON.stringify(form) });
      toast.success(initialData ? "Studio updated successfully." : "Studio listed successfully.");
      router.push("/my-listings"); router.refresh();
    } catch (error) { toast.error(error.message); }
    finally { setSaving(false); }
  }
  return <form className="form-card studio-form" onSubmit={submit}>
    <div className="form-grid">
      <label>Studio title<input name="title" value={form.title} onChange={change} placeholder="e.g. The Golden Hour Studio" required/></label>
      <label>Category<select name="category" value={form.category} onChange={change}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
      <label>Hourly rate ($)<input name="hourlyRate" type="number" min="1" value={form.hourlyRate} onChange={change} required/></label>
      <label>Security deposit ($)<input name="securityDeposit" type="number" min="0" value={form.securityDeposit} onChange={change}/></label>
      <label>Maximum capacity<input name="maxCapacity" type="number" min="1" value={form.maxCapacity} onChange={change}/></label>
      <label>Location / address<input name="location" value={form.location} onChange={change} placeholder="Area, city" required/></label>
    </div>
    <label>Studio image URL<input name="imageUrl" value={form.imageUrl} onChange={change} placeholder="Paste an image URL" required/></label>
    <label>Or upload an image to ImgBB<input type="file" accept="image/*" onChange={uploadImage}/><small>{uploading ? "Uploading image..." : "Choose an image file. The uploaded URL will fill the field above."}</small></label>
    <fieldset><legend>Amenities</legend><div className="amenity-options">{amenities.map((item) => <label key={item} className="check-label"><input type="checkbox" checked={form.amenities.includes(item)} onChange={() => toggleAmenity(item)}/>{item}</label>)}</div></fieldset>
    <label>Detailed overview<textarea name="overview" rows="5" value={form.overview} onChange={change} placeholder="Describe the space, equipment and what makes it useful..." required/></label>
    <div className="owner-note">Host: <strong>{session?.user?.name || "Loading..."}</strong> · {session?.user?.email || ""}</div>
    <button className="button button-primary button-wide" disabled={saving || uploading}>{saving ? "Saving..." : initialData ? "Save changes" : "Publish studio"}</button>
  </form>;
}
