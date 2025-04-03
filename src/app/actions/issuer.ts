"use server";

import { issueCard, getNonceStatus } from "@/utils/api";
import { ClaimFormData, IssuerResponse } from "@/types/api";

export async function issueCardAction(
  data: ClaimFormData
): Promise<IssuerResponse> {
  try {
    return await issueCard(data);
  } catch (error) {
    console.error("Error in issueCardAction:", error);
    throw new Error("領取卡片失敗，請稍後再試");
  }
}

export async function getNonceStatusAction(
  nonceId: string
): Promise<IssuerResponse> {
  try {
    return await getNonceStatus(nonceId);
  } catch (error) {
    console.error("Error in getNonceStatusAction:", error);
    throw new Error("獲取卡片狀態失敗，請稍後再試");
  }
}
