import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    planName: {
        type: String,
        required: true,
    },
    durationInDays: {
        type: Number,
        required: true
    },
    stripePlanId: {
        type: String,
        required: true
    },
    subscriptionPrice: {
        type: Number,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    userAction: {
        type: String,
        required: true
    },
    paymentCurrency: {
        type: String,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
});

Schema.index({ userId: -1 });

const SubscriptionHistory = mongoose.model('subscriptionHistory', Schema);

export default SubscriptionHistory;
