import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            return require("./node_modules/cypress-fs/plugins/index.js")(
                on,
                config
            );
        },
        baseUrl: "http://localhost:3000",
    },
});
