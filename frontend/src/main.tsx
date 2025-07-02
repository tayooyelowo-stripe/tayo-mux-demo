import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider as ChakraProvider } from "@/components/chakra/ui/provider.tsx"
import { ColorModeProvider } from '@/components/chakra/ui/color-mode.tsx'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store.ts';

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <ColorModeProvider>
        <ReduxProvider store={store} >
          <RouterProvider router={router} />
          <App />
        </ReduxProvider>
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode >,
)
