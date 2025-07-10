import { addToCart } from "@/redux/features/cart/cartSlice";
import type { Product } from "@/types/Product";
import { formatPriceToCurrency } from "@/utils/formatMoney";
import { Button, Card, Image, Text } from "@chakra-ui/react"
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { toaster } from "@/components/chakra/ui/toaster"
import { useCheckout } from "@/hooks/useCheckout";

interface ProductCardProps extends Product { }

export const ProductCard = (product: ProductCardProps) => {
  const { image, name, description, price, currency } = product;

  const formattedPrice = useMemo(() => formatPriceToCurrency(price, currency), [price, currency]);
  const dispatch = useDispatch();
  const { createCheckoutSessionMutation } = useCheckout();

  const disableBuyNowButton = createCheckoutSessionMutation.isPending;

  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image
        src={image}
        alt={name}
        aspectRatio={4 / 3}
      />
      <Card.Body gap="2">
        <Card.Title>{name}</Card.Title>
        <Card.Description>
          {description}
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          {formattedPrice}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button
          variant="solid"
          disabled={disableBuyNowButton}
          onClick={() => createCheckoutSessionMutation.mutate([product])}
        >
          Buy now
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            dispatch(addToCart(product));
            toaster.create({
              description: `${name} has been added to cart.`,
              type: "info",
            })
          }}
        >
          Add to cart
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
