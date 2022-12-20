import { configureStore } from "@reduxjs/toolkit";

import {exampleSlice, joinInfoSlice, commonSlice} from "./slice";

const store = configureStore({
    reducer:{
        exampleInfo : exampleSlice.reducer,
        joinInfo : joinInfoSlice.reducer,
        common : commonSlice.reducer
    }
});

export default store;
