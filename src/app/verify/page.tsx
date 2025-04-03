"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getVerificationQRAction,
  getVerificationResultAction,
} from "@/app/actions/verifier";
import Image from "next/image";

export default function VerifyPage() {
  const router = useRouter();
  const [qrCode, setQrCode] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await getVerificationQRAction();
        setQrCode(response.qr_code);
        setLink(response.link);
      } catch (error) {
        console.error("Error fetching QR code:", error);
        setError("獲取驗證碼失敗，請稍後再試");
      } finally {
        setLoading(false);
      }
    };

    fetchQRCode();
  }, []);

  const handleVerify = async () => {
    try {
      const result = await getVerificationResultAction();
      if (result.verified) {
        router.push("/result");
      } else {
        setError("驗證失敗，請重試");
      }
    } catch (error) {
      console.error("Error verifying:", error);
      setError("驗證過程發生錯誤，請稍後再試");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="text-center">
          <p className="text-lg text-gray-600">載入中...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">驗證身份</h1>
          {error ? (
            <div className="space-y-4">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => router.push("/")}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                返回首頁
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <Image
                  src={`data:image/png;base64,${qrCode}`}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">或使用以下連結：</p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 break-all"
                >
                  {link}
                </a>
              </div>
              <button
                onClick={handleVerify}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                確認驗證
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
