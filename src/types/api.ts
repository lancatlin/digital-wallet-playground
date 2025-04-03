export interface IssuerResponse {
  nonce_id: string;
  qr_code: string;
  link: string;
}

export interface VerifierResponse {
  qr_code: string;
  link: string;
}

export interface VerificationResult {
  verified: boolean;
  message: string;
}

export interface ClaimFormData {
  name: string;
}
