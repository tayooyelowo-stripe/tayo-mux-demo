import { Box, Button, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { ProductCard } from "../ProductCard";
import { useProducts } from "@/hooks/useProducts";

export const ProductList = () => {
    const { 
        data,
        isPending,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage 
    } = useProducts();

    if (isPending) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Failed to load products.</Text>;

    const products = data?.pages.flatMap((page) => page.products) ?? [];

    const paginationButton = hasNextPage && (
        <Box textAlign="center">
            <Button
                loading={isFetchingNextPage} 
                loadingText="Loading more items"
                mt={4}
                onClick={() => fetchNextPage()}
            >
                Load more
            </Button>
        </Box>
    )

    // TODO: Ideally should use a virtualized list
    return (
        <Box w="100%">
            <SimpleGrid minChildWidth="sm" gap="40px">
                {products.map((card) => (
                    <ProductCard key={card.id} {...card} />
                ))}
            </SimpleGrid>
            {paginationButton}
        </Box>
    );
}