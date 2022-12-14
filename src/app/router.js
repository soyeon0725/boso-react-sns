import Join from "../pages/Join";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import SimpleSignUp from "../pages/SimpleSignUp";

export const RouteList = [
    {
        path : '/',
        element :  <Login/>
    },
    {
        path : '/join',
        element :  <Join/>
    },
    {
        path : '/simple-join',
        element :  <SimpleSignUp/>
    },
];

export const AuthRouteList = [
    {
        path : '/main',
        element :  <Main/>
    },
    {
        path : '/my-page',
        element :  <MyPage/>
    },

];

