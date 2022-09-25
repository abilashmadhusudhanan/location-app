import { configureStore } from "@reduxjs/toolkit";
import { locationReducers } from "./locationStore";

const store = configureStore({
    reducer: {
        locations: locationReducers
    }
});

export default store;