import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export const analysesRoutes = async (app: FastifyInstance) => {
  app.post("/", async (request, reply) => {
    const bodySchema = z.object({
      title: z.string().min(1),
      sourceText: z.string().min(1),
    });

    const body = bodySchema.parse(request.body);

    const analysis = await prisma.analysis.create({
      data: {
        title: body.title,
        sourceText: body.sourceText,
      },
    });

    return reply.code(201).send(analysis);
  });

  app.get("/", async () => {
    const analyses = await prisma.analysis.findMany({
      orderBy: { createdAt: "desc" },
    });

    return analyses;
  });

  app.get("/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const analysis = await prisma.analysis.findUnique({
      where: { id },
    });

    if (!analysis) {
      return reply.code(404).send({ message: "Analysis not found" });
    }

    return analysis;
  });
};
