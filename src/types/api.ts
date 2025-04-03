export interface IssuerResponse {
  qrCode: string;
  link: string;
  transactionId: string;
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
