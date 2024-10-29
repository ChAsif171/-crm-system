import moment from "moment";
import Stripe from "stripe";
import User from "../../models/users.js";
import SubscriptionHistory from "../../models/subscriptionHistory.js";
import { ApiError } from "../../utils/error/ApiError.js";
import sendSuccessResponse from "../../utils/response/sendSuccessResponse.js";
import KEYS from "../../config/keys.js";

const stripe = new Stripe(KEYS.STRIPE.SECRET_KEY);

const StripePaymentSuccess = async (req, res, next) => {
    try {
        const { userId } = req;
        const dbUser = await User.findOne({ _id: userId });
        if (!dbUser) throw new ApiError("Unauthorized", 400, "Unauthorized access.", true);
        const { sessionId } = dbUser;
        if (!sessionId) throw new ApiError("Bad request", 400, "User does not have a session ID.", true);
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const { subscription, payment_status } = session;
        if (payment_status == 'paid') {
            const subscriptionDetails = await stripe.subscriptions.retrieve(subscription);
            const { current_period_start, discount, current_period_end, plan: { id, amount } } = subscriptionDetails;
            const startDate = moment.unix(current_period_start).format('YYYY-MM-DD');
            const endDate = moment.unix(current_period_end).format('YYYY-MM-DD');
            const durationInDays = moment.duration(current_period_end - current_period_start, 'seconds').asDays();

            // Retrieve the product details to get the name of the subscription plan
            const plan = subscriptionDetails.items.data[0].plan;
            const productId = plan.product;
            const productDetails = await stripe.products.retrieve(productId);
            const planName = productDetails.name;
            const subscriptionHistoryData = {
                userId,
                endDate,
                startDate,
                plan_name: planName,
                durationInDays,
                stripePlanId: id,
                subscriptionPrice: amount / 100,
                eventType: "Subscription Purchased",
                eventDate: new Date(),
                eventDescription: "User purchased a subscription.",
                userAction: "Purchase",
                paymentCurrency: "USD",
                discountPrice: (amount - Number(discount)) / 100,
            };
            const [newSubscriptionHistory, updatedUser] = await Promise.all([
                SubscriptionHistory.create(subscriptionHistoryData),
                User.findByIdAndUpdate({ _id: userId }, { isSubscribed: true }),
            ]);
            return sendSuccessResponse(res, 200, true, "Payment completed successfully.", "Subscription", newSubscriptionHistory);

        }
        return sendSuccessResponse(res, 200, true, "Payment is pending.", "Subscription", session);
    } catch (error) {
        next(error);
    }
    return StripePaymentSuccess;
};
export default StripePaymentSuccess;
