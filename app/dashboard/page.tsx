export default function DashboardAnalyticPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Ringkasan Analitik
        </h1>
        <p className="text-sm text-slate-500">
          Pantau status kesehatan dan indikasi mastitis seluruh peternakan.
        </p>
      </div>
      
      {/* Nanti Claude akan membuatkan card statistik di sini */}
      <div className="h-64 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">Area Chart / Statistik akan diletakkan di sini.</p>
      </div>
    </div>
  );
}