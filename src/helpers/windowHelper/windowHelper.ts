import { invoke } from "@tauri-apps/api/core";

export interface WindowOptions {
  title?: string;
  width?: number;
  height?: number;
  resizable?: boolean;
  center?: boolean;
  alwaysOnTop?: boolean;
  visible?: boolean;
  decorations?: boolean;
  transparent?: boolean;
  fullscreen?: boolean;
  maximized?: boolean;
  focus?: boolean;
  skipTaskbar?: boolean;
}

export class WindowManager {
  private static instance: WindowManager;
  private constructor() {}

  public static getInstance(): WindowManager {
    if (!WindowManager.instance) {
      WindowManager.instance = new WindowManager();
    }
    return WindowManager.instance;
  }

  /**
   * 打开新窗口
   */
  public async openWindow(
    label: string,
    url: string,
    options?: WindowOptions
  ): Promise<void> {
    try {
      await invoke("open_window", {
        label,
        url,
        options: this.convertOptions(options),
      });
    } catch (e) {
      console.error("Failed to open window:", e);
      throw e;
    }
  }

  /**
   * 关闭窗口
   */
  public async closeWindow(label: string): Promise<void> {
    try {
      await invoke("close_window_command", { label });
    } catch (e) {
      console.error("Failed to close window:", e);
      throw e;
    }
  }

  /**
   * 显示窗口
   */
  public async showWindow(label: string): Promise<void> {
    try {
      await invoke("show_window_command", { label });
    } catch (e) {
      console.error("Failed to show window:", e);
      throw e;
    }
  }

  /**
   * 隐藏窗口
   */
  public async hideWindow(label: string): Promise<void> {
    try {
      await invoke("hide_window_command", { label });
    } catch (e) {
      console.error("Failed to hide window:", e);
      throw e;
    }
  }

  /**
   * 检查窗口是否可见
   */
  public async isWindowVisible(label: string): Promise<boolean> {
    try {
      return await invoke("is_window_visible_command", { label });
    } catch (e) {
      console.error("Failed to check window visibility:", e);
      throw e;
    }
  }

  /**
   * 转换选项格式
   */
  private convertOptions(options?: WindowOptions): WindowOptions | undefined {
    if (!options) return undefined;

    return {
      ...options,
      always_on_top: options.alwaysOnTop,
      skip_taskbar: options.skipTaskbar,
    };
  }
}

// 导出单例实例
export const windowManager = WindowManager.getInstance();

// 导出便捷函数
export async function openWindow(
  label: string,
  url: string,
  options?: WindowOptions
): Promise<void> {
  return windowManager.openWindow(label, url, options);
}

export async function closeWindow(label: string): Promise<void> {
  return windowManager.closeWindow(label);
}

export async function showWindow(label: string): Promise<void> {
  return windowManager.showWindow(label);
}

export async function hideWindow(label: string): Promise<void> {
  return windowManager.hideWindow(label);
}

export async function isWindowVisible(label: string): Promise<boolean> {
  return windowManager.isWindowVisible(label);
}
