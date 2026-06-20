"use server";

import { createServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function kategorieAnlegen(data: FormData): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase.from("kategorien").insert({
    rubrik_id: data.get("rubrik_id") as string,
    name: data.get("name") as string,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/ersteller/kategorien");
}

export async function kategorieLoeschen(id: string): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase.from("kategorien").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/ersteller/kategorien");
}
