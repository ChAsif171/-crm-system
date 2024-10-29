import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { PHONE_NUMBER_REGEX, EMAIL_REGEX, NAME_REGEX } from '../../constants/regex.js';
import passwordValidation from '../utils/passwordValidation.js';

const Schema = new mongoose.Schema({
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
    firstName: {
        type: String,
        lowercase: true,
        required: [true, 'First name is required'],
        trim: true,
        validate: {
            validator: (v) => NAME_REGEX.test(v),
            message: (props) => `${props.value} is not a valid first name!`,
        },
    },
    middleName: {
        type: String,
        lowercase: true,
        trim: true,
    },
    lastName: {
        type: String,
        lowercase: true,
        required: [true, 'Last name is required'],
        trim: true,
        validate: {
            validator: (v) => NAME_REGEX.test(v),
            message: (props) => `${props.value} is not a valid last name!`,
        },
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date of birth is required'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: 102,
        trim: true,
        validate: {
            validator: (password) => !(passwordValidation.strength(password) !== true),
            message: (props) => `${props.value} is not a valid password!`,
        },
        // select: false,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
        trim: true,
        validate: {
            validator: (v) => PHONE_NUMBER_REGEX.test(v),
            message: (props) => `${props.value} is not a valid mobile number! like +44xxxxxxxxxx`,
        },
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    phoneNumberVerified: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    tokenVersion: {
        type: Number,
        default: 0,
    },
    role: { type: String, enum: ["Admin", "SalesAgent"], default: "SalesAgent" },
}, { timestamps: true });

// indexes
Schema.index({ email: -1 }, { unique: true });
Schema.index({ phoneNumber: -1 }, { unique: true });

// schema methods to campare bcrypt passwords
Schema.methods.bcryptComparePassword = async function comaparePasswords(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error.message);
    }
};

Schema.methods.bcryptComparePassCode = async function comparePassword(passCode) {
    try {
        return await bcrypt.compare(passCode, this.passCode);
    } catch (error) {
        throw new Error("Passcode isn't matching");
    }
};

Schema.methods.sanitize = function sanitize() {
    const { password, passCode, __v, ...rest } = this;
    return rest;
};

Schema.pre('save', async function beforeSavingDocRunThisFunc(next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        throw new Error(error.message);
    }
    return false;
});

const Users = mongoose.model('users', Schema);

export default Users;
