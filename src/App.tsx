import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { ROUTES } from './Utils/Routes'
import { PokedexController } from './Utils/API/Controllers/Pokedex.controller'
import { addPokemons } from './Utils/services/pokemonSlice'
import { Snackbar } from '@mui/material'
const App: React.FC = () => {
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        const getPokemonList = async (): Promise<void> => {
            const response = await PokedexController.getPokemons(100000, 0)
            if (response.status === 200) {
                const pokemons = response.data.results

                dispatch(addPokemons(pokemons))
            } else {
                setError('Error obtining all the pokemons')
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
            <Snackbar
                open={error !== ''}
                autoHideDuration={6000}
                onClose={(): void => setError('')}
                message={error}
                sx={{
                    width: '100%',
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: '#f44336',
                        color: '#fff',
                        fontSize: '16px',
                        lineHeight: '24px',
                        textAlign: 'center',
                        textTransform: 'capitalize',
                    },
                }}
            />
        </BrowserRouter>
    )
}

export default App
