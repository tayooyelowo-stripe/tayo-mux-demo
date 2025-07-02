import { Box, Button, Heading, HStack, Separator, Text, VStack } from "@chakra-ui/react";
import { CartItem } from "@/components/CartItem/CartItem";
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectCartTotal } from "@/redux/features/cart/cartSlice";
import type { RootState } from "@/redux/store";
import { formatPriceToCAD } from "@/utils/formatMoney";

export const CartList = () => {
    const rawCartTotalPrice = useSelector(selectCartTotal);
    const formattedTotalPrice = formatPriceToCAD(rawCartTotalPrice);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const emptyCartMessageElement = cartItems.length === 0 && <Text>No items in your cart.</Text>;
    const cartItemsElement = cartItems.length > 0 && (
        <VStack>
            {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
            ))}

            <Separator />

            <HStack justify='space-between'>
                <Text fontWeight='bold'>Total:</Text>
                <Text fontWeight='bold'>{formattedTotalPrice}</Text>
            </HStack>

            <Button size="sm" colorScheme="red" variant="outline" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
        </VStack>
    )

    return (
        <Box p={6}>
            <Heading size="lg" mb={4}>
                Your Bag
            </Heading>

            {emptyCartMessageElement}
            {cartItemsElement}
        </Box>
    );
};