import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./controllers/socketmanager.js";
import userRoutes from "./routes/users.routes.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);

try {
    await mongoose.connect("mongodb+srv://khushiitiwari88_db_user:aiqGnMhTTyuPpDFC@video-conference-app.tufz0oz.mongodb.net/?appName=Video-Conference-App");
    console.log("mongo connected");

    const PORT = app.get("port");
    server.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    });
} catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
}