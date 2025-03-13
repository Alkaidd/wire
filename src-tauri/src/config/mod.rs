use serde::{Deserialize, Serialize};
use tauri::AppHandle;
use tauri::path::BaseDirectory;
use tauri_plugin_fs::FsExt;

#[derive(Debug, Serialize, Deserialize)]
pub struct AppConfig {
    pub version: String,
    pub last_updated: String,
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            version: "1.0".to_string(),
            last_updated: chrono::Local::now().to_rfc3339(),
        }
    }
}

pub struct ConfigManager<'a> {
    app: &'a AppHandle,
}

impl<'a> ConfigManager<'a> {
    pub fn new(app: &'a AppHandle) -> Self {
        Self { app }
    }

    pub async fn init(&self) -> Result<(), Box<dyn std::error::Error>> {
        Ok(())
    }
}
