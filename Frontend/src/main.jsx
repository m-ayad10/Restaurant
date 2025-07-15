import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SearchQueryProvider } from './Context Api/searchquery.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchQueryProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SearchQueryProvider>
  </StrictMode>,
)
