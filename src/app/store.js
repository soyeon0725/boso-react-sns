import { configureStore } from "@reduxjs/toolkit";

import {exampleSlice, joinInfoSlice} from "./slice";

const store = configureStore({
    reducer:{
        exampleInfo : exampleSlice.reducer,
        joinInfo : joinInfoSlice.reducer
    }
});

export default store;
