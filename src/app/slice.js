import { createSlice} from "@reduxjs/toolkit";

const exampleSlice = createSlice({
    name: "exampleInfo",
    initialState: {
        list : []
    },
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
        }
    }
});

export const {setList} = exampleSlice.actions;

export const selectList = state => state.exampleInfo.list;

export {exampleSlice};
