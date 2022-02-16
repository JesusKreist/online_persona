import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface ENV {
  MONGO_URI: string | undefined;
}

interface Config {
  MONGO_URI: string;
}

const getConfig = (): ENV => {
  return {
    MONGO_URI: process.env.MONGO_URI,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
