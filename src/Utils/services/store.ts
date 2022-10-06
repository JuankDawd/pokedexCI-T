import { configureStore } from '@reduxjs/toolkit'
import favoriteReducer from './favoriteSlice'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
