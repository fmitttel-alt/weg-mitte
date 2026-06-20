import { createServerClient } from "@/lib/supabase";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import InhaltEditor from "./InhaltEditor";

export const dynamic = "force-dynamic";

export default async function InhaltDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: inhalt } = await supabase
    .from("inhalte")
    .select("*, rubriken(slug, name)")
    .eq("id", id)
    .single();

  if (!inhalt) notFound();

  return (
    <div>
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/ersteller/inhalte" className="hover:text-gray-700">
          Inhalte
        </Link>
        <span>/</span>
        <span className="text-gray-700">{inhalt.titel}</span>
      </div>

      <InhaltEditor inhalt={inhalt} />
    </div>
  );
}
