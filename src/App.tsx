import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { ROUTES } from './Utils/Routes'
import { PokedexController } from './Utils/API/Controllers/Pokedex.controller'
import { addPokemons } from './Utils/services/pokemonSlice'
const App: React.FC = () => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        const getPokemonList = async (): Promise<void> => {
            const response = await PokedexController.getPokemons(100000, 0)
            if (response.status === 200) {
                const pokemons = response.data.results

                dispatch(addPokemons(pokemons))
            }
        }

        getPokemonList()
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                {ROUTES.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.component />} />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default App
