const authHelper = require("../../helpers/auth.cjs");

const login = (req, res) => {
    const { password } = req.body || {};
    if (password === process.env.PASSWORD) {
        res.status(200).json({ token: authHelper.signToken() });
    } else {
        res.status(401).json({ message: "Invalid password" });
    }
}

const refresh = (req, res) => {
    const { token } = req.body || {};
    if (!authHelper.verifyToken(token)) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
    res
        .json({
            token: authHelper.signToken(),
        })
        .status(200);
}

module.exports = {
    login,
    refresh,
}