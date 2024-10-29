import getSubscriptionPlans from "../../utils/getSubscription.js";
import sendSuccessResponse from "../../utils/response/sendSuccessResponse.js";

const getSubscriptions = async (req, res, next) => {
    try {
        const { query: { subscriptionId } } = req;
        let subscriptions;
        if (subscriptionId) {
            subscriptions = await getSubscriptionPlans(subscriptionId);
        } else {
            subscriptions = await getSubscriptionPlans();
        }
        return sendSuccessResponse(res, 200, true, "Subscriptions fetched successfully.", "subscription", subscriptions);
    } catch (error) {
        next(error);
    }
    return getSubscriptions;
};
export default getSubscriptions;
