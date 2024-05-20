import React from 'react'
import { createRoot } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/reset.css'
import './styles/styles.css'

const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
)

