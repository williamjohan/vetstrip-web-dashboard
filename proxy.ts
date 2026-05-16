// ============================================================
// VETSTRIP — proxy.ts (root level)
// Wajib: refresh Supabase session di setiap request
// ============================================================
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// 👇 INI YANG DIUBAH: Dari 'middleware' menjadi 'proxy' 👇
export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — JANGAN tambahkan logic lain di antara ini
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ============================================================
  // 🚨 DEVELOPMENT BYPASS: Auth Guard dimatikan sementara
  // agar kita bisa fokus membangun UI Dashboard tanpa harus login.
  // Nanti kita nyalakan lagi saat halaman /login sudah dibuat.
  // ============================================================
  /*
  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  */

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Skip Next.js internals dan static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};