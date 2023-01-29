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
            state.modalDefault = action.payload;
        },
        setModalConfirm: (state, action) => {
            state.modalConfirm = action.payload;
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
export const {setImageList} = postSlice.actions;
export const selectImageList = state => state.post.imageList;

// export slice !
export {commonSlice, userSlice, postSlice};

// exampleInfo
// const exampleSlice = createSlice({
//     name: "exampleInfo",
//     initialState: {
//         list : []
//     },
//     reducers: {
//         setList: (state, action) => {
//             state.list = action.payload;
//         },
//         setPersonalInfo: (state, action) => {
//             state.personalInfo = action.payload;
//         }
//     }
// });
// export const {setList} = exampleSlice.actions;
// export const selectList = state => state.exampleInfo.list;
// export {exampleSlice};



