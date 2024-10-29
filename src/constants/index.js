const customLevels = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        trace: 'white',
        debug: 'green',
        info: 'green',
        warn: 'yellow',
        error: 'red',
        fatal: 'red',
    },
};
const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
};
const JwtTokenUsageTypes = Object.freeze({
    ForgetPassword: 'forgetPassword',
    Application: 'application',
    verifySignin: 'verifySignin',
    verifyforgetPassEmail: 'verifyforgetPassEmail',
    verifyforgetPassNumber: 'verifyforgetPassNumber',
});
const OtpTypes = Object.freeze({
    ForgetPasswordEmail: 'forgetPasswordEmail',
    ForgetPasswordNumber: 'forgetPasswordNumber',
    VerifyEmail: 'verifyEmail',
    VerifyMobile: 'verifyMobile',
    SignIn: 'SignIn',
    TranscationOtp: 'transcationOtp',
    ResetPassword: 'resetPassword',
});
const RedisConnectionObject = Object.freeze({
    host: ENV.REDIS.REDIS_HOST,
    port: ENV.REDIS.REDIS_PORT,
    password: ENV.REDIS.REDIS_PASSWORD,
});
const ExpirySeconds = Object.freeze({
    s30: 30,
    m1: 60,
    m5: 300,
    m10: 600,
    m15: 900,
    m30: 1800,
    h1: 3600,
    h3: 10800,
    h6: 21600,
    h12: 43200,
    d1: 86400,
});
const Permissions = Object.freeze({
    getAdminAccounts: "650c45b07812ee6317f261b4",
    updateAdminRole: "650c4d897812ee6317f261c8",
    payment: "650ab361362f806c5391dced", // manualAdjustment and manualFee
    createUser: "650ab379362f806c5391dcf7",
    getRole: "650ab37e362f806c5391dcf9",
    editRole: "650ab384362f806c5391dcfb",
    createRole: "650ab389362f806c5391dcfd",
    deleteRole: "650ab38d362f806c5391dcff",
    getPermessions: "650ab391362f806c5391dd01",
    createAdmin: "6512a982dba2d25ba5f10103",
    allFeeDetails: "6512af11dba2d25ba5f10104",
    deleteAdmin: "6512b115975bb75fa54f3c8a",
});

export {
    customLevels,
    HttpStatusCode,
    JwtTokenUsageTypes,
    OtpTypes,
    RedisConnectionObject,
    ExpirySeconds,
    Permissions,
}