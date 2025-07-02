import { Box, Flex, HStack, Link as ChakraLink, Spacer } from "@chakra-ui/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ColorModeButton } from '@/components/chakra/ui/color-mode'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cart', path: '/cart' }
];

export const Navbar = () => {
    const { location } = useRouterState();

    return (
        <Box as="nav" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
            <Flex align="center">
                <HStack gap={8}>
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <ChakraLink
                                key={link.path}
                                as={Link}
                                href={link.path}
                                fontWeight={isActive ? 'bold' : 'normal'}
                                _hover={{ textDecoration: 'underline' }}
                            >
                                {link.name}
                            </ChakraLink>
                        )
                    })}
                </HStack>
                <Spacer />
                <ColorModeButton />
            </Flex>
        </Box>
    )
}