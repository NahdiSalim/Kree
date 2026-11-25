import { createApp } from "./app.js";
import { env } from "./lib/env.js";

const app = createApp();

const host = process.env.HOST || "0.0.0.0";

app.listen(env.PORT, host, () => {
  console.log(`TunisRent API listening on http://${host}:${env.PORT}`);
});
