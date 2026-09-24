import { createRoot } from 'react-dom/client'

import { ThemeProvider } from '../src'
import { App } from './app'
import { RouterProvider } from './router'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <RouterProvider>
      <App />
    </RouterProvider>
  </ThemeProvider>
)
