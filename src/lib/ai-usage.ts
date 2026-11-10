import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function consumeAiRequest(
  userId: string,
  dailyLimit: number
): Promise<boolean> {
  const admin = createSupabaseAdminClient();

  const { data, error } = await admin.rpc(
    "consume_ai_daily_request",
    {
      p_user_id: userId,
      p_daily_limit: dailyLimit,
    }
  );

  if (error) {
    console.error("AI usage tracking failed:", error);
    throw new Error("Could not verify AI usage.");
  }

  return data === true;
}
