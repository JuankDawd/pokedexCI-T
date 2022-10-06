import { configureStore } from '@reduxjs/toolkit'
import favoriteReducer from './favoriteSlice'
export function makeStore() {
    return configureStore({
        reducer: {
            // Add your reducers here
            favorite: favoriteReducer,
        },
    })
}

const store = makeStore()

export default store
