import { HStack, Separator, Text } from "@chakra-ui/react";
import { CartItem } from "@/components/CartItem/CartItem";
import { useSelector } from 'react-redux';
import { selectCartTotal } from "@/redux/features/cart/cartSlice";
import type { RootState } from "@/redux/store";
import { formatPriceToCAD } from "@/utils/formatMoney";

export const CartList = () => {
    const rawCartTotalPrice = useSelector(selectCartTotal);
    const formattedTotalPrice = formatPriceToCAD(rawCartTotalPrice);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const emptyCartMessageElement = cartItems.length === 0 && <Text>No items in your cart.</Text>;
    const cartItemsElement = cartItems.length > 0 && (
        <>
            {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
            ))}

            <Separator />

            <HStack justify='space-between'>
                <Text fontWeight='bold'>Total:</Text>
                <Text fontWeight='bold'>{formattedTotalPrice}</Text>
            </HStack>
        </>
    )

    return (
        <>
            {emptyCartMessageElement}
            {cartItemsElement}
        </>
    );
};