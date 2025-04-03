import {
  IssuerResponse,
  VerifierResponse,
  VerificationResult,
  ClaimFormData,
} from "@/types/api";

const ISSUER_API_BASE = "https://issuer-sandbox.wallet.gov.tw";
const VERIFIER_API_BASE = "https://verifier-sandbox.wallet.gov.tw";

export async function issueCard(data: ClaimFormData): Promise<IssuerResponse> {
  const response = await fetch(`${ISSUER_API_BASE}/api/vs-item-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to issue card");
  }

  return response.json();
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
