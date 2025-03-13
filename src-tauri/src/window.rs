use tauri::{AppHandle, Manager, WebviewWindowBuilder, WebviewUrl, WebviewWindow};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct WindowOptions {
    pub title: Option<String>,
    pub width: Option<f64>,
    pub height: Option<f64>,
    pub resizable: Option<bool>,
    pub center: Option<bool>,
    pub always_on_top: Option<bool>,
    pub visible: Option<bool>,
    pub decorations: Option<bool>,
    pub transparent: Option<bool>,
    pub fullscreen: Option<bool>,
    pub maximized: Option<bool>,
    pub focus: Option<bool>,
    pub skip_taskbar: Option<bool>,
}

impl Default for WindowOptions {
    fn default() -> Self {
        Self {
            title: Some("窗口".to_string()),
            width: Some(800.0),
            height: Some(600.0),
            resizable: Some(true),
            center: Some(true),
            always_on_top: Some(false),
            visible: Some(true),
            decorations: Some(true),
            transparent: Some(false),
            fullscreen: Some(false),
            maximized: Some(false),
            focus: Some(true),
            skip_taskbar: Some(false),
        }
    }
}

pub async fn create_window(
    app: &AppHandle,
    label: &str,
    url: &str,
    options: Option<WindowOptions>,
) -> Result<WebviewWindow, String> {
    let options = options.unwrap_or_default();
    let webview_url = WebviewUrl::App(url.into());
    
    let mut builder = WebviewWindowBuilder::new(app, label, webview_url);

    // 应用窗口选项
    if let Some(title) = options.title {
        builder = builder.title(title);
    }
    if let Some(width) = options.width {
        builder = builder.inner_size(width, options.height.unwrap_or(600.0));
    }
    if let Some(resizable) = options.resizable {
        builder = builder.resizable(resizable);
    }
    if let Some(center) = options.center {
        if center {
            builder = builder.center();
        }
    }
    if let Some(always_on_top) = options.always_on_top {
        builder = builder.always_on_top(always_on_top);
    }
    if let Some(visible) = options.visible {
        builder = builder.visible(visible);
    }
    if let Some(decorations) = options.decorations {
        builder = builder.decorations(decorations);
    }
    if let Some(transparent) = options.transparent {
        builder = builder.transparent(transparent);
    }
    if let Some(fullscreen) = options.fullscreen {
        builder = builder.fullscreen(fullscreen);
    }
    if let Some(maximized) = options.maximized {
        builder = builder.maximized(maximized);
    }
    if let Some(skip_taskbar) = options.skip_taskbar {
        builder = builder.skip_taskbar(skip_taskbar);
    }

    builder
        .build()
        .map_err(|e| e.to_string())
}

pub async fn close_window(app: &AppHandle, label: &str) -> Result<(), String> {
    if let Some(window) = app.get_webview_window(label) {
        window.close().map_err(|e| e.to_string())?;
    }
    Ok(())
}

pub async fn show_window(app: &AppHandle, label: &str) -> Result<(), String> {
    if let Some(window) = app.get_webview_window(label) {
        window.show().map_err(|e| e.to_string())?;
    }
    Ok(())
}

pub async fn hide_window(app: &AppHandle, label: &str) -> Result<(), String> {
    if let Some(window) = app.get_webview_window(label) {
        window.hide().map_err(|e| e.to_string())?;
    }
    Ok(())
}

pub async fn is_window_visible(app: &AppHandle, label: &str) -> Result<bool, String> {
    Ok(app.get_webview_window(label).map(|w| w.is_visible().unwrap_or(false)).unwrap_or(false))
} 