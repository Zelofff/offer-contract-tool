import Fastify from "fastify";
import cors from "@fastify/cors";

import { analysesRoutes } from "./routes/analyses";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: "http://localhost:5173",
});

app.register(analysesRoutes, { prefix: "/analyses" });

app.get("/health", async () => {
  return { ok: true };
});

app.listen({ port: 3001, host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
