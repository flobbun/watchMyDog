const dotenv = require("dotenv");

dotenv.config();

const env = {
    PASSWORD: process.env.PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 5173,
    BASE: process.env.BASE || "/"
}

Object.freeze(env);

Object.keys(env).forEach(key => {
    if (env[key] === undefined) {
        throw new Error(`Environment variable ${key} is not defined`);
    }
});

module.exports = env;