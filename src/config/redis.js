import { createClient } from 'redis';
import logger from '../logger/index.js';
import KEYS from './keys.js';

const redisClient = createClient({
    password: KEYS.REDIS.REDIS_PASSWORD,
    socket: {
        host: KEYS.REDIS.REDIS_HOST,
        port: KEYS.REDIS.REDIS_PORT,
        keepAlive: true,
    },
});

redisClient.on('error', (err) => {
    logger.warn(`Redis client error :: ${err.message}`);
});

redisClient.on('connect', () => {
    logger.info('Redis client connected...');
});

redisClient.on('reconnecting', () => {
    logger.warn('Redis client re-connecting...');
});
redisClient.on('ready', () => {
    logger.info('Redis client is ready...');
});

await redisClient.connect();

export default redisClient;
