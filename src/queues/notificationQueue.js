import Queue from 'bull';
import { allNotificationCompleted, allNotificationFailed } from './workers/allNotificationhandler.js';
import { smsProcessor, emailProcessor } from './workers/processors.js';
import { RedisConnectionObject } from '../constants/index.js';

const notificationsQueue = new Queue('Notifications', {
    redis: RedisConnectionObject,
    limiter: {
        max: 1000, // maximum number of jobs that can be processed in a given duration
        duration: 5000, // duration in milliseconds
    },
    defaultJobOptions: {
        removeOnComplete: true, // remove the job from the queue when it has completed
        removeOnFail: true, // remove the job from the queue when it has failed
        attempts: 3, // number of attempts to retry the job
        backoff: {
            type: 'fixed', // type of backoff, fixed or exponential
            delay: 5000, // delay in milliseconds
        },
    },
});

// worker
notificationsQueue.process('sms', smsProcessor);
notificationsQueue.process('email', emailProcessor);

// queue events
notificationsQueue.on('completed', allNotificationCompleted);
notificationsQueue.on('failed', allNotificationFailed);

export default notificationsQueue;
