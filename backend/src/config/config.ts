import dotenv from 'dotenv';

const DEFAULTS: Config = {
    port: 3000,
    nodeEnv: 'development',
    webDomain: 'http://localhost:5173',
    stripeSecretKey: '',
    stripeWebhookSigningSecret: '',
    mongodbUri: '',
};

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    webDomain: string;
    stripeSecretKey: string;
    stripeWebhookSigningSecret: string;
    mongodbUri: string;
}

const PORT = Number(process.env.PORT) || DEFAULTS.port;

export const config: Config = {
    port: PORT,
    nodeEnv: process.env.NODE_ENV || DEFAULTS.nodeEnv,
    webDomain: process.env.DOMAIN || `${DEFAULTS.webDomain}`,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || DEFAULTS.stripeSecretKey,
    stripeWebhookSigningSecret: process.env.STRIPE_WEBHOOK_SIGNING_SECRET || DEFAULTS.stripeWebhookSigningSecret,
    mongodbUri: process.env.MONGODB_URI || DEFAULTS.mongodbUri,
};