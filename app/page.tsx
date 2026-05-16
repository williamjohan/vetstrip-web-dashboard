import { Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10 ring-4 ring-yellow-500/20">
        <Zap className="h-8 w-8 text-yellow-500" />
      </div>
      <h1 className="text-2xl font-bold text-slate-800">
        Selamat Datang di VETSTRIP Dashboard
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Arsitektur layout UGM Heritage berhasil di-deploy. Silakan pilih menu di sidebar untuk mulai mengelola data kesehatan sapi perah Anda.
      </p>
    </div>
  );
}