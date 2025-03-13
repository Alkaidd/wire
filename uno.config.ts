import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  // 自定义规则
  rules: [
    // 在这里添加自定义规则
  ],
  // 自定义快捷方式
  shortcuts: {
    // 在这里添加自定义快捷方式
  },
});
