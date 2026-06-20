import { redirect } from "next/navigation";
import { isAuthenticated, clearSession } from "@/lib/auth";
import Link from "next/link";

export default async function ErstellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();
  if (!authed) redirect("/ersteller/login");

  async function logout() {
    "use server";
    await clearSession();
    redirect("/ersteller/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/ersteller" className="font-medium text-sm">
              Erstellerbereich
            </Link>
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">
              ← Zur Website
            </Link>
          </div>
          <form action={logout}>
            <button type="submit" className="text-xs text-gray-400 hover:text-gray-700">
              Ausloggen
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
