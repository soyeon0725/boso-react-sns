import {createSlice} from '@reduxjs/toolkit';

// common
const commonSlice = createSlice({
    name: 'common',
    initialState: {
        modalDefault: {show: false, type: ''},
        modalConfirm: {show: false, type: ''},
        isLoggedIn: false
    },
    reducers: {
        setModalDefault: (state, action) => {
            state.defaultModal = action.payload;
        },
        setModalConfirm: (state, action) => {
            state.confirmModal = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});
export const {setModalDefault, setModalConfirm, setIsLoggedIn} = commonSlice.actions;
export const selectModalDefault = state => state.common.modalDefault;
export const selectModalConfirm = state => state.common.modalConfirm;
export const selectIsLoggedIn = state => state.common.isLoggedIn;

// user
const userSlice = createSlice({
    name: 'user',
    initialState: {
        userProfile: {}
    },
    reducers: {
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        }
    }
})
export const {setUserProfile} = userSlice.actions;
export const selectUserProfile = state => state.user.userProfile;

// post
const postSlice = createSlice({
    name: 'post',
    initialState: {
        imageList: []
    },
    reducers: {
        setImageList: (state, action) => {
            state.imageList = action.payload;
        }
    }
})
export const {setImageList} = userSlice.actions;
export const selectImageList = state => state.post.imageList;

// joinInfo
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

// exampleInfo
const exampleSlice = createSlice({
    name: "exampleInfo",
    initialState: {
        list : []
    },
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
        },
        setPersonalInfo: (state, action) => {
            state.personalInfo = action.payload;
        }
    }
});
export const {setList} = exampleSlice.actions;
export const selectList =state => state.exampleInfo.list;

// export slice !
export {commonSlice, userSlice, joinInfoSlice, exampleSlice};



