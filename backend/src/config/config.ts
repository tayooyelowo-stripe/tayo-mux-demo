import dotenv from 'dotenv';

const DEFAULTS: Config = {
    port: 3000,
    nodeEnv: 'development',
    webDomain: 'http://localhost:5173',
    stripeSecretKey: '',
};

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    webDomain: string;
    stripeSecretKey: string;
}

const PORT = Number(process.env.PORT) || DEFAULTS.port;

export const config: Config = {
    port: PORT,
    nodeEnv: process.env.NODE_ENV || DEFAULTS.nodeEnv,
    webDomain: process.env.DOMAIN || `${DEFAULTS.webDomain}`,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || DEFAULTS.stripeSecretKey,
};