import { handlerAddFeed } from "./commands/add-feed.js";
import { handlerAgg } from "./commands/agg.js";
import { handlerFeeds } from "./commands/feeds.js";
import {
  CommandsRegistry,
  registerCommand,
  runCommand,
} from "./commands/index.js";
import { handlerLogin } from "./commands/login.js";
import { handlerRegister } from "./commands/register.js";
import { handlerReset } from "./commands/reset.js";
import { handlerUsers } from "./commands/users.js";

async function main() {
  const registry: CommandsRegistry = {};
  createCommandRegistration(registry);
  const [cmdName, args] = getCommandAndArguments();
  try {
    await runCommand(registry, cmdName, ...args);
  } catch (err) {
    console.log((err as Error).message);
    process.exit(1);
  }
  process.exit(0);
}

function createCommandRegistration(registry: CommandsRegistry) {
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", handlerAddFeed);
  registerCommand(registry, "feeds", handlerFeeds);
}

function getCommandAndArguments(): [string, string[]] {
  try {
    const allArguements = process.argv;
    const slicedArgs = allArguements.slice(2);

    if (slicedArgs.length === 0) {
      console.log("No Arguements Provided");
      process.exit(1);
    }

    return [slicedArgs[0], slicedArgs.slice(1)];
  } catch (err) {
    console.log(err);
  }
  throw new Error("Unable to get Arguements");
}

main();
