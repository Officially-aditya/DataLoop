import "dotenv/config";

import { buildApp } from "./app";
import { getApiConfig } from "./config";

async function start() {
  const config = getApiConfig();
  const app = await buildApp(config);

  try {
    await app.listen({
      host: config.host,
      port: config.port
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void start();
