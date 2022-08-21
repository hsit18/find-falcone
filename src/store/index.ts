import { configureStore } from '@reduxjs/toolkit'
import falconeReducer from './falconeSlice';


export const store = configureStore({
    reducer: {
        falcone: falconeReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;