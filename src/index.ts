import Fastify from "fastify";
import { bot } from "./bot";

const fastify = Fastify();

fastify.get("/", async () => {
  return {
    status: "Bot is running",
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server is running on port 3000");
    await bot.start();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
