import { createSlice } from "@reduxjs/toolkit";

const initialLocationState = {
    locations: []
};

const locationSlice = createSlice({
    name: 'location',
    initialState: initialLocationState,
    reducers: {
        syncLocations(state, actions) {
            state.locations = actions.payload;
        }
    }
});

export const locationReducers = locationSlice.reducer;
export const locationActions = locationSlice.actions;