"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { issueCardAction } from "@/app/actions/issuer";
import Image from "next/image";
import { ClaimFormData } from "@/types/api";

export default function ClaimPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [link, setLink] = useState("");

  const validateName = (name: string): boolean => {
    // Regular expression for Chinese characters, English letters, and underscores
    const nameRegex = /^[\u4e00-\u9fa5a-zA-Z_]+$/;
    return nameRegex.test(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate name before submitting
    if (!validateName(name)) {
      setError("姓名只能包含中文字、英文字母和底線");
      setLoading(false);
      return;
    }

    try {
      const formData: ClaimFormData = { name };
      const response = await issueCardAction(formData);
      setQrCode(response.qrCode);
      setLink(response.link);
    } catch (error) {
      console.error("Error issuing card:", error);
      setError("領取卡片失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">領取卡片</h1>
          {!qrCode ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  姓名（限中英文與底線）
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-black focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "處理中..." : "領取"}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <p className="text-gray-900">
                開啟數位皮夾 App 掃描以下 QR Code{" "}
              </p>
              <p>
                <a
                  className="text-blue-500 underline"
                  href="https://www.wallet.gov.tw/"
                >
                  政府官網介紹
                </a>
              </p>
              <div className="flex justify-center">
                <Image
                  src={qrCode}
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
