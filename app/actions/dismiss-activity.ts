"use server";

import { revalidatePath } from "next/cache";
import { dismissActivity } from "@/lib/data";

export async function dismissActivityAction(
  activityId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await dismissActivity(activityId);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to dismiss activity:", error);
    return { success: false, error: "Failed to dismiss activity" };
  }
}
