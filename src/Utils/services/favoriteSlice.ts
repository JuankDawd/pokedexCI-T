import { createSlice } from '@reduxjs/toolkit'
import { PokemonInterface } from '../interfaces/pokemon.interface'

export interface FavoriteStateStoreInterface {
    favorites: PokemonInterface[]
}

const initialState: FavoriteStateStoreInterface = {
    favorites: [],
}

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites.push(action.payload)
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter((favorite) => favorite.name !== action.payload.name)
        },
    },
})

export const { addFavorite, removeFavorite } = favoriteSlice.actions

export const getFavorites = (state): PokemonInterface[] => state.favorite.favorites

export default favoriteSlice.reducer
