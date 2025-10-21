import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './pages/App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import React from 'react';
import { HashRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HashRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </HashRouter>
    </StrictMode>,
)