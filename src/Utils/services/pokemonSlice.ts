import { createSlice } from '@reduxjs/toolkit'
import { PokemonInterface } from '../interfaces/pokemon.interface'

export interface PokemonStateStoreInterface {
    pokemons: PokemonInterface[]
}

const initialState: PokemonStateStoreInterface = {
    pokemons: [],
}

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        addPokemons: (state, action) => {
            state.pokemons = action.payload
        },
    },
})

export const { addPokemons } = pokemonSlice.actions

export const getPokemons = (state): PokemonInterface[] => state.pokemon.pokemons

export default pokemonSlice.reducer
