import { Box, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { ProductCard } from "../ProductCard";
import { useProducts } from "@/hooks/useProducts";

export const ProductList = () => {
    const { data, isLoading, isError } = useProducts();

    if (isLoading) return <Spinner size="xl" />;
    if (isError) return <Text color="red.500">Failed to load products.</Text>;

    return (
        <Box w="100%">
            <SimpleGrid minChildWidth="sm" gap="40px">
                {data.map((card) => (
                    <ProductCard key={card.id} {...card} />
                ))}
            </SimpleGrid>
        </Box>
    );
}