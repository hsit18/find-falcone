import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: FalconeStore = {
    token: '',
    planets: [],
    vehicles: [],
    selectedDestinations: {}
}

export const counterSlice = createSlice({
    name: 'falcone',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },

        setPlanet: (state, action: PayloadAction<Planet>) => {
            state.planets = [...state.planets, action.payload];
        },

        setVehicle: (state, action: PayloadAction<Vehicle>) => {
            state.vehicles = [...state.vehicles, action.payload];
        },

        setSelectedDestination: (state, action: PayloadAction<{
            index: number;
            destination: Destination;
        }>) => {
            state.selectedDestinations = { ...state.selectedDestinations, [action.payload.index]: action.payload.destination };
        },

        resetDestination: (state) => {
            state.selectedDestinations = {};
        }
    },
})

export const { setToken, setPlanet, setVehicle, setSelectedDestination, resetDestination } = counterSlice.actions

export default counterSlice.reducer