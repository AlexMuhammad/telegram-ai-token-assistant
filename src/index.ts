import Fastify from "fastify";
import { config } from "./config";
import { TelegramBotClient } from "./bot/client";
import { TelegramHandlers } from "./bot/handlers";

const fastify = Fastify({
  logger: true,
});

const telegramHandlers = new TelegramHandlers();
const telegramBot = new TelegramBotClient(telegramHandlers);

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
