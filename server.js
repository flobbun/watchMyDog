import fs from "node:fs/promises";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server as socketIO } from "socket.io";
import jwt from "jsonwebtoken";
import eiows from "eiows";

dotenv.config();

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/ssr-manifest.json", "utf-8")
  : undefined;

// Create http server
const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new socketIO(server, {
  wsEngine: eiows.Server,
});

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// JWT
const signToken = () =>
  jwt.sign(
    {
      password: process.env.PASSWORD,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
};

// Auth routes
app.post("/auth/login", (req, res) => {
  const { password } = req.body || {};
  if (password === process.env.PASSWORD) {
    res.status(200).json({ token: signToken() });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
});

app.post("/auth/refresh", (req, res) => {
  const { token } = req.body || {};
  if (!verifyToken(token)) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
  res
    .json({
      token: signToken(),
    })
    .status(200);
});

// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
server.listen(port, () => {
  console.info(`Server started at http://localhost:${port}`);
});

// Socket.io
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (verifyToken(token)) {
    next();
  } else {
    next(new Error("Authentication error"));
    socket.disconnect(true);
  }
});

io.on("connection", (socket) => {
  console.debug("User connected", socket.id, io.engine.clientsCount);
  io.sockets.emit("userConnected", { numberOfUsers: io.engine.clientsCount });

  socket.on("watch", () => {
    socket.join("watchers");
    console.debug("User joined room", socket.id);
  });

  socket.on("disconnect", () => {
    io.sockets.emit("userDisconnected", {
      numberOfUsers: io.engine.clientsCount,
    });
    console.debug("User disconnected", socket.id, io.engine.clientsCount);
  });

  socket.on("stream", (data) => {
    socket.leave("watchers");
    socket.to("watchers").emit("stream", {data, id: socket.id});
  });

  socket.on("action", (action) => {
    socket.broadcast.emit("action", action);
  });
});
