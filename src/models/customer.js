import mongoose from "mongoose";
import { PHONE_NUMBER_REGEX, EMAIL_REGEX, NAME_REGEX } from '../../constants/regex.js';
import passwordValidation from '../utils/passwordValidation.js';

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'name is required'],
        trim: true,
        validate: {
            validator: (v) => NAME_REGEX.test(v),
            message: (props) => `${props.value} is not a valid first name!`,
        },
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (v) => EMAIL_REGEX.test(v),
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    phone: String,
    company: String,
    notes: String,
});

module.exports = mongoose.model("Customer", customerSchema);
