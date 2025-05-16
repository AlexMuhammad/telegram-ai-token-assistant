import Fastify from "fastify";
import { config } from "./config";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async () => {
  return { status: "OK" };
});

const start = async () => {
  try {
    await fastify.listen({ port: config.port });
    console.log(`Server listening on port ${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
