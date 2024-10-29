import sendEmail from '../../config/sendEmail.js';
import logger from '../../logger/index.js';
import sendMsg from '../../config/sendmsg.js';

async function emailProcessor(job, done) {
    try {
        // The value returned by your process function will be stored in the jobs object and can be accessed later on, for example in a listener for the completed event.
        const results = await sendEmail(job.data.email, job.data.subject, job.data.message);
        const { statusCode, headers: { body } } = results[0];
        if (results instanceof Error) {
            throw new Error(results.message);
        }

        const response = {
            jobType: 'Email',
            message: statusCode === 202 && body ? body : 'Email has been sent successfully',
        };
        done(null, response);
    } catch (error) {
        logger.error(`Email-notification-processor :${error.message}`);
        done(error, null);
    }
}
async function smsProcessor(job, done) {
    try {
        // The value returned by your process function will be stored in the jobs object and can be accessed later on, for example in a listener for the completed event.
        const results = await sendMsg(job.data.message, job.data.phoneNumber);
        if (results instanceof Error) {
            throw new Error(results.message);
        }
        const response = {
            jobType: 'Sms',
            message: results[0]?.messageId,
        };
        done(null, response);
        return results;
    } catch (error) {
        logger.error(`Sms-processor : ${error.message}`);
        done(error, null);
    }
    return false;
}

export {
    emailProcessor,
    smsProcessor,
};
