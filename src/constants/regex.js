const EMAIL_REGEX = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿŠŽšžŸÇçßÐņĀāēūīō ]+[A-Za-zÀ-ÖØ-öø-ÿŠŽšžŸÇçßÐņĀāēūīō ]*$/; // /^[a-zA-Z '.-]*$/;
const USERNAME_REGEX = /^[A-Za-z0-9_]{3,15}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,:;/\\(){}\[\]_-])[ -~]{8,36}$/;
const PHONE_NUMBER_REGEX = /^\+92[0-9]{11}$/;
const AMOUNT_REGEX = !/^[0-9]+([,.][0-9]+)?$/;
const DATE_OF_BIRTH_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const NUMBER_REGEX = /^\+[0-9]+$/;
export {
    EMAIL_REGEX,
    NAME_REGEX,
    USERNAME_REGEX,
    PASSWORD_REGEX,
    PHONE_NUMBER_REGEX,
    AMOUNT_REGEX,
    DATE_OF_BIRTH_REGEX,
    NUMBER_REGEX,
};
