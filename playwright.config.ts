import { defineConfig } from "@playwright/test";

export default defineConfig({
    use:{
        trace : "on",
        coverage: true,
    },
    reporter: [["html"]],
})