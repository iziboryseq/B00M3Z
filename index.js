const mineflayer = require("mineflayer");

const LOGIN_COMMAND = process.env.COMMAND;

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.USERNAME,
    version: process.env.VERSION,
    chat: process.env.CHAT,
    viewDistance: process.env.VIEWDISTANCE,
    physicsEnabled: false,
    hideErrors: false,
  });

  bot.once("spawn", async () => {
    setTimeout(() => {
      bot.chat(LOGIN_COMMAND); //logging
    }, 4000);

    setTimeout(async () => {
      try {
        await bot.activateItem(); // opening mode menu
      } catch (err) {
        console.error(err);
      }
    }, 6000);
  });

  bot.once("windowOpen", async (window) => {
    setTimeout(async () => {
      try {
        await bot.clickWindow(19, 0, 0); // selecting mode
      } catch (err) {
        console.error(err);
      }
    }, 3000);
  });

  bot.on("spawn", () => {
    console.log("Spawned");
  });

    bot.on("error", (r) => {
    console.log(r);
  });

    bot.on("kicked", (r) => {
    console.log(r);
  });

  bot.on("end", (r) => {
    console.log(r + " Reconnecting...");
    setTimeout(() => process.exit(1), 30_000);
  });
}

createBot();
