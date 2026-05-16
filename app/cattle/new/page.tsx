"use client"; // Wajib karena ada state form

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { CattleService, CattleBreed, CattleHealthStatus } from "@/services/cattle.service";

export default function NewCattlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // State Form (Sesuai DTO di Service Layer)
  const [formData, setFormData] = useState({
    tag_number: "",
    name: "",
    breed: "Friesian Holstein (FH)" as CattleBreed,
    birth_date: new Date().toISOString().split("T")[0],
    status: "Healthy" as CattleHealthStatus,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await CattleService.createCattle(formData);

    if (error) {
      alert("Gagal menambah sapi: " + error.message);
      setLoading(false);
    } else {
      // Refresh dan kembali ke list
      router.push("/cattle");
      router.refresh(); 
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* --- Header & Back Button --- */}
      <div className="flex items-center gap-4">
        <Link href="/cattle" className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tambah Sapi Baru</h1>
          <p className="text-sm text-slate-500">Masukkan informasi dasar identitas sapi.</p>
        </div>
      </div>

      {/* --- Form Card --- */}
      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        
        {/* Nomor Tag */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Nomor Tag Sapi (Wajib)</label>
          <input
            required
            type="text"
            placeholder="Contoh: VET-001"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            value={formData.tag_number}
            onChange={(e) => setFormData({ ...formData, tag_number: e.target.value })}
          />
        </div>

        {/* Nama Sapi */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Nama Sapi (Opsional)</label>
          <input
            type="text"
            placeholder="Contoh: Si Manis"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Ras Sapi */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Ras / Breed</label>
            <select
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value as CattleBreed })}
            >
              <option>Friesian Holstein (FH)</option>
              <option>Jersey</option>
              <option>Brown Swiss</option>
              <option>Ayrshire</option>
              <option>Guernsey</option>
              <option>Peranakan Friesian Holstein (PFH)</option>
            </select>
          </div>

          {/* Tanggal Lahir */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Tanggal Lahir</label>
            <input
              required
              type="date"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              value={formData.birth_date}
              onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            disabled={loading}
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-500 py-3 text-sm font-bold text-slate-900 shadow-md transition-all hover:bg-yellow-400 active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            {loading ? "Menyimpan Data..." : "Simpan Data Sapi"}
          </button>
        </div>
      </form>
    </div>
  );
}