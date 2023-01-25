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
        userInfo : {
            name: '',
            email: '',
            password: '',
            photoNum: '',
            birth: '',
            phone: '',
            list: {
                post: [
                    {
                        id: '',
                        cat: '',
                        url: ''
                    }
                ]
            }
        },
        userId: '',
        postList: []
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setPostList: (state, action) => {
            state.postList = action.payload;
        }
    }
});
export const {setUserInfo, setUserId, setPostList} = joinInfoSlice.actions;
export const selectUserInfo = state => state.joinInfo.userInfo;
export const selectUserId = state => state.joinInfo.userId;
export const selectPostList = state => state.joinInfo.postList;

export {joinInfoSlice};

const commonSlice = createSlice({
    name: "common",
    initialState: {
        defaultModal: {
            show: false,
            type: ''
        },
        confirmModal: {
            show: false,
            type: ''
        }
    },
    reducers: {
        setDefaultModal: (state, action) => {
            state.defaultModal = action.payload;
        },
        setConfirmModal: (state, action) => {
            state.confirmModal = action.payload;
        }
    }
});
export const {setDefaultModal, setConfirmModal} = commonSlice.actions;
export const selectDefaultModal = state => state.common.defaultModal;
export const selectConfirmModal = state => state.common.confirmModal;

export {commonSlice};
