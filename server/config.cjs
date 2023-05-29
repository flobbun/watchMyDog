const config = {
    /** 
        File locations
        ⚠️ These paths are relative to the file where they are used
    */
    ENTRY_SERVER_PATH: "/client/entry-server.tsx",
    ENTRY_SERVER_TARGET_PATH: "./dist/server/entry-server.js",
    INDEX_HTML_PATH: "",
    SSR_MANIFEST_PATH: "",
}

Object.freeze(config);

module.exports = config;