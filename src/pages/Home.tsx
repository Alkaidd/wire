import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">欢迎来到首页</h1>
      <p className="text-gray-600">
        这是一个使用 Tauri + React + UnoCSS 构建的应用
      </p>
    </div>
  );
}
