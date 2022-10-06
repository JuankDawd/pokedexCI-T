import { createSlice } from '@reduxjs/toolkit'
import { Pokemon } from '../interfaces/pokemon.interface'

export interface FavoriteStateStoreInterface {
    favorites: Pokemon[]
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
            console.log({
                action,
                state,
            })

            state.favorites = state.favorites.filter((favorite) => favorite.name !== action.payload.name)
        },
    },
})

export const { addFavorite, removeFavorite } = favoriteSlice.actions

export const getFavorites = (state: { favorite: { favorites: Pokemon[] } }): Pokemon[] => state.favorite.favorites

export default favoriteSlice.reducer
