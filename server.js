import express from "express";
import http from "http";
import { Server as socketIO } from "socket.io";
import eiows from "eiows";
import htmlServe from "./server/middlewares/htmlServe.cjs";
import env from "./server/env.cjs";
import authRoute from "./server/routes/http/auth.route.cjs"
import socketAuth from "./server/middlewares/socketAuth.cjs";
import watch from "./server/routes/websockets/watch.cjs";
import disconnect from "./server/routes/websockets/disconnect.cjs";
import stream from "./server/routes/websockets/stream.cjs";
import action from "./server/routes/websockets/action.cjs";

// Create http server
const app = express();
app.use(express.json());
const server = http.createServer(app);

// Create socket server
const io = new socketIO(server, {
  wsEngine: eiows.Server,
});

// Add Vite or respective production middlewares
let vite;
if (env.NODE_ENV !== "production") {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base: env.BASE,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(env.BASE, sirv("./dist/client", { extensions: [] }));
}

// Routes
app.post("/auth/login", authRoute.login);
app.post("/auth/refresh", authRoute.refresh);

// Serve HTML
app.use("*", htmlServe(vite));

// Start http server
server.listen(env.PORT, () => {
  console.info(`Server started at http://localhost:${env.PORT}`);
});

// Socket Auth Middleware
io.use(socketAuth);

// Socket Handlers
io.on("connection", (socket) => {
  console.debug("User connected", socket.id, io.engine.clientsCount);
  io.sockets.emit("userConnected", { numberOfUsers: io.engine.clientsCount });

  socket.on("watch", watch(io, socket));

  socket.on("disconnect", disconnect(io, socket));

  socket.on("stream", stream(io, socket));

  socket.on("action", action(io, socket));
});
