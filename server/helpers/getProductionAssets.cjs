const env = require("../env.cjs");
const fs = require("node:fs/promises");
const path = require("node:path");

const indexHTMLPath = path.join(process.cwd(), "./index.html");
const ssrManifestPath = path.join(process.cwd(), "./dist/client/ssr-manifest.json");

/**
 * @description Get cached production assets for SSR
 * @returns {Promise<{templateHtml: string, ssrManifest: string}>}
 * */
const getProductionAssets = async () => {
    const templateHtml = env.NODE_ENV === "production" ? await fs.readFile(indexHTMLPath, "utf-8") : "";
    const ssrManifest = env.NODE_ENV === "production" ? await fs.readFile(ssrManifestPath, "utf-8") : undefined;

    return {
        templateHtml,
        ssrManifest,
    }
};

module.exports = getProductionAssets;