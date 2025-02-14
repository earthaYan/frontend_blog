import { defineConfig } from "vitepress";
import sidebar from "./sidebar.json";
import nav from "./nav.json";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "frontend  blog",
  description: "a blog powered by vitePress",
  srcDir: "./docs",
  base: "/frontend_blog",
  head: [["link", { rel: "icon", href: "/frontend_blog/favicon.ico" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    logo: "/doraemon.png",
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
  },
});
