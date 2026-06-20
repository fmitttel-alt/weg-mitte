"use server";

import { createServerClient } from "@/lib/supabase";

export async function inhaltAnlegen(data: FormData): Promise<string> {
  const supabase = createServerClient();

  const { data: inhalt, error } = await supabase
    .from("inhalte")
    .insert({
      rubrik_id: data.get("rubrik_id") as string,
      typ: data.get("typ") as string,
      titel: data.get("titel") as string,
      veroeffentlicht: false,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return inhalt.id;
}

export async function inhaltSpeichern(id: string, data: FormData): Promise<void> {
  const supabase = createServerClient();

  const { error } = await supabase
    .from("inhalte")
    .update({
      titel: data.get("titel") as string,
      text: data.get("text") as string,
      veroeffentlicht: data.get("veroeffentlicht") === "true",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function inhaltLoeschen(id: string): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase.from("inhalte").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
