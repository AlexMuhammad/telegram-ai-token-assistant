import Fastify from "fastify";
import { config } from "./config";
import { TelegramBotClient } from "./bot/client";

const fastify = Fastify({
  logger: true,
});

const telegramBot = new TelegramBotClient();

fastify.get("/", async () => {
  return { status: "OK" };
});

const start = async () => {
  try {
    await fastify.listen({ port: config.port });
    telegramBot.start();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
