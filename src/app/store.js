import { configureStore } from '@reduxjs/toolkit';

import {commonSlice, userSlice, postSlice} from './slice';

const store = configureStore({
    reducer:{
        // exampleInfo : exampleSlice.reducer,
        common : commonSlice.reducer,
        user: userSlice.reducer,
        post: postSlice.reducer,
    }
});

export default store;
