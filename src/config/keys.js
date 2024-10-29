import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
    PORT: process.env.PORT,
    DATABASE: {
        URL: process.env.MONGODB_URL,
    },
    JWT_SECRET: process.env.JWT_SECRET,
    REDIS: {
        REDIS_PASSWORD: process.env.REDIS_CLOUD_PASSWORD,
        REDIS_HOST: process.env.REDIS_CLOUD_HOST,
        REDIS_PORT: process.env.REDIS_CLOUD_PORT,
    },
    SENDGRID: {
        API_SECRET: process.env.SENDGRID_API_KEY,
        FROM: process.env.SENDGRID_FROM_EMAIL,
    },
    TWILIO: {
        ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
        AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
        FROM_NUMBER: process.env.TWILIO_FROM_NUMBER,
    },
    STRIPE: {
        SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        PAYMENT_URL: process.env.STRIPE_PAYMENT_URL,
        STRIPE_ENDPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET
    },
};
