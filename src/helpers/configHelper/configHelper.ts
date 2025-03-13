import {
  BaseDirectory,
  exists,
  readFile,
  writeFile,
} from "@tauri-apps/plugin-fs";
import { Config } from "./Type";
import { openWindow } from "../windowHelper/windowHelper";

export async function initConfig() {
  const isConfigExist = await exists("config.conf", {
    baseDir: BaseDirectory.AppData,
  });
  if (isConfigExist) {
    const fileBuffer = await readFile("config.conf", {
      baseDir: BaseDirectory.AppData,
    });
    const config: Config = JSON.parse(fileBuffer.toString());
    if (!config.sourceSrc) {
      openSetConfigWindow();
      return;
    }
  } else {
    openSetConfigWindow();
    return;
  }
}

export async function saveConfig(config: Config) {
  const configStr = JSON.stringify(config);
  await writeFile("config.conf", new TextEncoder().encode(configStr), {
    baseDir: BaseDirectory.AppData,
  });
  return true;
}

export async function openSetConfigWindow() {
  try {
    await openWindow("config", "/config", {
      title: "配置",
      width: 400,
      height: 300,
      resizable: false,
      center: true,
    });
  } catch (e) {
    console.error("Failed to open config window:", e);
  }
}
