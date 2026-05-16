// ============================================================
// VETSTRIP — Cattle List (Presentation Layer)
// Server Component: Fetching data langsung di server (Zero-JS UI)
// ============================================================
import { Plus, Search, Activity, MoreVertical, Inbox } from "lucide-react";
import { CattleService } from "@/services/cattle.service";
import Link from "next/link";

export default async function CattleListPage() {
  // 1. Fetch data langsung via Service Layer (Clean Architecture)
  const { data: cattles, error } = await CattleService.getAllCattles();

  // 2. Edge Case: Handling jika database gagal ditarik
  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <Activity className="mb-2 h-10 w-10 text-red-500" />
        <h2 className="text-lg font-bold text-red-700">Koneksi Database Gagal</h2>
        <p className="text-sm text-red-600">{error.message}</p>
      </div>
    );
  }

  // 3. Edge Case: Handling jika data sapi masih kosong (Empty State)
  if (!cattles || cattles.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader title="Manajemen Sapi" description="Daftar seluruh sapi perah di peternakan." />
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-24 text-center">
          <div className="mb-4 rounded-full bg-slate-100 p-4">
            <Inbox className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Belum ada data sapi</h3>
          <p className="mt-1 text-sm text-slate-500">Mulai pantau kesehatan peternakan Anda dengan menambahkan data sapi pertama.</p>
          <div className="mt-6">
            <Link 
            href="/cattle/new" 
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-slate-900 transition-all hover:bg-yellow-400 active:scale-95 shadow-sm"
            >
            <Plus className="h-4 w-4" />
            <span>Tambah Sapi Pertama</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Main UI: Jika data berhasil ditarik dan ada isinya
  return (
    <div className="space-y-6">
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader title="Manajemen Sapi" description={`Menampilkan total ${cattles.length} sapi perah.`} />
        <Link href="/cattle/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Tambah Sapi
        </Link>
      </div>

      {/* --- KONTROL TABEL (Search & Filter) --- */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 p-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nomor tag atau nama..."
              className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* --- TABEL DATA --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Nomor Tag</th>
                <th className="px-6 py-4 font-semibold">Nama / Ras</th>
                <th className="px-6 py-4 font-semibold">Usia / Tgl Lahir</th>
                <th className="px-6 py-4 font-semibold">Status Kesehatan</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {cattles.map((cattle) => (
                <tr key={cattle.id} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                    #{cattle.tag_number}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{cattle.name || "Tanpa Nama"}</div>
                    <div className="text-xs text-slate-500">{cattle.breed}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900">{calculateAge(cattle.birth_date)}</div>
                    <div className="text-xs text-slate-500">{cattle.birth_date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(cattle.status)}`}>
                      {cattle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── UTILITIES (Fungsi Pembantu khusus UI) ────────────────────────

// Reusable Header UI
function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
}

// Helper: Menghitung umur sapi
function calculateAge(birthDateString: string): string {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age === 0 ? "Kurang dari 1 tahun" : `${age} tahun`;
}

// Helper: Mewarnai badge berdasarkan Status Kesehatan Sapi
function getStatusColor(status: string) {
  switch (status) {
    case "Healthy": return "cattle-active";     // Hijau
    case "Monitoring": return "status-suspect"; // Kuning/Amber
    case "Sick": return "cattle-sick";          // Merah
    default: return "cattle-inactive";          // Abu-abu
  }
}