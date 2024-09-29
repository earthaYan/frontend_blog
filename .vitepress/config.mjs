import { defineConfig } from "vitepress";
import sidebar from "./sidebar.json";
import nav from "./nav.json";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "learning blog",
  description: "a blog powered by vitePress",
  srcDir: "./docs",
  base: "/learning_blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
