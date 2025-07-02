import { Box, Button, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import { useMemo } from "react";
import { formatPriceToCAD } from "@/utils/formatMoney";
import { removeFromCart, updateQuantity, type CartItem as CartItemProp } from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa"

export const CartItem = ({ price, quantity, title, id }: CartItemProp) => {
    const formattedIndividualPrice = useMemo(() => formatPriceToCAD(price), [price]);
    const formattedTotalPrice = useMemo(() => formatPriceToCAD(price * quantity), [price, quantity]);
    const dispatch = useDispatch();

    return <Box borderWidth='1px' borderRadius='md' p={4}>
        <HStack justify='space-between'>
            <VStack align="start" gap={1}>
                <Text fontWeight='medium'>{title}</Text>
                <Text fontSize='sm'>{formattedIndividualPrice} x {quantity} = {formattedTotalPrice}</Text>
            </VStack>

            <HStack>
                <>
                    <Button size='xs' disabled={quantity === 1} onClick={() => {
                        dispatch(updateQuantity({ id, quantity: Math.max(1, quantity - 1) }))
                    }}>
                        -
                    </Button>
                    <Text>{quantity}</Text>
                    <Button size='xs' onClick={() => {
                        dispatch(updateQuantity({ id, quantity: Math.max(1, quantity + 1) }))
                    }}>
                        +
                    </Button>
                </>
                <Button size='xs' colorScheme='red' onClick={() => {
                    dispatch(removeFromCart(id))
                }}>
                    <Icon size="lg" color="tomato">
                        <FaRegTrashAlt />
                    </Icon>
                </Button>
            </HStack>
        </HStack>
    </Box>
}