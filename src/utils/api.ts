import { accessToken } from "@/app/config";
import {
  IssuerResponse,
  VerifierResponse,
  VerificationResult,
  ClaimFormData,
} from "@/types/api";

const ISSUER_API_BASE = "https://issuer-sandbox.wallet.gov.tw";
const VERIFIER_API_BASE = "https://verifier-sandbox.wallet.gov.tw";

export async function issueCard(data: ClaimFormData): Promise<IssuerResponse> {
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const response = await fetch(`${ISSUER_API_BASE}/api/vc-item-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Token": accessToken,
    },
    body: JSON.stringify({
      vcId: 240960,
      vcCid: "wancat_server_key",
      fields: [
        {
          type: "BASIC",
          cname: "姓名",
          ename: "name",
          content: data.name,
        },
        {
          type: "NORMAL",
          cname: "發證日期",
          ename: "issued_at",
          content: currentDate,
        },
      ],
    }),
  });

  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to issue card");
  }

  const { qrCode, deepLink: link, transactionId } = await response.json();
  return { qrCode, link, transactionId };
}

export async function getNonceStatus(nonceId: string): Promise<IssuerResponse> {
  const response = await fetch(
    `${ISSUER_API_BASE}/api/credential/nonce/${nonceId}`
  );

  if (!response.ok) {
    throw new Error("Failed to get nonce status");
  }

  return response.json();
}

export async function getVerificationQR(): Promise<VerifierResponse> {
  const response = await fetch(`${VERIFIER_API_BASE}/api/oidvp/qr-code`);

  if (!response.ok) {
    throw new Error("Failed to get verification QR code");
  }

  return response.json();
}

export async function getVerificationResult(): Promise<VerificationResult> {
  const response = await fetch(`${VERIFIER_API_BASE}/api/oidvp/result`);

  if (!response.ok) {
    throw new Error("Failed to get verification result");
  }

  return response.json();
}
