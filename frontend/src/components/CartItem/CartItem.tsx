import { Box, Button, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { formatPriceToCurrency } from "@/utils/formatMoney";
import { removeFromCart, updateQuantity, type CartItem as CartItemProp } from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";

export const CartItem = ({ price, quantity, name, id, image, currency }: CartItemProp) => {
    const formattedIndividualPrice = useMemo(() => formatPriceToCurrency(price, currency), [price, currency]);
    const formattedTotalPrice = useMemo(() => formatPriceToCurrency(price * quantity, currency), [price, quantity, currency]);
    const dispatch = useDispatch();

    return (
        <Box borderWidth="1px" borderRadius="md" p={4} width={["100%", "48%", "32%"]} maxWidth="400px">
            <HStack justify="space-between">
                <Image src={image} alt={name} boxSize="50px" objectFit="cover" borderRadius="md" />
                <VStack align="start" gap={1}>
                    <Text fontWeight="medium">{name}</Text>
                    <Text fontSize="sm">
                        {formattedIndividualPrice} x {quantity} = {formattedTotalPrice}
                    </Text>
                </VStack>

                <HStack>
                    <>
                        <Button
                            size="xs"
                            disabled={quantity === 1}
                            onClick={() => {
                                dispatch(updateQuantity({ id, quantity: Math.max(1, quantity - 1) }));
                            }}
                        >
                            -
                        </Button>
                        <Text>{quantity}</Text>
                        <Button
                            size="xs"
                            onClick={() => {
                                dispatch(updateQuantity({ id, quantity: Math.max(1, quantity + 1) }));
                            }}
                        >
                            +
                        </Button>
                    </>
                    <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() => {
                            dispatch(removeFromCart(id));
                        }}
                    >
                        <Icon boxSize="3" color="tomato">
                            <FaRegTrashAlt />
                        </Icon>
                    </Button>
                </HStack>
            </HStack>
        </Box>
    );
};
