import {createSlice} from "@reduxjs/toolkit";

const exampleSlice = createSlice({
    name: "exampleInfo",
    initialState: {
        list : [],
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

export const {setList, setIsLoggedIn} = exampleSlice.actions;

export const selectList = state => state.exampleInfo.list;
export const selectIsLoggedIn = state => state.exampleInfo.isLoggedIn;

export {exampleSlice};

const joinInfoSlice = createSlice({
    name: "joinInfo",
    initialState: {
        userInfo : {},
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
    }
});
export const {setUserInfo} = joinInfoSlice.actions;
export const selectUserInfo = state => state.joinInfo.userInfo;

export {joinInfoSlice};
