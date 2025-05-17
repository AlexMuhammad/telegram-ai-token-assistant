import Fastify from "fastify";
import { config } from "./config";
import { TelegramBotClient } from "./bot/client";
import { TelegramHandlers } from "./bot/handlers";
import { TokenService } from "./services/token";
import { AiRepository } from "./data/repositories/ai";
import { DexScreenerRepository } from "./data/repositories/dexscreener";

const fastify = Fastify({
  logger: true,
});

const aiRepository = new AiRepository();
const dexScreenerRepository = new DexScreenerRepository();

const tokenService = new TokenService(dexScreenerRepository, aiRepository);

const telegramHandlers = new TelegramHandlers(tokenService);
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
