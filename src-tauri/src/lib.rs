// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod config;
mod window;

use config::ConfigManager;
use window::{create_window, WindowOptions, close_window, show_window, hide_window, is_window_visible};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_window(
    app: tauri::AppHandle,
    label: String,
    url: String,
    options: Option<WindowOptions>,
) -> Result<(), String> {
    create_window(&app, &label, &url, options).await?;
    Ok(())
}

#[tauri::command]
async fn close_window_command(app: tauri::AppHandle, label: String) -> Result<(), String> {
    close_window(&app, &label).await
}

#[tauri::command]
async fn show_window_command(app: tauri::AppHandle, label: String) -> Result<(), String> {
    show_window(&app, &label).await
}

#[tauri::command]
async fn hide_window_command(app: tauri::AppHandle, label: String) -> Result<(), String> {
    hide_window(&app, &label).await
}

#[tauri::command]
async fn is_window_visible_command(app: tauri::AppHandle, label: String) -> Result<bool, String> {
    is_window_visible(&app, &label).await
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            // 初始化配置
            tauri::async_runtime::block_on(async {
                if let Err(e) = ConfigManager::new(app.handle()).init().await {
                    eprintln!("Failed to initialize config: {}", e);
                }
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            open_window,
            close_window_command,
            show_window_command,
            hide_window_command,
            is_window_visible_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
