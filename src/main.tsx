import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ChakraProvider from './components/ChakraProvider'
import Font from './components/Font'
import QueryClientProvider from './components/QueryClientProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider>
      <ChakraProvider>
        <Font/>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
