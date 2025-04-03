import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            領取你的網貓伺服器金鑰
          </h1>
          <div className="text-gray-800 flex flex-col gap-3">
            <p>數位皮夾是由數位發展部開發的去中心化憑證發行與認證系統</p>
            <p>
              <a
                className="text-blue-500 underline"
                href="https://www.wallet.gov.tw/"
              >
                政府官網介紹
              </a>
            </p>
            <p>
              在這個網站，你能夠拿到一張我發行的
              <strong>網貓伺服器金鑰卡</strong>，放在你的數位皮夾之中
            </p>
            <p>快來體驗看看吧！</p>
          </div>
          <div className="space-y-4 mt-5">
            <Link
              href="/claim"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              領取卡片
            </Link>
            <button
              disabled
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 opacity-50 cursor-not-allowed"
            >
              進入系統（開發中）
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
