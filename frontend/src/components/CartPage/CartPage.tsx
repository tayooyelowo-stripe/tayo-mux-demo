import { CartList } from '@/components/CartList/CartList';
import { useSelector } from 'react-redux';
import type { RootState } from "@/redux/store";
import { Button } from '@chakra-ui/react';
import { useCheckout } from '@/hooks/useCheckout';

export const CartPage = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const disableCheckoutButton = cartItems.length === 0;
    const { createCheckoutSessionMutation } = useCheckout();

    return (
        <>
            <CartList />
            <Button type="submit" disabled={disableCheckoutButton} onClick={() => createCheckoutSessionMutation.mutate({})}>
                Checkout
            </Button>
        </>
    )
}