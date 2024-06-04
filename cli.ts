import { Command } from "https://deno.land/x/cliffy/command/mod.ts";
import { runServer } from "./app.js";

const { args } = Deno;
const port = args[0] || 3000;

async function run() {
  const command = new Command()
    .name("testrail-google-sheets-addon-backend")
    .version("0.1.0")
    .description("Testrail google sheets addon's proxy server.")
    .option("-p, --port <port:number>", "Port to start the server on", {
      default: 3000,
    })
    .action(async ({ port }) => {
      await runServer(port);
    });

  await command.parse(Deno.args);
}

run();
