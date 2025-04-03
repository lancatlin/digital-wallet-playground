"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getVerificationResultAction } from "@/app/actions/verifier";
import { VerificationResult } from "@/types/api";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkResult = async () => {
      try {
        const verificationResult = await getVerificationResultAction();
        setResult(verificationResult);
      } catch (error) {
        console.error("Error checking verification result:", error);
        setError("獲取驗證結果失敗，請稍後再試");
      } finally {
        setLoading(false);
      }
    };

    checkResult();
  }, []);

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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">驗證結果</h1>
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
              <div
                className={`p-4 rounded-lg ${
                  result?.verified ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <p
                  className={`text-lg font-medium ${
                    result?.verified ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {result?.verified ? "驗證成功" : "驗證失敗"}
                </p>
                <p className="mt-2 text-sm text-gray-600">{result?.message}</p>
              </div>
              <button
                onClick={() => router.push("/")}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                返回首頁
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
