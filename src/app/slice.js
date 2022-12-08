import {createSlice} from "@reduxjs/toolkit";

const exampleSlice = createSlice({
    name: "exampleInfo",
    initialState: {
        list : [],
        동: {}
    },
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
        },
        setPersonalInfo: (state, action) => {
            state.personalInfo = action.payload;
        },
    }
});

export const {setList, setPersonalInfo} = exampleSlice.actions;

export const selectList = state => state.exampleInfo.list;
export const selectPersonalInfo = state => state.exampleInfo.personalInfo;

export {exampleSlice};
