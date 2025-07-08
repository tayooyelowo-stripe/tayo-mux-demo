import { useMutation } from '@tanstack/react-query';

export const useCheckout = () => {
    const createCheckoutSessionMutation = useMutation({
        mutationFn: async (checkoutData?: Record<string, any>) => {
            const response = await fetch("http://localhost:3000/api/checkout/create-checkout-session", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: checkoutData ? JSON.stringify(checkoutData) : undefined,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data as any;
        },
        onSuccess: (data) => {
            window.location.href = data.url; // Redirect to the checkout URL
        },
        onError: (error) => {
            console.error("Error creating checkout session:", error);
        }
    });

    return { createCheckoutSessionMutation };
};
