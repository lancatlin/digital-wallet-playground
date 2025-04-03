"use server";

import { getVerificationQR, getVerificationResult } from "@/utils/api";
import { VerifierResponse, VerificationResult } from "@/types/api";

export async function getVerificationQRAction(): Promise<VerifierResponse> {
  try {
    return await getVerificationQR();
  } catch (error) {
    console.error("Error in getVerificationQRAction:", error);
    throw new Error("獲取驗證碼失敗，請稍後再試");
  }
}

export async function getVerificationResultAction(): Promise<VerificationResult> {
  try {
    return await getVerificationResult();
  } catch (error) {
    console.error("Error in getVerificationResultAction:", error);
    throw new Error("獲取驗證結果失敗，請稍後再試");
  }
}
