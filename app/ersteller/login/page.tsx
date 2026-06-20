import { redirect } from "next/navigation";
import { isAuthenticated, setSession } from "@/lib/auth";

export default async function LoginPage() {
  const authed = await isAuthenticated();
  if (authed) redirect("/ersteller");

  async function login(formData: FormData) {
    "use server";
    const pw = formData.get("password") as string;
    if (pw === process.env.ERSTELLER_PASSWORD) {
      await setSession();
      redirect("/ersteller");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border border-gray-200 p-8 w-full max-w-sm">
        <h1 className="text-xl font-medium mb-6">Erstellerbereich</h1>
        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="password">
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 text-sm hover:bg-gray-700 transition-colors"
          >
            Einloggen
          </button>
        </form>
      </div>
    </div>
  );
}
