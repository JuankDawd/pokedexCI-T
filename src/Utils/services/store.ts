import { configureStore } from '@reduxjs/toolkit'
import favoriteReducer from './favoriteSlice'
import pokemonReducer from './pokemonSlice'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function makeStore() {
    return configureStore({
        reducer: {
            // Add your reducers here
            favorite: favoriteReducer,
            pokemon: pokemonReducer,
        },
    })
}

const store = makeStore()

export default store
