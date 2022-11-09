import { configureStore } from "@reduxjs/toolkit";

import {exampleSlice} from "./slice";

const store = configureStore({
    reducer:{
        exampleInfo : exampleSlice.reducer
    }
});

export default store;
