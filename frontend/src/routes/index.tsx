import { createFileRoute } from '@tanstack/react-router'
import { ProductList } from '@/components'
import { Flex } from '@chakra-ui/react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <Flex direction="column" align="center" justify="center" px={4} py={8}>
      <ProductList />
    </Flex>
  )
}