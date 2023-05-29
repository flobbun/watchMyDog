const env = require("../env.cjs");
const fs = require("node:fs/promises");
const getProductionAssets = require("../helpers/getProductionAssets.cjs");
const config = require("../config.cjs");

const {
    templateHtml,
    ssrManifest,
} = getProductionAssets();

const htmlServe = (viteInstance) => {
    return async (req, res) => {
        try {
            const url = req.originalUrl.replace(env.BASE, "");

            let template;
            let render;
            if (env.NODE_ENV !== "production") {
                // Always read fresh template in development
                template = await fs.readFile("./index.html", "utf-8");
                template = await viteInstance.transformIndexHtml(url, template);
                render = (await viteInstance.ssrLoadModule(config.ENTRY_SERVER_PATH)).render;
            } else {
                template = templateHtml;
                render = (await import(config.ENTRY_SERVER_TARGET_PATH)).render;
            }

            const rendered = await render(url, ssrManifest);

            const html = template
                .replace(`<!--app-head-->`, rendered.head ?? "")
                .replace(`<!--app-html-->`, rendered.html ?? "");

            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e) {
            viteInstance?.ssrFixStacktrace(e);
            console.log(e.stack);
            res.status(500).end(e.stack);
        }
    }
}

module.exports = htmlServe;