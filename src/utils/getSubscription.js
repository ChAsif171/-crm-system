import KEYS from "../config/keys.js";
import Stripe from "stripe";

const stripe = new Stripe(KEYS.STRIPE.SECRET_KEY);
async function getSubscriptionPlans(planId) {
    try {
        if (planId) {
            const plan = await stripe.prices.retrieve(planId);
            if (!plan.active) {
                throw new Error('Plan is not active.');
            }
            const product = await stripe.products.retrieve(plan.product);
            plan.product_description = product.description;
            return {
                id: plan.id,
                title: product.name,
                durationtext: `${plan.recurring.interval_count} ${plan.recurring.interval}`,
                subscriptionprice: (plan.unit_amount / 100).toFixed(2),
                description: product.description
            };
        } else {
            const plans = await stripe.prices.list({ limit: 100 });
            const activePlans = plans.data.filter(plan => plan.active);
            const detailedPlans = await Promise.all(
                activePlans.map(async (plan) => {
                    const product = await stripe.products.retrieve(plan.product);
                    return {
                        id: plan.id,
                        title: product.name,
                        durationtext: `${plan.recurring.interval_count} ${plan.recurring.interval}`,
                        subscriptionprice: (plan.unit_amount / 100).toFixed(2),
                        description: product.description
                    };
                })
            );
            return detailedPlans;
        }
    } catch (error) {
        console.error('Error fetching subscription plans:', error);
        throw error;
    }
}

export default getSubscriptionPlans;