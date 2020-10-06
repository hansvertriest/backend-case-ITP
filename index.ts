import { createServer } from "./src/server";

process.env.DB_USER

const PORT = 8080;
const server = createServer();

// establish connection

const config = {
  server: process.env.DB_SERVER,
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER, // update me
      password: process.env.DB_PASSWORD // update me
    }
  }
}


server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running (see http://localhost:${PORT})`);
});

process.on("uncaughtException", (error) => {
  console.log("Server closed because uncaughtException.");
  server.close();
  throw error;
});
process.on("unhandledRejection", (reason) => {
  console.log("Server closed because unhandledRejection.");
  server.close();
  throw reason;
});
process.on("SIGINT", () => {
  console.log("Server closed because interrupted (SIGINT).");
  server.close();
});
process.on("SIGTERM", () => {
  console.log("Server closed because terminated (SIGTERM).");
  server.close();
});
