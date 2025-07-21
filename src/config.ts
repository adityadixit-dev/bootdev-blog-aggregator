import fs from "fs";
import os from "os";
import path from "path";

type Config = {
  dbUrl: string;
  currentUserName: string;
};

export const setUser = (userName: string) => {
  let cfg: Config;

  try {
    cfg = readConfig();
    cfg["currentUserName"] = userName;
  } catch (error) {
    cfg = {
      dbUrl: "postgres://example",
      currentUserName: userName,
    };
  }

  writeConfig(cfg);
};

export const readConfig = () => {
  const configFilePath = getConfigFilePath();

  try {
    const rawConfigFileData: any = JSON.parse(
      fs.readFileSync(configFilePath, { encoding: "utf8" }),
    );

    return validateConfig(rawConfigFileData);
  } catch (error) {
    throw new Error(`Unable to get Config - ${(error as Error).message}`);
  }
};

function validateConfig(rawConfig: any): Config {
  if ("db_url" in rawConfig && "current_user_name" in rawConfig) {
    return {
      dbUrl: rawConfig["db_url"],
      currentUserName: rawConfig["current_user_name"],
    };
  }

  throw new Error("Config File is invalid");
}
function writeConfig(cfg: Config) {
  const configFilePath = getConfigFilePath();
  fs.writeFileSync(
    configFilePath,
    JSON.stringify({
      db_url: cfg.dbUrl,
      current_user_name: cfg.currentUserName,
    }),
    {
      encoding: "utf8",
    },
  );
}

function getConfigFilePath(): string {
  const configFileName = ".gatorconfig.json";
  const configFilePath = path.join(os.homedir(), configFileName);

  if (!configFilePath) {
    throw new Error("Unable to get Config File Path");
  }

  return `${configFilePath}`;
}
