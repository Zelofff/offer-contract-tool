import Fastify from "fastify";
import { analysesRoutes } from "./routes/analyses";

const app = Fastify({ logger: true });

app.register(analysesRoutes, { prefix: "/analyses" });

app.get("/health", async () => {
  return { ok: true };
});

app.listen({ port: 3001, host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
