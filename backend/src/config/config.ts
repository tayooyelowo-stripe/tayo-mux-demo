import dotenv from 'dotenv';

const DEFAULTS: Config = {
    port: 3000,
    nodeEnv: 'development',
};

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
}

export const config: Config = {
    port: Number(process.env.PORT) || DEFAULTS.port,
    nodeEnv: process.env.NODE_ENV || DEFAULTS.nodeEnv
};