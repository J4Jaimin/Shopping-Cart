import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducer";

const store = configureStore({
    reducer: {
        first: cartReducer,
    },
});

export default store;