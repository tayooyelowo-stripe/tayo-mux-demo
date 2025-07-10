import { CartList } from '@/components/CartList/CartList';
import { useDispatch, useSelector, } from 'react-redux';
import type { RootState } from "@/redux/store";
import { Box, Button, Heading, HStack, VStack } from '@chakra-ui/react';
import { useCheckout } from '@/hooks/useCheckout';
import { clearCart } from "@/redux/features/cart/cartSlice";

export const CartPage = () => {
    const { createCheckoutSessionMutation } = useCheckout();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const disableCheckoutButton = cartItems.length === 0 || createCheckoutSessionMutation.isPending;

    return (
        <>
        <Heading size="lg" mb={4}>
            Your Bag
        </Heading>
            <Box p={6}>
                <VStack>
                    <CartList />
                    <HStack justifyContent={'flex-end'}>
                        <Button
                            size="sm"
                            colorScheme="red"
                            variant="outline"
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear Cart
                        </Button>

                        <Button
                            type="submit"
                            disabled={disableCheckoutButton}
                            onClick={() => createCheckoutSessionMutation.mutate(cartItems)}
                        >
                            Checkout
                        </Button>
                    </HStack>
                </VStack>
            </Box>
        </>
    )
}