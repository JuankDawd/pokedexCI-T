import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { ROUTES } from './Utils/Routes'
import store from './Utils/services/store'
const App: React.FC = () => (
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                {ROUTES.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.component />} />
                ))}
            </Routes>
        </Provider>
    </BrowserRouter>
)

export default App
