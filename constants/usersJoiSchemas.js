import Joi from 'joi';

import { DATE_OF_BIRTH_REGEX, NAME_REGEX, NUMBER_REGEX, PASSWORD_REGEX } from './regex.js';
import { DATE_OF_BIRTH_REGEX } from './regex.js';

const SingleValuesSchemas = {
    otp: Joi.number().integer()
        .positive()
        .strict(true)
        .required()
        .messages({
            'any.required': 'otp required',
            'number.base': 'invalid otp type',
            'number.positive': 'otp negetive',
            'number.integer': 'otp integer',
        }),

    password: Joi.string().trim().regex(PASSWORD_REGEX).min(8)
        .max(16)
        .required()
        .messages({
            'any.required': 'Password is Required',
            'string.base': 'Password type is string',
            'string.trim': 'password trim', // seems to be unnecessary
            'string.empty': 'password empty',
            'string.min': 'password min',
            'string.max': 'password max',
            'string.pattern.base': 'password invalid input',
        }),
    confirmPassword: Joi.string().trim().valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'confirm password not match with password',
            'string.base': 'confirm password type string',
            'any.required': 'confirm password Required',
            'string.trim': 'password trim',
        }),
};
const PasswordConfirmPasswordSchema = Joi.object().options({ abortEarly: false }).keys({
    password: SingleValuesSchemas.password,
    confirmPassword: SingleValuesSchemas.confirmPassword,
}).unknown(false);
const UserSignupSchema = Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().lowercase().trim().email()
        .required()
        .messages({
            'any.required': 'email is required',
            'string.base': 'email type string',
            'string.email': 'invalid email',
            'string.trim': 'email trim', // seems to be unnecessary
            'string.empty': 'email empty',
        }),
    firstName: Joi.string().lowercase().trim().regex(NAME_REGEX)
        .min(2)
        .max(75)
        .required()
        .messages({
            'any.required': 'first name required',
            'string.base': 'first name type string',
            'string.trim': 'first name trim', // seems to be unnecessary
            'string.empty': 'first name empty',
            'string.pattern.base': 'first name invalid input',
        }),
    middleName: Joi.string().lowercase().trim().regex(NAME_REGEX)
        .messages({
            'string.pattern.base': 'middle name invalid input',
            'string.base': 'middle name type string',
            'string.trim': 'middle name trim', // seems to be unnecessary
            'string.empty': 'middle name empty',
        }),
    lastName: Joi.string().lowercase().trim().regex(NAME_REGEX)
        .min(2)
        .max(75)
        .required()
        .messages({
            'any.required': 'last name required',
            'string.base': 'last name type string',
            'string.trim': 'last name trim', // seems to be unnecessary
            'string.empty': 'last name empty',
            'string.min': 'last name min',
            'string.max': 'last name max',
            'string.pattern.base': 'last name invalid input',
        }),
    dateOfBirth: Joi.string().trim().regex(DATE_OF_BIRTH_REGEX)
        .required()
        .messages({
            'any.required': 'dob required',
            'string.base': 'dob type string',
            'string.empty': 'dob empty',
            'string.pattern.base': 'dob invalid input',
        }),
    password: Joi.string().trim().regex(PASSWORD_REGEX).min(8)
        .max(36)
        .required()
        .messages({
            'any.required': 'password required',
            'string.base': 'password type string',
            'string.trim': 'password trim', // seems to be unnecessary
            'string.empty': 'password empty',
            'string.min': 'password min',
            'string.max': 'password max',
            'string.pattern.base': 'password invalid input',
        }),
    confirmPassword: Joi.string().trim().valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'confirm password not match',
            'any.required': 'confirm password required',
            'string.base': 'confirm password type string',
            'string.trim': 'password trim',
        }),
    phoneNumber: Joi.string().trim().regex(NUMBER_REGEX).min(10)
        .max(20)
        .required()
        .messages({
            'any.required': 'phone number required',
            'string.base': 'phone number type string',
            'string.empty': 'phone number empty',
            'string.trim': 'phone number trim',
            'string.min': 'phone number min',
            'string.max': 'phone number max',
            'string.pattern.base': 'phone number invalid input',
        }),
    countryCode: Joi.string().trim().valid('GBP')
        .required()
        .messages({
            'any.required': 'country code required',
            'string.base': 'country code type string',
            'string.empty': 'country code empty',
            'any.only': 'Invalid country code',
        }),
    gender: Joi.string().trim().valid('MALE', 'FEMALE', 'OTHER')
        .required()
        .messages({
            'any.required': 'gender required',
            'string.base': 'gender type string',
            'any.only': 'Gender is invalid should be MALE, FEMALE or OTHER',
            'string.empty': 'gender empty',
        }),

    address: AddressSchema,
    sourceOfFunds: Joi.string().trim().valid(...Object.values(sourceOfFunds)).required()
        .messages({
            'any.required': 'source of funds required',
            'string.base': 'source of funds type string',
            'string.empty': 'source of funds empty',
            'any.only': 'Invalid source of funds',
        }),
});

const OtpSchema = Joi.object().options({ abortEarly: false }).keys({
    otp: Joi.number().integer()
        .positive()
        .strict(true)
        .required()
        .messages({
            'any.required': 'otp required',
            'number.base': 'invalid otp type',
            'number.positive': 'otp negetive',
            'number.integer': 'otp integer',
        }),
}).unknown(false);

const EmailSchema = Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().lowercase().trim().email()
        .required()
        .messages({
            'any.required': 'email required',
            'string.base': 'email type string',
            'string.email': 'invalid email',
            'string.trim': 'email trim', // seems to be unnecessary
            'string.empty': 'email empty',
        }),
}).unknown(false);

const PhoneSchema = Joi.object().options({ abortEarly: false }).keys({
    phoneNumber: Joi.string().trim().regex(NUMBER_REGEX).min(10)
        .max(20)
        .required()
        .messages({
            'any.required': 'phone number required',
            'string.base': 'phone number type string',
            'string.empty': 'phone number empty',
            'string.trim': 'phone number trim',
            'string.min': 'phone number min',
            'string.max': 'phone number max',
            'string.pattern.base': 'phone number invalid input',
        }),
}).unknown(false);

const SignInSchema = Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().lowercase().trim().email()
        .required()
        .messages({
            'any.required': 'email required',
            'string.email': 'invalid email',
            'string.trim': 'email trim', // seems to be unnecessary
            'string.empty': 'email empty',
        }),
    password: Joi.string().trim()
        .required()
        .messages({
            'any.required': 'password required',
            'string.trim': 'password trim', // seems to be unnecessary
            'string.empty': 'password empty',
        }),
}).unknown(false);

export {
    UserSignupSchema,
    OtpSchema,
    EmailSchema,
    PasswordConfirmPasswordSchema,
    SignInSchema,
    PhoneSchema,
};
