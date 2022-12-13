import {createSlice} from "@reduxjs/toolkit";

const exampleSlice = createSlice({
    name: "exampleInfo",
    initialState: {
        list : [],
        personalInfo: {},
        isLoggedIn: false
    },
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
        },
        setPersonalInfo: (state, action) => {
            state.personalInfo = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});

export const {setList, setPersonalInfo, setIsLoggedIn} = exampleSlice.actions;

export const selectList = state => state.exampleInfo.list;
export const selectPersonalInfo = state => state.exampleInfo.personalInfo;
export const selectIsLoggedIn = state => state.exampleInfo.isLoggedIn;

export {exampleSlice};
