import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import NotesProvider from './contexts/notes/NotesProvider'
import TagsProvider from './contexts/tags/TagsProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotesProvider>
        <TagsProvider>
          <App />
        </TagsProvider>
      </NotesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
