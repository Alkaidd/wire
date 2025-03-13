import { useState } from "react";
import { saveConfig } from "../helpers/configHelper/configHelper";
import type { Config } from "../helpers/configHelper/Type";
import { Window } from "@tauri-apps/api/window";

export default function Config() {
  const [sourceSrc, setSourceSrc] = useState("");
  const appWindow = new Window("config");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const confirmed = await ask("确定要保存这些配置吗？", {
    //   title: "确认保存",
    //   type: "info",
    // });

    const config: Config = {
      sourceSrc,
    };
    await saveConfig(config);
    await appWindow.close();
  };

  const handleCancel = async () => {
    // const confirmed = await ask("确定要取消编辑吗？未保存的更改将会丢失。", {
    //   title: "确认取消",
    //   type: "warning",
    // });

    await appWindow.close();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">配置</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            源目录
          </label>
          <input
            type="text"
            value={sourceSrc}
            onChange={(e) => setSourceSrc(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入源目录路径"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            取消
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
