import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: FindFalconeAPIBody = {
    token: '',
    planets: [],
    vehicles: []
}

export const counterSlice = createSlice({
    name: 'falcone',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
    },
})

export const { setToken } = counterSlice.actions

export default counterSlice.reducer