"use server";

import { createServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function bedeutungstextSpeichern(wert: string): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("design_einstellungen")
    .upsert({ schluessel: "bedeutungstext", wert }, { onConflict: "schluessel" });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/ersteller/design");
}
